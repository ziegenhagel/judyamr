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
</script>

<template>
    <va-input @change="changed=true" v-model="data" type="textarea" rows="30" cols="50" style="width: 100%;"></va-input>
    <va-alert v-if="changed" @click="save" color="warning">Änderungen wurden vorgenommen, bitte speichern!</va-alert>
    <va-button @click="save" color="primary">Speichern</va-button>
</template>

<style scoped></style>
