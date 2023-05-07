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

        <img src="/header.png" alt="Header" class="img-fluid" style="width: 100%;">

        <img src="/font.png" alt="Logo" class="img-fluid" width="300" style="margin-bottom: 1em;">

        <div v-for="getraenk in getraenke" :key="getraenk.id">
            <h2>{{ getraenk.name }}
                <svg v-if="getraenk.kategorie == 'Alkoholisch'" xmlns="http://www.w3.org/2000/svg" width="32"
                     height="32" viewBox="0 0 512 512">
                    <path fill="currentColor"
                          d="M248 440h-72v32h176v-32h-72V318.968l176-192.762V80H72v46.206l176 192.762ZM104 113.794V112h320v1.794L374.508 168H153.492ZM182.709 200h162.582l-80.349 88h-1.884Z"/>
                </svg>
                <svg v-else-if="getraenk.kategorie == 'Koffeinhaltig'" xmlns="http://www.w3.org/2000/svg" width="32"
                     height="32" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M6 18a6.06 6.06 0 0 0 5.17-6a7.62 7.62 0 0 1 6.52-7.51l2.59-.37c-.07-.08-.13-.16-.21-.24c-3.26-3.26-9.52-2.28-14 2.18C2.28 9.9 1 15 2.76 18.46z"/>
                    <path fill="currentColor"
                          d="M12.73 12a7.63 7.63 0 0 1-6.51 7.52l-2.46.35l.15.17c3.26 3.26 9.52 2.29 14-2.17C21.68 14.11 23 9 21.25 5.59l-3.34.48A6.05 6.05 0 0 0 12.73 12z"/>
                </svg>
            </h2>
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

#karte .va-button__content {
    color: #191817;
    background-color: #ffdc83 !important
}

#karte .va-button {
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

h2 {
    display: flex;
    align-items: center;
    justify-content: center;
}

h2 svg {
    width: 1em;
    height: 1.1em;
    margin-left: 0.1em;
    vertical-align: middle;
}
</style>
