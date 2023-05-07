import {useRequestBody} from "nitropack/dist/runtime/utils";

let bestellungen = []

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // use body.method
    if (body.method === "GET") {
        return bestellungen
    }

    if (body.method === "POST") {
        const bestellung = body.bestellung
        bestellungen.push(bestellung)
        return bestellungen
    }

    if (body.method === "DELETE") {
        const id = body.id
        bestellungen = bestellungen.filter((bestellung) => bestellung.id !== id)
        return bestellungen
    }

    if (body.method === "PUT") {
        // should set status to fertig
        const id = body.bestellung.id
        bestellungen = bestellungen.map((bestellung) => {
            if (bestellung.id === id) {
                bestellung.status = "fertig"
            }
            return bestellung
        })

        // element mit id soll nach 5 sekunden gelöscht werden
        setTimeout(() => {
            bestellungen = bestellungen.filter((bestellung) => bestellung.id !== id)
        }, 60000)

        return bestellungen
    }

    return {body}
})