import * as fs from "fs";
import {MongoClient} from "mongodb";

let getranke = `
Kategorie;Name;Kurze Inhaltsangabe;Zubereitung (ganz knapp)
Alkoholfrei;Apfelschorle;Apfelsaft mit Mineralwasser;1:1 Apfelsaft/Mineralwasser mischen
Alkoholfrei;Ananassaft;Mit frischer Ananas;Ananas schälen, in Stücke schneiden, pürieren
Alkoholfrei;Orangensaft;Frischer Orangensaft;Orangen auspressen
Alkoholfrei;Ananasschorle;Ananassaft mit Mineralwasser;1:1 Ananassaft/Mineralwasser mischen
Alkoholfrei;Spezi;Cola mit Orangenlimonade;1:1 Cola/Orangenlimonade mischen
Alkoholfrei;Coca Cola;Cola; Cola servieren
Alkoholfrei;Eistee;Tee, Zitrone, Zucker;Tee aufgießen, Zitrone und Zucker hinzufügen
Alkoholisch;Bier;Verschiedene Sorten;
Alkoholisch;Wein;Rotwein, Weißwein;
Alkoholisch;Cuba Libre; Rum und Coke;Rum und Coke mischen
Alkoholisch;Gin Tonic;Gin, Tonic, Limette;Gin, Tonic, Limette mischen
Alkoholisch;Whiskey Sour;Whiskey, Zitronensaft,Zucker; Whiskey, Zitronensaft, Zucker mischen
Alkoholisch;Aperol Spritz;Aperol, Prosecco, Soda;Aperol, Prosecco, Soda mischen,  Eis
Alkoholisch;Sekt;Verschiedene Sorten; Sekt servieren
Alkoholisch;Pina Colada;Rum, Ananassaft,Kokoscreme;Zutaten mixen, Eis
Alkoholisch;Lord Voldemort;Vodka, blue curaÁao, Lemon squash und Sprite;Zutaten mischen, Eis
Koffeinhaltig;Kaffee;Filterkaffee;Kaffee zubereiten und servieren
Koffeinhaltig;Cappuccino;Espresso,Milchschaum;Espresso, Milchschaum hinzu geben
Koffeinhaltig;Espresso;Starker Kaffee;Espresso zubereiten und servieren
Koffeinhaltig;Schwarztee;Schwarzteeblätter;Tee aufgießen & ziehen lassen
`


// lets connect to mongodb

const uri = 'mongodb+srv://friends:1z9eMJSsDcAHGnGh@overtime.n06lgfa.mongodb.net/?retryWrites=true&w=majority\n'
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const collection = client.db("friends_projects").collection("judyamr")


// read from file getraenke.csv
try {
    getranke = fs.readFileSync('getraenke.csv', 'utf8')
} catch (e) {
    console.log("getraenke.csv not found", e)
}

export default defineEventHandler(async (event) => {


    // connect to db
    // get all documents from collection
    await client.connect();
    const result = await collection.find({}).toArray();
    // close connection

    try {
        getranke = result[0].getranke
    } catch (e) {
        console.log("getraenke.csv not found", e)
    }

    console.log('result', result)


    try {
        const body = await readBody(event)
        // if the body csv is set
        if (body.csvRead)
            return getranke

        if (body.csvWrite.length > 0)
            getranke = body.csvWrite


        try {
            // write to file getraenke.csv
            fs.writeFileSync('getraenke.csv', getranke, 'utf8')

            // write to db
            // delete the current collection
            await collection.deleteMany({})
            // insert the new collection
            await collection.insertOne({getranke})

            console.log("getraenke.csv written")
        } catch (e) {
            console.log("getraenke.csv not found", e)
        }

    } catch (e) {
        console.log(e)
    }

    await client.close();

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
