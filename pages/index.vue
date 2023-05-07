<script lang="ts" setup></script>

<template>
    <div>
        <h2>Bitte wähle das Display aus, das Du anzeigen möchtest:</h2>
        <va-button @click="$router.push('/bestellen')">Bestellen</va-button>
        <va-button @click="$router.push('/kueche')">Küche</va-button>
        <va-button @click="$router.push('/csv')">Bearbeiten</va-button>
    </div>
</template>

<style scoped></style>
