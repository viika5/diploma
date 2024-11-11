<template>
    <vs-dialog v-model="editActive" v-if="row.row">
        <template #header>
            <h4>Редактирование заявки №{{row.row.id}}</h4>
        </template>

        <template v-if="row.field in dics">
            <div class="d-flex justify-content-between align-items-center">
                <p>{{row.label}}</p>
                <vs-select v-model="value" @blur="update" filter>
                    <vs-option v-for="item in dics[row.field]" :label="item" :key="item" :value="item">{{item}}</vs-option>
                </vs-select>
            </div>
        </template>
        <template v-else>
            <div class="d-flex justify-content-between align-items-center">
                <p>{{row.label}}</p>
                <vs-input type="text" v-model="value" v-on:keyup.enter="update" :value="row.value" @blur="update" style="width: 100%!important;"/>
            </div>
        </template>

    </vs-dialog>
</template>

<script>
    export default {
        name: "EditModal",
        props: ['dics'],
        data: () => ({
            editActive: false,
            row: {},
            value: null
        }),
        methods: {
            update(){
                let body = {};
                body[this.row.field] = this.value;

                if(this.value == this.row.value){
                    return;
                }

                axios.put(`/api/item/${this.row.row.id}`, body).then(response => {
                    this.$root.$emit('ON_REFRESH')
                }).finally(() => {
                    this.editActive = false;
                })

            }
        },
        mounted() {
            this.$root.$on('ON_EDIT_CELL', (val) => {
                this.row = val
                this.value = val.value
                this.editActive = true;
            });
        }
    }
</script>

<style scoped>

</style>
