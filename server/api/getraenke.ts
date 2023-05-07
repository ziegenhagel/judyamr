let getranke = `
Kategorie;Name;Kurze Inhaltsangabe;Zubereitung (ganz knapp),,,
Alkoholfrei;Apfelschorle;Apfelsaft mit Mineralwasser;1:1 Apfelsaft/Mineralwasser mischen
Alkoholfrei;Ananassaft;Mit frischer Ananas;Ananas schälen, in Stücke schneiden, pürieren
Alkoholfrei;Orangensaft;Frischer Orangensaft;Orangen auspressen;
Alkoholfrei;Ananasschorle;Ananassaft mit Mineralwasser;1:1 Ananassaft/Mineralwasser mischen,,,
Alkoholfrei;Spezi;Cola mit Orangenlimonade;1:1 Cola/Orangenlimonade mischen,,,
Alkoholfrei;Coca Cola;Cola;,,,
Alkoholfrei;Eistee;Tee, Zitrone, Zucker;Tee aufgießen, Zitrone und Zucker hinzufügen
Alkoholisch;Bier;Verschiedene Sorten;,,,
Alkoholisch;Wein;Rotwein, Weißwein;,,,
Alkoholisch;Cuba Libre; Rum und Coke;Rum und Coke mischen,,,
Alkoholisch;Gin Tonic;Gin, Tonic, Limette;Gin, Tonic, Limette mischen,,,
Alkoholisch;Whiskey Sour;Whiskey, Zitronensaft,Zucker; Whiskey, Zitronensaft, Zucker mischen,,,
Alkoholisch;Aperol Spritz;Aperol, Prosecco, Soda;Aperol, Prosecco, Soda mischen,  Eis
Alkoholisch;Sekt;Verschiedene Sorten;,,,
Alkoholisch;Pina Colada;Rum, Ananassaft,Kokoscreme;Zutaten mixen, Eis
Alkoholisch;Lord Voldemort;Vodka, blue curaÁao, Lemon squash und Sprite",,,
Koffeinhaltig;Kaffee;Filterkaffee;""Kaffee zubereiten"," servieren""",,
Koffeinhaltig;Cappuccino;Espresso," Milchschaum;Espresso, Milchschaum hinzu geben",,
Koffeinhaltig;Espresso;Starker Kaffee;""Espresso zubereiten"," servieren""",,
Koffeinhaltig;Schwarztee;Schwarzteeblätter;Tee aufgießen & ziehen lassen,,

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
