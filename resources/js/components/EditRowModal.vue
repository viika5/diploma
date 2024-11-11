<template>
    <vs-dialog v-model="editActive" v-if="row.row">
        <template #header>
            <h4>Редактирование заявки №{{row.row.id}}</h4>
        </template>

        <div class="mb-2 d-flex h-100 justify-content-center align-items-center gap-1">
            <p class="m-0">Установить статус</p>
            <vs-radio color="#EEEEEE" v-model="row.row.status" val="1">
                1
            </vs-radio>
            <vs-radio color="#A7FFCF" v-model="row.row.status" val="2">
                2
            </vs-radio>
            <vs-radio color="#01FF74" v-model="row.row.status" val="3">
                3
            </vs-radio>
            <vs-radio color="#00B050" v-model="row.row.status" val="4">
                4
            </vs-radio>
        </div>

        <div class="d-flex justify-content-between flex-row">
            <vs-button @click="update" success>Сохранить</vs-button>
            <vs-button @click="onDelete(row)" danger>Удалить</vs-button>
        </div>
    </vs-dialog>
</template>

<script>
    export default {
        name: "EditRowModal",
        data: () => ({
            editActive: false,
            row: {},
            value: null
        }),
        methods: {
            update(){
                delete this.row.row['vgt_id'];
                delete this.row.row['originalIndex'];
                delete this.row.row['vgtSelected'];
                delete this.row.row['admission_path'];
                delete this.row.row['photo_path'];
                delete this.row.row['transfer_path'];
                delete this.row.row['write_off_path'];

                axios.put(`/api/item/${this.row.row.id}`, this.row.row).then(response => {
                    this.editActive = false;
                    this.$root.$emit('ON_REFRESH')
                })
            },
            onDelete(obj) {
                let {row} = obj;

                axios.delete(`/api/item/${row.id}`).then(res => {
                    this.editActive = false;
                    this.$root.$emit('ON_REFRESH');

                }).catch((e) => {
                    alert('Произошла ошибка');
                    console.log(e)
                })
            },
        },
        mounted() {
            this.$root.$on('ON_EDIT_ROW', (val) => {
                this.row = val
                this.value = val.value
                this.editActive = true;
            });
        }
    }
</script>

<style scoped>

</style>
