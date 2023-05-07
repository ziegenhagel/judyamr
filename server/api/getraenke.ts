let getranke = `
Kategorie;Name;Kurze Inhaltsangabe;Zubereitung (ganz knapp)
Alkoholfrei;Apfelschorle;Apfelsaft mit Mineralwasser;"1:1 Apfelsaft/Mineralwasser mischen"
Alkoholfrei;Orangensaft;Frischer Orangensaft;"Orangen auspressen, servieren"
Alkoholfrei;Virgin Mojito;Limette, Minze, Zuckersirup;"Zutaten mixen, Eis hinzufügen"
Alkoholfrei;Ingwer-Limonade;Ingwer, Zitrone, Zucker;"Ingwer/Zitrone mixen, Eis, Wasser"
Alkoholfrei;Eistee;Tee, Zitrone, Zucker;"Tee kühlen, Zitrone/Zucker mischen"
Alkoholfrei;Smoothie;Früchte, Joghurt, Honig;"Früchte/Joghurt/Honig mixen"
Alkoholfrei;Kokoswasser;Frisches Kokoswasser;"Kokosnuss öffnen, servieren"
Alkoholfrei;Rhabarberschorle;Rhabarbersaft, Mineralwasser;"1:1 Rhabarbersaft/Mineralwasser mischen"
Alkoholisch;Gin Tonic;Gin, Tonic, Limette;"Gin/Tonic mischen, Limette"
Alkoholisch;Caipirinha;Cachaça, Limette, Zucker;"Limette/Zucker stampfen, Cachaça"
Alkoholisch;Margarita;Tequila, Triple Sec, Limette;"Zutaten mixen, Eis, Salzrand"
Alkoholisch;Whiskey Sour;Whiskey, Zitronensaft, Zucker;"Zutaten mixen, Eis"
Alkoholisch;Aperol Spritz;Aperol, Prosecco, Soda;"Aperol/Prosecco/Soda mischen"
Alkoholisch;Pina Colada;Rum, Ananassaft, Kokoscreme;"Zutaten mixen, Eis"
Alkoholisch;Moscow Mule;Wodka, Ingwerbier, Limette;"Wodka/Ingwerbier mischen, Limette"
Alkoholisch;White Russian;Wodka, Kahlúa, Sahne;"Wodka/Kahlúa/Sahne mischen, Eis"
Koffeinhaltig;Kaffee;Filterkaffee;"Kaffee zubereiten, servieren"
Koffeinhaltig;Cappuccino;Espresso, Milchschaum;"Espresso, Milchschaum hinzufügen"
Koffeinhaltig;Espresso;Starker Kaffee;"Espresso zubereiten, servieren"
Koffeinhaltig;Latte Macchiato;Espresso, Milch, Milchschaum;"Milch/Espresso/Milchschaum schichten"
Koffeinhaltig;Grüner Tee;Grünteeblätter;"Tee aufgießen, ziehen lassen"
Koffeinhaltig;Schwarztee;Schwarzteeblätter;"Tee aufgießen, ziehen lassen"
`
export default defineEventHandler((event) => {
    // nimm die csv von oben und mach daraus ein Array von Objekten
    const getraenkeObjekte = getranke.replaceAll('"', '').split("\n").map((zeile) => {
        let [kategorie, name, beschreibung, zubereitung] = zeile.split(";")
        // alles ausser a-z entfernen
        const id = name?.toLowerCase().replace(/[^a-z]/g, "")
        return {id, kategorie, name, beschreibung, zubereitung}
    })

    // entferne alle Objekte, wo die Kategorie leer oder Kateogrie "Kategorie" ist
    return getraenkeObjekte.filter((getraenk) => getraenk.kategorie && getraenk.kategorie !== "Kategorie")
})
