/**
 * Tiedonhaun mobiilisovellus
 * 
 * Wrap with IIFE (Immediately-Invoked Function Expression) to prevent polluting 
 * global namespace.
 * 
 * @see LICENCE.txt for licensing and README.txt for more information
 * @copyright Oulun kaupunginkirjasto
 * @copyright Tampereen kaupunginkirjasto
 * @licence MIT
 */
(function() {
    "use strict";

    // This controls whether log messages are shown or not. If it's anything else
    // than word development, then no log messages are shown.
    var ENV = 'production';
    //var ENV = 'development';

    /**
     * If no console object is available, then it creates its own little 'console'
     * element and appends all messages there.
     * 
     * @param string message
     */
    function log(message) {

        var body = document.body,
            logContainer,
            htmlMessage,
            textNode;

        if(ENV !== 'development') {
            return;   
        }

        // Prepend message with time
        message = new Date().toLocaleTimeString() + ":    " + message;

        // @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FOperators%2Fin
        // Use console, if it's available
        if("console" in window) {
            console.log(message);
            return;
        }

        /*
        // Not in use. If there's need to debug on browser that does not support console,
        // this can be re-enabled by uncommenting
        logContainer = document.getElementById('log');
        body.setAttribute('class', 'with-log');

        // We need to create a simple log console if real console, i.e. console-
        // object is not available
        if(!logContainer) {
            logContainer = document.createElement('div');
            logContainer.setAttribute('id', 'log');
            body.appendChild(logContainer);
        }

        htmlMessage = document.createElement('p');
        htmlMessage.setAttribute('class', 'log-message');
        textNode = document.createTextNode(message);
        htmlMessage.appendChild(textNode);
        logContainer.appendChild(htmlMessage);
        */
    }

    /**
     * A function that removes spaces from line-start and line-end
     * and collapses all whitespace sequences into a single whitespace
     * 
     * By removing two last replace-calls, this is generic space normalizer, but
     * since the app needs some specific replacing, this is not, at its current
     * state, a generic whitespace normalizer.
     *
     * @param string data
     * @return string normalized
     */
    function normalizeSpace(data) {
        var normalized;
        
        if(typeof data !== 'string') {
            return;    
        }
        // This does following things:
        // - Remove all whitespaces on line-start and line-end    
        // - Collapse all spaces into single one
        // - When pipe-character has space before, after or both sides, it removes them
        // - When there's colon with spaces around it, it converts them to following format:
        //   colon and single whitespace after it.
        normalized = data.replace(/(^\s+)/, '')
                         .replace(/(\s+$)/, '')
                         .replace(/(\s{2,})/g, ' ')
                         .replace(/(\s\|\s)/g, '|')
                         .replace(/(\s*\:\s*)/g, ': ');
        return normalized;
    }

    /**
     * Validates the given input against regexp. If the input is valid, returns
     * true, otherwise returns false.
     * 
     * Before validation, it normalizes spaces so there's no need to take into account
     * any space-related problems in the validation regexp. See the comments on the
     * normalizeSpace-method for more.
     * 
     * @param string
     * @param regexp
     * @return boolean
     */
    function validate(input, regex) {
        
        var normalizedInput = normalizeSpace(input);
        
        if (!regex.test(normalizedInput)) {
            log('validate: Vastaus oli väärin. Regex: ' + regex + ', Syöte: ' + normalizedInput);
            return false;        
        }

        log('validate: Vastaus oli oikein: Regex: ' + regex + ', Syöte: ' + normalizedInput);
        return true;
    }


    /**
     * Extracts the user input from the form submitted. Returns false, if form con-
     * tains no input-element(s), otherwise the value of the first input.
     * 
     * Note, that only value from the first input is returned
     * 
     * TODO: Check, what type the elements `value`-property is. Is it mixed or
     * string or what?
     * 
     * @param HTMLFormElement form
     * @return mixed
     */
    function extractValue(form) {
        var nodeCollection = form.getElementsByTagName('input'),
            inputNode;

        if(nodeCollection.length !== 1) {
            return false;    
        }
        
        inputNode = nodeCollection.item(0);
        return inputNode.value;
    }


    /**
     * Creates the question with surrounding wrapper and so. It also adds event
     * listener to forms' submit-event.
     * 
     * The event listener then validates the input and sets proper class-attribute
     * to a wrapper.
     * 
     * And finally, the event listener returns false to prevent default action of
     * the form.
     * 
     * @param Object data Data in JSON-object form
     */
    function createQuestion(data) {

        var questionWrapper = document.createElement('div'),
            questionNode    = document.createElement('p'),
            //questionText  = document.createTextNode(data.questionText),
            questionText,
            form            = document.createElement('form'),
            textInput       = document.createElement('input'),
            button          = document.createElement('button'),
            buttontxt       = document.createTextNode('Tarkista');

        questionText = data.questionText.replace(/\*\*([^*]*)\*\*/g, '<strong>$1</strong>');
        questionNode.innerHTML = questionText;
        
        questionWrapper.setAttribute('class', 'question');
        //questionNode.appendChild(questionText);
        questionWrapper.appendChild(questionNode);

        textInput.setAttribute('type', 'text');
        button.setAttribute('type', 'submit');
        button.appendChild(buttontxt);

        form.appendChild(textInput);
        form.appendChild(button);

        /**
         * An an event listener to form submit event, that validates the answer.
         * 
         * - If it's correct, adds class `correct` to the wrapper
         * - If it's not correct, adds class `incorrect` to the wrapper
         * 
         * @param event
         */
        form.addEventListener('submit', function(event) {
            
            var validation,     // Validation reqular expression
                status;         // Boolean value for question status; true, if correct; false, if incorrect
            
            event.preventDefault();
            
            validation = new RegExp(data.validationRegexp, 'i');
            status = validate(extractValue(this), validation);        
            
            if(status) {
                questionWrapper.setAttribute('class', 'correct');
                button.setAttribute('disabled', 'disabled');
                textInput.setAttribute('disabled', 'disabled');
            }

            if(!status) {
                questionWrapper.setAttribute('class', 'incorrect');            
            }
        });
        
        /**
         * Adds another event listener to form submit event, that checks if all
         * questions were answered correctly.
         * 
         * TODO: What to do, when all questions are answered correctly? Play a
         * sound, show citation, what?
         * 
         * @param event
         */
        form.addEventListener('submit', function(event) {
            
            event.preventDefault();
            var formCount,
                correctAnswerCount  = 0,
                divCollection,
                contentArea         = document.getElementById('content'),
                gratHeading,        // = document.createElement('h2'),
                gratHeadingText;    // = document.createTextNode('Kaikki oikein! Onneksi olkoon!');
                
            formCount = document.getElementsByTagName('form').length;
            divCollection = document.getElementsByTagName('div');
            for(var i = 0, divCount = divCollection.length; i < divCount; i++) {
                if(divCollection[i].getAttribute('class') === 'correct') {
                    correctAnswerCount++;   
                }
            }
            
            if(formCount === correctAnswerCount) {
                //alert('Kaikki oikein! Onneksi olkoon!');
                // TODO: Remove help text too
                gratHeading = document.createElement('h2');
                gratHeading.setAttribute('id', 'gratHeading');
                gratHeadingText = document.createTextNode('Kaikki oikein! Onneksi olkoon!');
                gratHeading.appendChild(gratHeadingText);
                contentArea.innerHTML = '';
                contentArea.appendChild(gratHeading);
            }
            
            log('Forms count: ' + formCount + ', Correct answer count: ' + correctAnswerCount);
        });

        questionWrapper.appendChild(form);
        return questionWrapper;
    }

    /**
     * This is a rewritten queryVars-function, which was part of an original version
     * of this software. It's written so, that it does only one job.
     * 
     * It taks the string found on the URL-string, after #-character - the hash.
     * If no hash is found, it returns false, but if hash is found, it returns it
     * without the #-character.
     * 
     * @return string hash
     */
    function getHash() {

        var hash = window.location.hash
            .substring(1);

        if(hash.length === 0) {
            return false;   
        }

        return hash;
    }

    function addClass(_element, _class) {
        
        var classes,
            regexp,
            testResult;
        
        // If there's no such attribute, use empty string    
        classes = _element.getAttribute('class');
        if(classes === null) {
            classes = '';   
        }
        
        // Test, if there's already class with same name
        regexp = new RegExp(_class, 'g');
        testResult = regexp.test(classes);
        
        // If the element already has this class; do nothing
        if(testResult === true) {
            return; 
        }
    
        if(classes.length > 0) {
            classes = classes + " " + _class;
        } else {
            classes = _class;   
        }
            
        _element.setAttribute('class', normalizeSpace(classes)); 
    }
    
    function removeClass(_element, _class) {
    
        var classes,
            regexp,
            testResult;
        
        // If there's no such attribute, do nothing
        classes = _element.getAttribute('class');
        if(classes === null) {
            return;
        }
        
        // Test, if there's already class with same name
        regexp = new RegExp(_class, 'g');
        testResult = regexp.test(classes);
        
        // If the element already has this class; do nothing
        if(testResult === true) {
            classes = classes.replace(regexp, '');
        }
        
        // When there's not classes left, remove the class attribute too
        classes = normalizeSpace(classes);
        if(classes.length <= 0) {
            _element.removeAttribute('class');
            return;
        }
        
        _element.setAttribute('class', classes); 
        
    }    

    // TODO: Find a way to toggle classes; and also to append or remove just one,
    // specified class, not every single one.
    function displayNavigation() {
        var navigation = document.getElementById('navigaatio');
        //navigation.removeAttribute('class');
        removeClass(navigation, 'piilotettu');
    }

    function hideNavigation() {
        var navigation = document.getElementById('navigaatio');
        //navigation.setAttribute('class', 'piilotettu');
        addClass(navigation, 'piilotettu');   
    }    

    /**
     * Shows a questionsets listed by groups. It links to the every question set. 
     * Rewritten from a function with same name.
     * 
     * @param array questionData
     */
    function showIndex(questionData) {
        
        var group,                  // Current question group
            questionSets,           // Question sets of a group
            questionSet,            // Current question set
            questionSetWrapper,     // Div containing the whole group (heading, list)
            groupHeading,           // Group heading, h2-tag
            groupHeadingText,       // Text inside the h2-tag
            questionSetList,        // Questions list, ul-tag
            questionSetListItem,    // List item, li-tag inside ul-tag
            questionSetLink,        // Link inside li-tag
            questionSetLinkText;    // Link text
            
        // Clear the content and hide help text from index view
        document.getElementById('content').innerHTML = '';    
        
        // Loop through question data, i.e. question set groups
        for (var i = 0, dataCount = questionData.length; i < dataCount; i++) {

            group = questionData[i];

            // Create group heading
            groupHeading = document.createElement('h2');
            groupHeadingText = document.createTextNode(group.groupTitle);
            groupHeading.appendChild(groupHeadingText);
            
            // Create unordered list (ul-tag)
            questionSetList = document.createElement('ul');

            // Loop through question sets
            questionSets = group.questionSets;
            for (var questionSetIndex in questionSets) {
                
                questionSet = questionSets[questionSetIndex];

                // Create a question set list item with link
                questionSetListItem = document.createElement('li');
                questionSetLink = document.createElement('a');
                questionSetLink.setAttribute('href', '#' + questionSet.questionSetId);                
                questionSetLinkText = document.createTextNode(questionSet.questionSetTitle);
                questionSetLink.appendChild(questionSetLinkText);
                questionSetListItem.appendChild(questionSetLink);
                questionSetList.appendChild(questionSetListItem);
            }

            // Create a wrapper for question group
            questionSetWrapper = document.createElement('div');
            questionSetWrapper.setAttribute('class', 'wrap'); // TODO: Does this need to change?
            
            // Append heading and question set list and it's heading
            questionSetWrapper.appendChild(groupHeading);
            questionSetWrapper.appendChild(questionSetList);

            // Append the question group to the content
            document.getElementById('content').appendChild(questionSetWrapper);
        }
    }
    
    /**
     * Finds a question set identified by id and returns it. If no set is available
     * with given id, it returns false.
     * 
     * @param array questionData
     * @param string id
     * @return false|array
     */
    function find(id, questionData) {

        var questionSets;
            
        for (var group in questionData) {
            questionSets = questionData[group].questionSets;
            for (var questionSetIndex in questionSets) {
                if(id === questionSets[questionSetIndex].questionSetId ) {
                    return questionSets[questionSetIndex];
                }
            }
        }

        log('find: Kysymyssarjaa `' + id + '` ei löytynyt.');
        return false;
    }

    /**
     * Shows a selected set of questions. It loops through all questions and 
     * creates a wrapper, form and its elements and appends them to the content
     * area.
     * 
     * @param array aSet 
     */
    function displaySet(aSet) {

        var content,                // Content wrapper (div-tag, with id-attribute set as 'content'
            contentHeading,         // Content heading element, h2-tag
            contentHeadingText,     // Content heading text, placed inside h2-tag
            questionNode,           // A div-wrapped question, created by createQuestion()-call
            questionSet,            // 
            messageWrapper,         // A div-element for wrapping message, that is shown when no questions exist in the set
            messageParagraph,       // A message paragraph element
            messageText;            // Content for the message

        content = document.getElementById('content');
        contentHeading = document.createElement('h2');
        
        contentHeadingText = document.createTextNode(aSet.questionSetTitle);
        contentHeading.appendChild(contentHeadingText);

        content.innerHTML = '';
        content.appendChild(contentHeading);
        
        questionSet = aSet.questionSet;
        if(questionSet.length === 0) {
            messageWrapper = document.createElement('div');
            messageWrapper.setAttribute('class', 'message');
            
            messageParagraph = document.createElement('p');
            messageText = document.createTextNode('Ei vielä kysymyksiä tässä osiossa');
            messageParagraph.appendChild(messageText);
            messageWrapper.appendChild(messageParagraph);
            content.appendChild(messageWrapper);
            return;
        }
        
        for (var question in questionSet) {
            questionNode = createQuestion(aSet.questionSet[question]);
            content.appendChild(questionNode);
        }
    }

    /**
     * This is rewritten kont-function from the original version of this software. 
     * This is also renamed to better reflect what it does.
     * 
     * In this function, there is a data-variable, which is defined in the data.js-
     * file, which is loaded before this file. Do not use it anywhere else, but pass
     * it around a parameter for other functions. This way there's no need to change
     * anything, if the name changes (and there might be other things also why you
     * should not do that).
     */
    function run() {
        // Variable `data` is defined in data.js-file, which is loaded before this file
        // WARNING: DO __NOT__ USE THE `data`-VARIABLE ANYWHERE ELSE
        var questionData = data,
            questionSet,
            hash = getHash(),
            helpContainer = document.getElementById('ohje');

        if(hash === false || hash.length === 0) {
            //toggleClass(helpContainer, 'piilotettu');
            addClass(helpContainer, 'piilotettu');
            showIndex(questionData);
            return;
        }
        
        questionSet = find(hash, questionData);
        if(questionSet === false) {
            addClass(helpContainer, 'piilotettu');
            showIndex(questionData);
            return;
        }
        
            
        displaySet(questionSet);
        displayNavigation();

        // Show help above content
        removeClass(helpContainer, 'piilotettu');
    }

    // Note: IE versions below 9 doesn't support `addEventListener`
    window.addEventListener('load', function() {
        run();
    });

    window.addEventListener('hashchange', function() {
        run();
    });

}(data));

