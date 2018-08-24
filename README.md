## Neitiopsu
Data visualisation for Nettiopsu

<img src="https://github.com/z00ze/neitiopsu-v2/blob/master/Capture.PNG" width="300">


## Finnish report of the project

Neitiopsu
Kurssien yhteenvetojen datavisualisointi palvelu opiskelijoille

Turun Yliopisto
Projekti II-kurssi

Marko Loponen
2018

### Johdanto
	Arvosanajakaumat vuositasolla kiinnostavat opiskelijoita kun he päättävät mitä kursseja he valitsevat lukukaudelle tai kun he haluavat nähdä kurssin luennoitsijan vaihtumisen vaikutuksen arvosanoihin sekä tietenkin silkasta mielenkiinnosta opintojansa kohtaan. Nykyinen järjestelmä (Nettiopsu) ei sisällä hyvää työkalua näiden asioiden näkemiseen tai visualisointiin.

	Tavoitteena on luoda avoin järjestelmä, josta kuka tahansa opiskelija voi löytää minkä tahansa kurssin arvosanajakauman ja läpipääsyprosentin vuositasolla visuaalisesti.

### Menetelmät
	Datan kerääminen toteutetaan tekemällä Python3:lla http get-kutsuja Nettiopsun julkisesti saatavilla oleviin kurssien sivuihin (kuva 1), käsittelemällä saatu tieto ja tallentamalla se MySQL-tietokantaan. Datan kerääminen on kaksi vaiheinen, ensimmäisessä vaiheessa etsitään osoitteet oikeille kursseille ja sen jälkeen käydään vuositasolla niiden osoitteet läpi tallentaen tietokantaan kyseisen kurssin ja vuoden arvosanajakauma.
	Loppukäyttäjälle luodaan kevyt toteutus Python3 cherrypy-paketilla, HTML-sivulla ja JavaScript xhttp-kutsuilla cherrypy:n luomiin rajapintoihin. Datan visualisointi toteutetaan JavaScriptin paketilla Chart.js.
Työvaiheet ja lopputulos
	Datan kerääminen osoittautui helpoksi, mutta aikaa vieväksi prosessiksi. Tämän raportin julkaisuhetkellä tietokannassa on n. 53 000 kurssien osoitteita joista n. 9000 kurssista on haettu arvosanajakaumat. Kaikkien kurssien arvosanajakaumien saaminen toteutettuun järjestelmään nykyisellä menetelmällä olisi kohtuuttoman pitkä prosessi.
	Loppukäyttäjän sivuston luominen oli helppoa, koska kaikki käytössä olevat menetelmät olivat jo entuudestaan tuttuja. Sivusto on yksinkertainen, jossa on hakutoiminto kursseille, kurssien läpipääsyn visualisointi, arvosanajakauman visualisointi sekä listamuodossa kurssin arvosanat.
 
### Jatkokehitys
	Sivusto on jatkokehittävissä monipuolisemmaksi käytettävien menetelmien ansiosta. Tärkein jatkokehitys kohde olisi kaikkien Turun Yliopiston kurssien lisääminen tietokantaan joko hitaasti nykyisellä menetelmällä tai saamalla Nettiopsun tietokannasta tarvittavat datat.
