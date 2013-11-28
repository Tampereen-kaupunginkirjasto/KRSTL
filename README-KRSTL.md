KRSTL:n eli Kirjastoreitin sähköisen tehtävälomakkeen kotisivu ja muuta tietoa löytyy osoitteesta:
http://s.iki.fi/krstl/

Kirjastoreitin lomakesoftan dokumentaatiota käytön ja mahdollisten myöhemmin ilmenevien muutostarpeiden kannalta. Olemme päätyneet tämän julkaisemiseen kaikkien saataville, siitäkin huolimatta, ettei kyseessä ole mikään loppunasti viilattu huippuvaativa taidonnäyte, koska tästä ei kuitenkaan muodostuisi helpolla myytäväksi asti hyödynnettävää tuotetta mutta tälle kuitenkin saattaisi olla käyttöä ja tarvetta muuallakin.



Yleistä ohjelmasta ja tehdyistä ratkaisuista.
*********************************************

Tämä lomakkeisto annetaan avoimen lähdekoodin lisenssillä (FIXME mikä lisenssi) kenen tahansa halukkaan käyttöön. Ohjelmistoa ja sivua saa muokata miten haluaa, käyttää missä haluaa jne., mutta minkäänlaista takuuta ohjelman toiminnalle ei anneta. Oulun kaupunginkirjastolla käytössä olevan värimaailman käyttöön ei anneta lupaa, eikä Oulun logojen.

Mikäli näette tämän ohjelman jossain käytössä hyödylliseksi ja päädytte käyttämään sitä, olisi mukava, jos ilmoittaisitte siitä minulle eli Sampo Lehtiselle.

Ja ennen kuin tuomitsette ohjelman huonoksi tehtyjen ratkaisujen, koon, tyylin tai jonkin muun seikan perusteella, huomatkaa, että teillä on täysi oikeus tehdä aivan samanlainen sillä paremmaksi katsomallanne tavalla. Meidän mahdollisuuksiamme rajoitti kiire, käytettävissä ollut aika ja saatavilla ollut palvelin. Näistä viimemainittu on itseasiassa suurin syy siihen, miksi kaikki tehdään mahdollisimman pitkälti päätelaitteessa. Toinen syy pelkkään päätelaitteeseen tukeutumisessa on se, ettei vastauksien tallettamiselle nähty tarvetta. Mikäli teette tähän jotain tarpeelliseksi tai hyödylliseksi katsomianne muutoksia, olisimme kiitollisia, jos tarjoaisitte ne myös meille ja kauttamme muille mahdollisille käyttäjille.

Olemme olettaneet, että tätä käytetään suurimmaksi osaksi kännyköillä. Se on yritetty toteuttaa mahdollisimman yhteensopivasti, mutta samalla kuitenkin huomioiden käytettävyys tietokoneissa ja tableteissa.



Lyhyesti versioista
*******************

Sillä ne eivät ole täysin toisiaan poissulkevia. Voi olla perusteltua käyttää joskus alkuperäistä versiota.

Ohjelmasta on oikeastaan toteutettu kaksi erilaista versiota. Toki toinen niistä on uudempi ja toinen vanhempi. Ja uudempi on jatkokehitystä vanhemmalle. Paketissa olevat muut tiedostot kuin tämä dokumentti ja koe.html ovat vanhempaa versiota. Tiedosto koe.html on se uudempi. Siinä kaikki on tungettu yhteen tiedostoon, jotta siirtäminen palvelimelle ja toisaalta tiedonsiirto mobiileille päätelaitteille olisi helppoa ja tehokasta.

Koska ohjelma kehitettiin lopulliseen ensin käyttöön otettuun muotoonsa pikaisesti tehdyistä käyttöliittymää ja yhteensopivuutta ja toteutusmahdollisuutta kokeilleista demoista, tehtiin ensimmäinen versio vain monistamalla staattista html-tiedostoa ja tekemällä erillinen hakemistosivu. Tämän ratkaisun huonona puolena on ylläpidettävyys, mahdollinen muutos käyttöliittymässä on tehtävä moneen paikkaan ja uusia lomakkeita lisätessä on itse huolehdittava niiden linkityksestä hakemistosivuun ja oikeiden vastauksien linkittämisestä lomakkeeseen. Myös useamman tiedoston siirtäminen kännykkään hitaiden mobiiliyhteyksien yli on jossian määrin hidasta. Toisaalta, tällä ratkaisulla yksittäisten tiedostojen koko ei paisu, vaikka lomakkeiden määrä räjähtäisi käsiin. Lomakkeiden määrän käsiinräjähtämisen aiheuttamat ongelmat voisi poistaa myös tekemällä tälle bäkendin, joka generoisi sopivat lomakkkeet lennossa.

Myöhemmin toteutettu versio luo itse hakemiston ja lomakkeet sille annetun, siis käytännössä tiedostoon kovakoodatun JSON-olion tietojen perusteella. Tämän avulla on suhteellisen helppoa lisätä uusia otsikoita hakemistoon ja uusia lomakkeita ohjelmaan, mutta tarkkana on oltava. Tarkkuudessa auttaa hyvä editori, esimerkiksi Windows-koneita ajatellen Notepad++. Ylläpidon kannalta jälkinmäinen versio on helpompi tietyin varauksin. Tässä kaikki on sulautettu yhteen tiedostoon, siis kaikki paitsi tämä dokumentti. Tämä tarkoittaa kuvia, tyylimäärittelyjä, javascript-lähdekoodia sekä tietoa otsikoista, lomakkeista, kysymyksistä ja vastauksista. Ongelmaksi muodostuu se, että lomakemäärän kasvaminen kasvattaa tiedoston kokoa. Tiedoston koon kasvaessa siitä tulee ennenmmin tai myöhemmin liian suuri siirrettäväksi kerralla kännykkään. Tiedoston kokoon liittyvää ongelmaa pienentää, mikäli palvelin pakkaa tiedostot http-yhteydelle tai päätelaitteessa on käytössä esimerkiksi Operan off-road mode.

Paras jatkokehityskompromissi näiden välille olisi se, että hakemisto, luodaan lennossa valinnan mukaan palvelimella tai päätelaitteella, mutta kysymyksistä siirretään päätelaitteelle one-page-käyttöliittymäparadigman tyyliin hakemalla vain näytölle tulevat kysymykset ja niihin liittyvät vastaukset AJAXia ja JSONia käyttäen tai jotenkin muutoin.



Käyttö, asennus, kysymykset ja vastaukset
*****************************************

Suosittelen muokkaamaan ohjelman värit paremmiksi ja oman organisaation värimaailmaan sopiviksi. Vanhemman version kohdalla tämä tarkoittaa kirjareitti.css-tiedoston muokkaamista. Uudemman version kohdalla kyseinen tiedosto on sisällytetty suoraan koe.html-tiedostoon, se alkaa noin rivin 120 paikkeelta ja sen ensimmäinen rivi on muotoa:
<style type="text/css">

Ohjelman käyttöönotto ja kysymyksien ja vastauksien asettaminen on helppoa.

Vanhemman, erillisistä tiedostoista koostuvan version kanssa uuden lomakkeen käyttöönotto tapahtuu seuraavasti. Kopioi jokin vanha lomake uuden pohjaksi. Nimeä tämä uusi tiedosto haluamallasi tavalla. Lisää hakemistosivulle, haluamasi otsikon alle, linkki tähän uuteen tiedostoon. Siirry muokkaamaan uutta lomaketta. Muista muuttaa lomakkeen html-tiedoston viite vastaukset sisältävään tiedostoon, eli korjaa jälkinmäinen rivi, joka alkaa <script type="text/javascript" src="... tuon src-argumentin osalta. Sen tulee viitata tälle kysymyslomakkeelle uniikkiin vastaustiedostoon. Vastaustiedoston pohjaksi voit kopioida jonkin aiemman vastaustiedoston.

Muokkaa kysymyslomakkeelle haluamasi kysymykset leikkaamalla ja liimaamalla vanhasta ja korvaamalla teksti. Ohjelma löytää itse oikean vastauksen vastaustiedostosta laskemalla kuinka mones lomake kyseisessä html-tiedostossa on kyseessä. Vastausten numerointi alkaa ykkösestä ja niitä on syytä olla yhtä monta kuin kysymyksiäkin. Vastaukset annetaan tavallisen javascript-taulukon muodossa siten, että yksittäisen alkion sisältönä on RE, jota vasten käyttäjän antama vastaus tarkastetaan. On siis vastauksien kirjoittajan vastuulla kirjoittaa vastaus siten, ettei tehtäviä tekevän tarvitse miettiä missä muodossa vastaus on kirjoitettava. Käytettävyyden oleellinen osa on tässä se, että oikeiksi vastauksiksi kysymykseen "Mikä on Aku Ankan veljenpoikien huoltajan nimi?" hyväksytään esimerkiksi "A. Ankka", "Ankka, Aku", "Ankka Aku", "Aku Ankka", "Aku" jne. tai että kysyttäessä "Montako häntää hevosella on?" vastauksiksi olisi syytä laittaa "Yx", "Yks", "Yksi" ja "1" ihan oman valinnan mukaan. Voin vakuuttaa, että tehtävät ovat rutkasti motivoivampia, mikäli oikea ongelma on löytää oikea vastaus kuin löytää oikea tapa kirjoittaa se oikea vastaus. RE-muodon käytöstä saat sopivasti lisätietoja seuraavilta www-sivuilta:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Writing_a_Regular_Expression_Pattern
http://www.w3schools.com/jsref/jsref_obj_regexp.asp
http://www.javascriptkit.com/jsref/regexp.shtml

Tai vaikka googlella etsimällä. Kannattaa muistaa, että homma on helpompaa kuin miltä näyttää ja että noissa on pieniä eroja sen mukaan, mille ohjelmointikielelle esimerkit on kirjoitettu. Asiat sinällään ovat samanlaiset, mutta kirjoitustavassa voi olla pieniä eroja.

Mikäli käytät uutta versiota, riittää, että editoit suoraan html-tiedoston alussa olevaa otsikot-JSON-oliota. Siinä määritellään hakemistossa näkyvät otsikot, kunkin otsikon alla näkyvät kysymyslomakkeet ja niiden yksilölliset tunnisteet sekä yksittäisellä lomakkeella näkyvät otsikko ja kysymykset sekä niiden vastaukset. Sisennyksillä ei sinällään ole väliä, mutta ne ja hyvä editori auttavat hommassa. Erilaisten sulkeiden täytyy avautua tietyssä järjestyksessä ja sulkeutua samassa ja niiden tyypillä on merkitystä. Käytännössä tuota voi lukea siten, että []-suljeparin sisällä on asioita, joita voi olla monta ja {}-suljepari rajaa sisälleen yksittäisen asian. Tämän tiedoston lopussa on lyhyt malli tuon tietorakenteen käytöstä. "/*" ja "*/"-merkintöjen välissä olevat tekstit tulkitaan kommenteiksi eikä niitä huomioida. Ne kuitenkin kasvattavat tiedoston kokoa, joten ylenpalttisesti niitä ei ole tarpeen viljellä. Lopun esimerkissä ne ovat vain selventämässä tuon käyttöä.

Pienet kuvat uudessa versiossa. Jos haluat omat kuvasi ja edelleen käyttää yhden tiedoston mallia, etkä linkittää niitä ulkopuolelta, voit muuttaa kuvasi html:ään sisällytettävään muotoon http://dataurl.net/#dataurlmaker palvelun avulla.



Vastausten kirjoittamisesta lyhyesti ja yleisesti:
*************************************************

Vastaukset kirjoitetaan otsikot-JSON-olioon kukin omalle paikalleen vastausta välittömästi edeltävän kysymyksen perään.

Vastaus alkaa aina
vastaus:
ja alun perässä on selkeyden vuoksi välilyönti.

Itse vastaus on aina //-merkkien välissä ja lopussa oleva i-kirjain kertoo, ettei kirjainkoosta välitetä. Esimerkkivastauksien alussa on rimpsu ^\s*, mikä tarkoittaa että vastauksen alkuun hyväksytään näkymättömiä merkkejä sen verran kuin niitä siellä sattuu olemaan. Oikean vastauksen kannaltahan on epäoleellista, onko sen alussa pari turhaa välilyöntiä, sarkainta tai kenties rivinvaihtoa jostain ihmeen syystä. Vastaavasti lopussa on \s*$. Tarkalleen ^-merkki tarkoittaa rivin eli syötteen eli tässä tapauksessa käyttäjän antaman vastauksen alkua, $-merkki loppua, *-merkki sitä, että edeltävä asia voi puuttua tai toistua useita kertoja ja \s-merkintä kaikkia mahdollisia näkymättömiä merkkejä.

Yksittäisten merkkien keskinäisen vaihtoehtoisuuden voi ilmaista hakasulkeilla. Esimerkiksi [,.]-merkinnän paikalle kelpaa vain joko pilkku tai piste, mutta eivät molemmat. ?-merkki tarkoittaa, että edeltävä voi puuttua. Siis [,.]? merkintä tarkoittaisi, että vastauksessa kelpaa 
joko jompi kumpi, pilkku tai piste, tai ei mitään.

Pidemmät vaihtoehtoiset osuudet merkataan ()-sulkeiden sisään |-merkillä eroteltuna. Esimerkiksi:
/^\s*(Jorma Kääriäinen|Kääriäinen,? Jorma)\s*$/i tarkoittaa, että vastauksiksi kelpaavat esimerkiksi kaikki seuraavista (huomaa pilkun vapaaehtoiseksi muuttava ?-merkki ja että "-merkit ovat vain tuomassa näkymättömiä merkkejä esiin, eivät osa varsinaista vastausta):
"              Jorma kÄÄÄRIäInEN         "
"KÄÄRIÄINEN, JORma            "
"      kääriäinen jorma"
"Jorma Kääriäinen"

Mikäli et halua tai ehdi kummemmin pohtia miten vastaukset kirjoitat ja haluat vain kirjoittaa joukon oikeita vastauksia, toimi seuraavan mallin mukaan:
/^\s*(Ensimmäinen oikea vastaus|toinen oikea|kolmas|neljäs|ja viides hieman erilainen|kuus|7|kasi|yhdeksän|ja niin edelleen)\s*$/i
Eli laita kaikki erilliset oikeat vastaukset sellaisenaan rimpsuun ()-sulkeiden sisään ja erota ne |-merkillä toisistaan. Laita alkuun ja loppuun vielä rimpsut:
/\s*(
)\s*$/i


Tunnettuja virheitä:
********************
Operan mobiiliselaimessa jää hieman tarpeetonta vieritysmahdollisuutta vaakasuunnassa.



Malli otsikot-JSON-oliosta:
/* Koko homma alkaa tästä. Hakasulje eli [-merkki on alussa kertomassa, että sisältöjä on useita.
Ensimmäisen hakasulkeen sisältä löytyvät {}-merkein rajattuna ja pilkuin eroteltuna kukin yksittäinen otsikko,
joiden sisältä löytyvät taasen yksittäiset lomakkeet kysymyksineen, vastauksineen ja muine tietoineen joukoksi
ryhmittävä "lomakkeet": [ -rimpsu. Muista, että jokainen sulje, sulkeen suunta ja tyyppi sekä pilkut ovat
välttämättömiä. Ja suurin osa lainausmerkeistä myös. Vastaukset taasen on annettava nimenomaan ilman lainausmerkkejä,
jotta javascript-tulkki luo niistä sellaisia olioita, joilla on test-metodi.
*/
var otsikot = [
	{
		/* Hakemistosivun ensimmäinen otsikko */
		otsikko: "Esimerkkikoulu",
		/* Sen alta löytyvät lomakkeet*/
		"lomakkeet": [
			/* Tästä alkaa ensimmäinen lomake */
			{
				/* Lomakkeen hakemistosivulla näkyvä otsikko */
				lomake: "Kysymyssarja A",
				/* Lomakkeen yläreunassa näkyvä, yleensä pidempi otsikko. Sivun otsikkoa (siis html-titleä)
				varten <br> eli pakotettu rivinvaihto muutetaan pilkuksi ja välilyönniksi */
				otsikko: "Kirjastoreitin tehtäviä alakoululaisille<br>Kysymyssarja A",
				/* Lomakkeen yksilöivä tunniste. Tämän perusteella löydetään oikeat kysymykset ja
				vastaukset. Mikäli tämä ei ole yksilöllinen, homma ei toimi kuin korkeintaan epäyksilöllisistä
				jonkin kohdalla. Muut kyllä näkyvät hakemistossa, mutta niiden linkistä joutuu väärään paikkaan */
				llid: "ak_a",
				/* Kysymykset kokoava taulukko alkaa */
				"kysymykset": [
					/* Yksitäisen kysymyksen ja vastauksen muodostama pari. Huomioi lainausmerkit! Mikäli kysymyksesi sisällä
					tarvitset lainausmerkkejä, käytä niiden paikalla \"-merkintätapaa */
					{
						kysymys: "Merja ja Marvi Jalo supersuositun kirjasarjan pääosassa on koira. Mikä on koiran nimi?",
						vastaus: /^\s*Jesse\s*$/i
					/* Yksittäinen kysymys päättyy sulkevaan aaltosulkeeseen ja pilkkuun. Sitä voisi seurata toinen, kuten
					alemmassa lomakkeessa on */
					},
				]
			},
			{
				lomake: "Kysymyssarja B",
				otsikko: "Kirjastoreitin tehtäviä alakoululaisille<br>Kysymyssarja B",
				llid: "ak_b",
				"kysymykset": [
					{
						"kysymys": "Suorapuheinen poikatyttö Venla muuttaa uudelle paikkakunnalle ja uuteen kouluun Katariina Romppaisen kirjassa. Mikä on kirjan nimi?",
						"vastaus": /^\s*Roolipeliä\s*$/i
					},
					{
						"kysymys": "Kirja myrkytetyn mutakakun tapaus kuuluu Mysteeritytöt-sarjaan. Kuka on kirjoittanut sarjan kirjat?",
						"vastaus": /^\s*(Alex\s+Carter|Carter\,?\s+Alex)\s*$/i
					},
				]
			},
		]
	},
	{
		"otsikko": "Yläkoulu",
		"lomakkeet": [
			{
				"lomake": "Kysymyssarja A",
				otsikko: "Kirjastoreitin tehtäviä yläkoululaisille<br>Kysymyssarja A",
				llid: "yk_a",
				"kysymykset": [
					{
						"kysymys": "Kirjassa Niskaan putoava taivas 14-vuotias Tekla saa viettää viikon ilman vanhempiaan, mutta unelmaviikosta tuleekin painajainen. Kuka kirjan on kirjoittanut?",
						"vastaus": /^\s*(Laura\s+L[äa]hteenm[äa]ki|Lähteenmä(en|ki)\,?\s+Laura)\s*$/i
					},
				]
			},
		]
	},
]
