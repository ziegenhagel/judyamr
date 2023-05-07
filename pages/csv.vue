<script lang="ts" setup>
const {data, pending, error, refresh} = await useFetch('/api/getraenke', {
    method: 'POST',
    body: JSON.stringify({csvRead: true})
})

const changed = ref(false)
const save = async () => {

    // in allen zeilen von data.value müssen genau 3 Semikolons vorhanden sein, falls nicht, gib wjndow.alert in welcher zeile der fehler ist aus und return

    const zeilen = data.value.split('\n')
    for (let i = 0; i < zeilen.length; i++) {
        // leere zeilen sind egal
        if (zeilen[i].trim() === '') continue
        const zeile = zeilen[i]
        const anzahl = (zeile.split(';').length - 1)
        if (anzahl !== 3) {
            window.alert('In der Zeile "' + zeile + '" sind ' + anzahl + ' Semikolons, es müssen genau 3 sein!')
            return
        }
    }


    const response = await fetch('/api/getraenke', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({csvWrite: data.value, method: 'PUT'})
    })

    if (response.ok) {
        const data = await response.json()
        console.log(data)
    }

    changed.value = false
}
const row = ref({
    kategorie: '',
    name: '',
    beschreibung: '',
    zubereitung: '',
})

const add = () => {
    data.value += '\n' + row.value.kategorie + ';' + row.value.name + ';' + row.value.beschreibung + ';' + row.value.zubereitung
    row.value = {
        kategorie: '',
        name: '',
        beschreibung: '',
        zubereitung: '',
    }
    save()
}
</script>

<template>
    <h1>CSV-Datei bearbeiten</h1>
    <fieldset>
        <legend>Eintrag anlegen</legend>
        <va-select label="Kategorie" v-model="row.kategorie"
                   autocomplete
                   :options="['Alkoholfrei', 'Alkoholisch', 'Koffeinhaltig']"></va-select>
        <va-input label="Name" v-model="row.name"></va-input>
        <va-input label="Beschreibung" v-model="row.beschreibung"></va-input>
        <va-input label="Zubereitung" v-model="row.zubereitung"></va-input>
        <va-button @click="add" color="primary" icon="add">Hinzufügen</va-button>
    </fieldset>

    <va-input @change="changed=true" v-model="data" type="textarea" rows="30" cols="50" style="width: 100%;"></va-input>
    <va-alert v-if="changed" @click="save" color="warning">Änderungen wurden vorgenommen, bitte speichern!</va-alert>
    <va-button @click="save" color="primary">Speichern</va-button>
</template>

<style >
fieldset {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
    gap: 1rem;
}

@media (max-width: 600px) {
    fieldset {
        flex-direction: column;
    }
}

.va-select-dropdown__content {
    z-index: 999999;
}
</style>
