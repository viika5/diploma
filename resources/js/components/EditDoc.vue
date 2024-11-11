<template>
    <vs-dialog v-if="row" overflow-hidden  v-model="active">
        <template #header>
            <h4 class="not-margin">
                Документы к заявке: № <b>{{row.row.id}}</b>
            </h4>
        </template>

        <div class="con-form h-50 w-100">
            <div class="wrap">
                <div v-for="(doc,index) in docs">
                    <h6><b>{{doc.alias}}</b></h6>
                    <a target="_blank" :href="`/storage/${row.row[doc.name]}`">{{row.row[doc.name] ? row.row[doc.name] : "Файл не загружен"}}</a>

                    <div v-if="doc.name !== 'serial_path'" class="d-flex gap-1 align-items-center justify-content-between">
                        <input type="file" @change="handleFileUpload( $event, doc.name )" :accept="doc.accept" ref="file">
                        <vs-button @click="clear(index, doc.name)">Очистить</vs-button>
                        <vs-button success @click="save(doc.name)">Обновить</vs-button>
                    </div>

                    <div v-else class="d-flex">
                        <vs-input type="text" v-model="row.row.serial_path" placeholder="Серийный номер" style="flex: 1; width: 100%"></vs-input>
                        <vs-button @click="save('serial_path')" success>Сохранить</vs-button>
                    </div>
                    <hr>
                </div>


            </div>
        </div>

<!--        <template #footer>-->
<!--            <div class="footer-dialog">-->
<!--                <vs-button block>Sign In</vs-button>-->
<!--                <div class="new">New Here? <a href="#">Create New Account</a></div>-->
<!--            </div>-->
<!--        </template>-->
    </vs-dialog>
</template>

<script>
    export default {
        name: "EditDoc",
        data: () => ({
            active: false,
            row: null,
            fields: {

            },
            docs: [
                { "name": "admission_path", "alias": "Факт приема", "accept": ".doc,.docx,.xls,.xlsx,.pdf", "type": "file" },
                { "name": "photo_path", "alias": "Фотография", "accept": "image/*", "type": "file" },
                { "name": "serial_path", "alias": "Серийный номер", "accept": "", "type": "input" },
                { "name": "transfer_path", "alias": "Передача конечному потребителю", "accept": ".doc,.docx,.xls,.xlsx,.pdf", "type": "file" },
                { "name": "write_off_path", "alias": "Факт списания", "accept": ".doc,.docx,.xls,.xlsx,.pdf", "type": "file" },
            ]
        }),
        mounted() {
            this.$root.$on('ON_FILE_UPLOAD', (obj) => {
                this.active = true
                this.row = obj
            });
        },
        methods: {
            handleFileUpload(e, key){
                let [file] = e.target.files;
                this.fields[key] = file
            },
            save(key) {
                let { serial_path } = this.row.row;
                this.fields.serial_path = serial_path

                let body = new FormData();
                body.append('_method', 'PUT');
                body.append(key, this.fields[key]);

                axios.post(`/api/item/${this.row.row.id}`, body).then(res => {
                    this.$vs.notification({
                        position: 'top-right',
                        title: `Обновление документов №${this.row.row.id}`,
                        text: `Данные успешно записаны в базу данных`
                    })
                }).catch(() => {
                    alert('Ошибка загрузки');
                }).finally(() => {
                    this.$root.$emit('ON_REFRESH');
                });
            },
            clear(index, key){
                this.$refs.file[index].value = null;
                delete this.fields[key];
            }
        }
    }
</script>

<style>
    .vs-input {
        width: 100%!important;
    }
</style>
