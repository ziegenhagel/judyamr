<script lang="ts" setup>
const {data, pending, error, refresh} = await useFetch('/api/bestellen', {
    method: 'POST',
    body: JSON.stringify({method: 'GET'})
})

setInterval(refresh, 1000)

const fertig = async (index) => {
    const bestellung = data.value[index]

    const confirm = window.confirm('Bestellung ' + bestellung.name + ' als fertig markieren?')
    if (!confirm) return

    window.alert('Bestellung ' + bestellung.name + ' als fertig markiert!')

    bestellung.status = 'fertig'
    const response = await fetch('/api/bestellen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({bestellung, method: 'PUT'})
    })

    if (response.ok) {
        const data = await response.json()
        console.log(data)
    }
}
</script>

<template>
    <va-data-table
            :items="data"
            :columns="[ 'name','gastname', 'kategorie', 'beschreibung', 'zubereitung', 'status']"
    >
        <template #cell(status)="{ value, rowIndex}">
            <va-chip :color="value === 'bestellt' ? 'warning' : 'success'">
                {{ value }}
            </va-chip>
            <va-button v-if="value === 'bestellt'" @click="fertig(rowIndex)" color="success" icon="check">Fertig
            </va-button>
        </template>
    </va-data-table>

</template>

<style scoped></style>
