<script lang="ts" setup>
const data = await useFetch('/api/getraenke')

const getraenke = data.data

const bestellen = async (bestellung) => {

    const confirm = window.confirm('Möchtest Du ' + bestellung.name + ' bestellen?')
    if (!confirm) return

    // frage nach dem name
    bestellung.gastname = window.prompt('Wie ist Dein Name?')
    if (!bestellung.gastname) return

    window.alert('Danke, ' + bestellung.gastname + '! Deine Bestellung ' + bestellung.name + ' wurde aufgegeben.')

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
    <div id="karte">

        <img src="/header.png" alt="Header" class="img-fluid" style="width: 100%; margin-bottom: 1rem;">

        <div v-for="getraenk in getraenke" :key="getraenk.id">
            <h2>{{ getraenk.name }} ({{ getraenk.kategorie }})</h2>
            <p>
                {{ getraenk.beschreibung }}
            </p>
            <va-button @click="bestellen(getraenk)">Bestellen</va-button>
            <!--            <img src="/hr.png" alt="Header" class="img-fluid" style="width: 300px;  display:block;margin-bottom: 1rem;">-->
        </div>

        <img src="/footer.png" alt="Footer" class="img-fluid" style="width: 100%; margin-top: 1rem;">
    </div>
</template>

<style>
body {
    background-color: #191817;
    font-family: sans-serif;
    text-align: center;

}

#karte {
    max-width: 900px;
    margin: auto;
}

.va-button__content {
    color: #191817;
    background-color: #ffdc83 !important
}

.va-button {
    margin-bottom: 20px;
}

h2 {
    color: #ffdc83;
    text-transform: uppercase;
    margin: 5px 0;
}

p {
    margin: 5px 0;
    color: white;
    font-size: 1.2em;
}
</style>
