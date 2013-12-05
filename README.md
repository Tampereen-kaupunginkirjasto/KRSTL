# Tiedonhaun mobiilisovellus

> Huom., lue README-KRSTL.md. Kyseinen tiedosto sisältää alkuperäisen KRSTL:n dokumentaation.

Tiedonhaun mobiilisovellus on kirjaston tiedonhaun sähköinen tehtävälomake.

## Uusia ominaisuuksia

- Karsii turhat välilyönnit eli ei merkitse vastausta vääräksi, jos on esim. vahingossa laittanut tuplavälilyönnin
- Osaa huomioida kaksoispisteen ympäriltä välilyönnit eli esim. merkitse vastausta vääräksi, jos onkin kirjoittanut `a : b`, vaikka vastauksessa olisi `a: b`
- Näyttää `alert`-ikkunan, jossa onnitteluteksti, kun kaikki kysymykset on saanut oikein

## Toimivuus

Voi toimia toki muillakin.

- Firefox 9+
- Internet Explorer 9+ (ei ole testatu versiolla 9, mutta testattu versiolla 10)
- Firefox 19 (Galaxy Tab 2 / 7.0)
- Chrome 18 (Galaxy Tab 2 / 7.0)

## Käyttöönotto

1. Vaihda `index.html`-tiedostoon `meta`-tagiin UTF-8 merkistökoodaus
2. Lisää kysymykset `data.js`-tiedostoon
3. Kopioi tiedostot palvelimelle
4. Testaa, että sovellus toimii
