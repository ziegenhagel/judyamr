<script lang="ts" setup></script>

<template>
    <div id="index">
        <h1>Bitte wähle das Display aus, das Du anzeigen möchtest:</h1>
        <va-button @click="$router.push('/bestellen')">Bestellen</va-button>
        <va-button @click="$router.push('/kueche')">Küche</va-button>
        <va-button @click="$router.push('/csv')">Bearbeiten</va-button>
    </div>
</template>

<style scoped>
#index {
    text-align: center;
    margin: auto;
    margin-top: 20px;
    max-width: 500px;
}

.va-button {
    display: block;
    margin: auto;
    margin-top: 9px;
    width: 100%;
    max-width: 300px;
    text-align: center;
}
</style>
