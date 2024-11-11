<template>
    <vs-dialog v-model="editActive" v-if="obj" width="550px" prevent-close>
        <template #header>
            <h4>Массовое редактирование</h4>
        </template>

        <div v-if="obj.columns" class="d-flex flex-column justify-content-between">
            <div v-for="item in data">
                <div class="d-flex mb-2 gap-1 align-items-center justify-center">
                    <p class="mb-1" style="flex: 1;">Поле:</p>
                    <select class="vs-select vs-select--state-null" style="flex: 2;" v-model="item.field">
                        <option v-for="(col, i) in cols" :key="i" :value="col.field">
                            {{col.label}}
                        </option>
                    </select>
                    <div style="flex: .1"></div>
                </div>

                <div class="d-flex mb-2 gap-1 align-items-center justify-center gap-1">
                    <p class="mb-1" style="flex: 1;">Значение:</p>
                    <input class="form-control" style="flex: 2; margin-left: 1em;"  v-model="item.val"/>
                    <div @click="data.splice(item, 1)" style="flex: .1">
                        <i class='bx bx-trash-alt'></i>
                    </div>
                </div>

            </div>

            <p style="overflow-wrap: anywhere; overflow: auto; max-height: 100px"> № заявок которые будут затронуты: {{obj.rows.join(',')}}  </p>
        </div>

        <div class="d-flex ">
            <vs-button @click="update" style="width: 100%">Отправить</vs-button>
            <vs-button @click="add" success icon>
                Добавить параметр
                <i class='bx bx-book-add'></i>
            </vs-button>
        </div>

    </vs-dialog>
</template>

<script>
    export default {
        name: "MassEdit",
        data: () => ({
            obj: [],
            data: [{
                field: null,
                val: null,
            }],
            editActive: false
        }),
        computed: {
            cols(){
                let cols =  [...this.obj.columns];
                cols.splice(0, 16);
                return cols;
            }
        },
        methods: {
            add(){
                this.data.push({field: null, val: null,})
            },
            update(){
                const ids = this.obj.rows;

                const body = {
                    ids,
                    data: [...this.data.map(x => {
                        return { [x.field]: x.val }
                    })]
                }

                axios.put(`/api/item/items`, {...body}).then(response => {
                    this.$root.$emit('ON_REFRESH');
                    this.editActive = false;
                })
            }
        },
        mounted() {
            this.$root.$on('ON_EDIT_FIELD', (val) => {
                console.log(val)
                this.obj = val;
                this.editActive = true;
            })
        }
    }
</script>

<style scoped>

</style>
