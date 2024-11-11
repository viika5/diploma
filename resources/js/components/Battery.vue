<template>
    <vs-tooltip>
        <div @click="$root.$emit('ON_FILE_UPLOAD', {row: data})"  v-if="data" id="battery" class="h-100 justify-content-around">
            <img v-if="!filtered.admission_path" src="/images/battery/1.png" title="Статус" alt="Статус" :width="width">
            <img v-if="filtered.admission_path && (!filtered.serial_path || !filtered.photo_path)" src="/images/battery/2.png" title="Статус" alt="Статус" :width="width">
            <img v-if="filtered.admission_path && (filtered.serial_path && filtered.photo_path) && !filtered.transfer_path" src="/images/battery/3.png" title="Статус" alt="Статус" :width="width">
            <img v-if="filtered.admission_path && filtered.serial_path && filtered.photo_path && filtered.transfer_path && !filtered.write_off_path"  src="/images/battery/4.png" title="Статус" alt="Статус" :width="width">
<!--            <img v-if="filtered.admission_path && (filtered.serial_path && filtered.photo_path) && filtered.transfer_path && !filtered.write_off_path"  src="/images/battery/5.png" title="Статус" alt="Статус" width="50">-->
            <img v-if="filtered.admission_path && (filtered.serial_path && filtered.photo_path) && filtered.transfer_path && filtered.write_off_path"  src="/images/battery/7.png" title="Статус" alt="Статус" :width="width">

<!--            <div class="segment" :class="filtered.write_off_path ? 'green' : 'grey'" title="Факт списания"></div>-->
<!--            <div class="segment" :class="filtered.transfer_path ? 'green' : 'red'" title="Передача конечному потребителю"></div>-->
<!--            <div class="segment" :class="filtered.photo_path ? 'green' : 'grey'" title="Фотография"></div>-->
<!--            <div class="segment" :class="filtered.serial_path ? 'green' : 'grey'" title="Серийный номер"></div>-->
<!--            <div class="segment" :class="filtered.admission_path ? 'green' : 'grey'" title="Факт приема"></div>-->
        </div>
        <template #tooltip>
            Документы МОЛ
        </template>
    </vs-tooltip>
</template>

<script>
    export default {
        name: "Battery",
        props: ["data"],
        data: () => ({
            width: 30
        }),
        computed: {
            filtered() {
                let { admission_path, serial_path, photo_path, transfer_path, write_off_path } = this.data;
                return { admission_path, serial_path, photo_path, transfer_path, write_off_path }
            }
        }
    }
</script>

<style scoped>
    #battery {
        cursor: pointer;
    }

    .battery {
        display: flex;
        flex-direction: column;
        gap: 1em;
        border: 1px dashed #0a58ca;
        padding: 3px;
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
