<script lang="ts" setup>
const data = await useFetch('/api/getraenke')

const getraenke = data.data

const bestellen = async (bestellung) => {

    const confirm = window.confirm('Möchtest Du ' + bestellung.name + ' bestellen?')
    if (!confirm) return

    window.alert('Bestellung ' + bestellung.name + ' wurde aufgegeben!')

    bestellung.status = 'bestellt'
    const response = await fetch('/api/bestellen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({bestellung: {...bestellung, id: Math.random() + ""}, method: 'POST'})
    })

    if (response.ok) {
        const data = await response.json()
        console.log(data)
    }
}
</script>

<template>

    <va-card v-for="getraenk in getraenke" :key="getraenk.id">
        <va-card-title>{{ getraenk.name }} ({{ getraenk.kategorie }})</va-card-title>
        <va-card-content>
            {{ getraenk.beschreibung }}
        </va-card-content>
        <va-card-actions>
            <va-button @click="bestellen(getraenk)">Bestellen</va-button>
        </va-card-actions>
    </va-card>

</template>

<style scoped>
.va-card {
    margin-bottom: 1rem;
}
</style>
