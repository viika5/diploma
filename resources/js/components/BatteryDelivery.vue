<template>
    <vs-tooltip>
        <div @click="$root.$emit('ON_EDIT_ROW', {row: data, value: data[column], field: column})" v-if="data" id="battery" class="h-100 justify-content-around">
            <img :src="`/images/delivery/${status}.png`" :title="`Статус ${status}`" :alt="`Статус ${status}`" :width="width">
        </div>
        <template #tooltip>
            Поставка
        </template>
    </vs-tooltip>
</template>

<script>
    export default {
        name: "BatteryDelivery",
        props: ["data", "column"],
        data: () => ({
            width: 30
        }),
        computed: {
            status(){
                let { status } = this.data
                return status;
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
    #battery {
        cursor: pointer;
    }

    .battery {
        display: flex;
        flex-direction: column-reverse;
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

    .green {
        background: green;
    }

    .red {
        background: red;
    }

    .grey {
        background: grey;
    }
</style>
