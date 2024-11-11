<template>
    <vs-tooltip>
        <div id="battery" class="h-100 justify-content-around">
            <img :src="`/images/document/${status}.png`" :alt="dict[getStatus]" :title="dict[getStatus]" :width="width">
        </div>
        <template #tooltip>
            Документы ЭДО
        </template>
    </vs-tooltip>
</template>

<script>
    export default {
        name: "BatteryDocument",
        data: () => ({
            status: 2,
            width: 30,
            dict: [
                'Ожидается документ в ЭДО от поставщика',
                'Документ от поставщика получен, ожидается подпись Директора ЦАСУТП',
                'Документ от поставщика подписан Директором ЦАСУТП, ожидается подпись МОЛ',
                'Документ принят МОЛ, ожидается присвоение номера и проводка в ЦБИНС',
                'Процесс «Документы ЭДО» завершен\n'
            ]
        }),
        computed: {
            getStatus(){
                return this.status - 1
            }
        }
    }
</script>

<style scoped>
    .battery {
        display: flex;
        flex-direction: column;
        gap: 1em;
        border: 1px dashed #0a58ca;
        padding: 3px;
    }

    .unvisivle {
        background: transparent;
    }

    .segment {
        height: 10px;
        width: 10px;
    }

    .grey {
        background: grey;
    }
</style>
