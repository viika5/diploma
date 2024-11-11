<template>
    <div style="height: 100%">
        <div ref="actions" class="actions d-flex align-items-end"></div>

        <div class="table-container" :style="{ height: height }">
            <vue-good-table
                ref="tbl"
                @on-page-change="onPageChange"
                @on-sort-change="onSortChange"
                @on-column-filter="onColumnFilter"
                @on-per-page-change="onPerPageChange"
                @on-search="onSearch"
                @on-row-mouseenter="mouse"
                mode="remote"
                :totalRows="totalPages"
                :isLoading.sync="isLoading"
                :search-options="{
                    enabled: true,
                    searchFn: onSearch,
                    placeholder: 'Поиск... Абсолютно везде..',
                }"
                :pagination-options=" {
                    enabled: true,
                    mode: 'pages',
                    perPage: 1,
                    perPageDropdownEnabled : false,
                    nextLabel: 'Далее',
                    prevLabel: 'Назад',
                    pageLabel: 'Страница',
                    ofLabel: 'из',
                    //dropdownAllowAll: true,
                    //perPageDropdown: [5, 10, 15, 30, 40, 50],
                }"
                :select-options="{
                    enabled: true,
                    selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                    selectionInfoClass: 'custom-class',
                    selectionText: 'cтрок выделено',
                    clearSelectionText: 'Очистить',
                    disableSelectInfo: true, // disable the select info panel on top
                    selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
                 }"
                :rows="rows"
                :columns="columns"
                compactMode
            >

                <div slot="table-actions" class="h-100">
                    <div class="filter d-flex h-100 justify-content-center align-items-center gap-1">
                        <span>Фильтр по статусу:</span>
                        <vs-radio color="#27bfbf" v-model="serverParams.status" val="0">
                            Все
                        </vs-radio>
                        <vs-radio color="#FFFFFF" v-model="serverParams.status" val="1">
                            1
                        </vs-radio>
                        <vs-radio color="#A7FFCF" v-model="serverParams.status" val="2">
                            2
                        </vs-radio>
                        <vs-radio color="#01FF74" v-model="serverParams.status" val="3">
                            3
                        </vs-radio>
                        <vs-radio color="#00B050" v-model="serverParams.status" val="4">
                            4
                        </vs-radio>
                        <vs-button @click="clearFilter" color="red">Очистить фильтры</vs-button>
                    </div>

                </div>

                <div slot="emptystate">
                    <p class="text-center">В таблице отсутствуют данные</p>
                </div>

                <template slot="table-row" onmousemove="mouse" class="d-flex justify-content-center align-items-center" slot-scope="props">
                     <div v-if="props.column.field == 'actions'" class="">
<!--                         <div class="d-flex align-items-center justify-content-center">-->
<!--                             <vs-button @click="$root.$emit('ON_EDIT_ROW', {row: props.row, value: props.row[props.column.field], field: props.column.field})" warn icon>-->
<!--                                 <i class="bx bx-edit-alt"></i>-->
<!--                             </vs-button>-->

<!--                             <vs-button @click="$root.$emit('ON_FILE_UPLOAD', {row: props.row})" primary icon>-->
<!--                                 <i class="bx bxs-file-doc"></i>-->
<!--                             </vs-button>-->
<!--                         </div>-->
                         <div class="d-flex justify-content-around">
<!--                             Поставка-->
                             <battery-delivery :data="props.row" :column="props.column.field"></battery-delivery>
<!--                             1С Интеграция-->
                             <battery-document></battery-document>
<!--                             Движение-->
                             <battery :data="props.row"></battery>
                         </div>
                     </div>

                    <div v-else-if="props.column.field == 'id'">
                        <p class="text-center m-0">{{props.row[props.column.field]}}</p>
                    </div>

                    <div class="h-100 w-100" :class="props.column.color" v-on:dblclick="$root.$emit('ON_EDIT_CELL', {row: props.row, value: props.row[props.column.field], field: props.column.field, label: props.column.label})" v-else>
                        <div class="h-100 w-100" @change.blur="onUpdateCell(props, $event.target.value)" >{{props.row[props.column.field]}}</div>
                    </div>
                </template>
            </vue-good-table>

            <edit-doc></edit-doc>
            <edit-modal :dics="dics"></edit-modal>
            <edit-row-modal></edit-row-modal>
            <mass-edit></mass-edit>
        </div>
    </div>
</template>

<script>
    import EditModal from "./EditModal";
    import EditRowModal from "./EditRowModal";
    import MassEdit from "./MassEdit";
    import Battery from "./Battery";
    import EditDoc from "./EditDoc";
    import BatteryDelivery from "./BatteryDelivery";
    import BatteryDocument from "./BatteryDocument";

    const fileDownload = require('js-file-download');
    const querystring = require('querystring');

    export default {
        name: 'Get',
        components: {BatteryDocument, BatteryDelivery, EditDoc, Battery, EditRowModal, EditModal, MassEdit },
        data: () => ({
            dics: {
                department: [],
                initiator: [],
                vid_zakupki_em_tzp_modns: []
            },
            columns: [
                // {"label": "#", "field": "id", filterOptions: { enabled: true, placeholder: `#`, trigger: 'enter' }, color: "req" },
                {"label": "Движение ТМЦ", "field": "actions", color: "req" },
                {"label": "№П/п", "field": "pp", filterOptions: { enabled: true, placeholder: `#`, trigger: 'enter' }, color: "req" },
                {"label": "Наименование", "field": "name", width: '300px', filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "req" },
                {"label": "Ед.изм", "field": "measure", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "req" },
                {"label": "Колво", "field": "count", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "req" },
                {"label": "Цена план", field: "plan_price", type: "decimal", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "req" },
                {"label": "Стоимость", "field": "plan_cost", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "req" },
                {"label": "Вид заявки", "field": "type", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "req" },
                {"label": "Номер материала", "field": "number_material", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "req" },
                {"label": "Наличие ТТУ", "field": "ttu", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "req" },
                {"label": "Месяц", "field": "month", filterOptions: { enabled: true, placeholder: ` `, trigger: 'enter' }, color: "req" },
                {"label": "Год", "field": "year", filterOptions: { enabled: true, placeholder: ` `, trigger: 'enter' }, color: "req" },
                {"label": "Статья затрат", "field": "cost_type", filterOptions: { enabled: true, placeholder: ` `, trigger: 'enter' }, color: "req" },
                {"label": "Инициатор", "field": "initiator", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter', filterDropdownItems: [] }, color: "req" },
                {"label": "Подразделение", "field": "department", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter', filterDropdownItems: [] }, color: "req" },
                {"label": "Склад", "field": "storage", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "req" },
                {"label": "ФИО", "field": "fio", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "req" },
                // {"label": "Баланс/За баланс", "field": "invoice_type", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "req" },
                // {"label":"user_id","field":"user_id", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "req },

                {"label": "СЭД", "field": "sed", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "ss" },
                {"label": "ФИО исполниля СС", "field": "fio_ispolnilya_ss", filterOptions: { enabled: true, placeholder: ` `, trigger: 'enter' }, color: "ss" },
                {"label": "Вид закупки (ЭМ, ТЗП, МО,ДНС)", "field": "vid_zakupki_em_tzp_modns", filterOptions: { enabled: true, placeholder: ` `, trigger: 'enter', filterDropdownItems: [] }, color: "ss" },
                // {"label": "user_moderate_id", "field": "user_moderate_id", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "ss" },
                {"label": "Номер договора", "field": "contract", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "ss" },
                {"label": "№ материала", "field": "material", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "ss" },
                {"label": "Стоимость без НДС (план)", "field": "stoimost_bez_nds_fakt", filterOptions: { enabled: true, placeholder: ` `, trigger: 'enter' }, color: "ss" },
                {"label": "Стоимость без НДС (факт)", "field": "fact_cost", filterOptions: { enabled: true, placeholder: ` `, trigger: 'enter' }, color: "ss" },
                {"label": "Статус", "field": "status", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "ss" },
                {"label": "Срок поставки", "field": "term", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "ss" },
                {"label": "Примечание", "field": "description", filterOptions: { enabled: true, placeholder: `Поиск`, trigger: 'enter' }, color: "ss" },
            ],
            height: 0,
            rows: [],

            isLoading: false,
            totalRecords: 0,
            totalPages: 0,
            editActive: false,
            serverParams: {
                search: '',
                columnFilters: {},
                sort_field: 'id',
                sort_type: 'asc',
                page: 1,
                status: 0,
            },

        }),
        computed: {},
        watch: {
            'serverParams.status'(){
                this.loadItems()
            },
            'dics'(val){
                let [department] = this.columns.filter(x => x.field === "department");
                let [initiator] = this.columns.filter(x => x.field === "initiator");
                let [vid_zakupki_em_tzp_modns] = this.columns.filter(x => x.field === "vid_zakupki_em_tzp_modns");
                department.filterOptions.filterDropdownItems = val.initiator;
                initiator.filterOptions.filterDropdownItems = val.department;
                vid_zakupki_em_tzp_modns.filterOptions.filterDropdownItems = val.vid_zakupki_em_tzp_modns;
            }
        },
        mounted() {
            this.$root.$on('ON_REFRESH', () => {
                this.loadItems();
            })

            this.$root.$on('ON_EXCEL', () => {
                this.exportExcel();
            })

            this.$root.$on('ON_IMPORT', (e) => {
                this.importExcel(e);
            })

            this.$root.$on('ON_EXAMPLE', () => {
                this.example();
            })

            this.$root.$on('ON_PREVIEW_FILE', (e) => {
                this.previewFiles(e);
            })

            this.$root.$on('MASS_UPDATE', () => {
                this.massUpdate();
            })

            this.$root.$on('DELETE_ROWS', () => {
                this.deleteRows();
            })

            this.loadDics().then(_ => {
                this.loadItems();
            })
            this.calcHeightTable()
        },
        methods: {
            /**
             *
             * @param title
             * @param text
             * @param position
             * @param color
             */
            openNotification(title, text, position = 'bottom-center', color = 'success') {
                this.$vs.notification({
                    color,
                    position,
                    title,
                    text,
                })
            },
            mouse(e){
                console.log(e)
            },
            example(){
                window.open('/form.xlsx', '_blank');
            },
            massUpdate() {
                let rows = this.$refs.tbl.selectedRows.map(x => x.id);
                if (rows.length <= 0) return this.openNotification('Внимание', 'Не выбраны строки для редактирования', 'bottom-center', 'warn');

                this.$root.$emit('ON_EDIT_FIELD', {columns: this.columns, rows});
            },
            deleteRows() {
                let rows = this.$refs.tbl.selectedRows.map(x => x.id);
                if (rows.length <= 0) return this.openNotification('Внимание', 'Не выбраны строки для удаления', 'bottom-center', 'warn');

                axios.delete(`/api/item/${rows}`)
                    .then(response => {
                        this.openNotification(response.data.message, "", 'bottom-center', 'success')
                        this.loadItems();
                    })
            },
            calcHeightTable() {
                let header = document.getElementsByClassName("header")[0].clientHeight
                let search = document.getElementsByClassName("vgt-global-search")[0].clientHeight
                let footer = document.getElementsByClassName("vgt-wrap__footer")[0].clientHeight

                let height = window.innerHeight - (this.$refs.actions.clientHeight + header + footer + search + 4);
                this.height = `${height}px`
            },
            importExcel(file) {
                let body = new FormData();
                body.append('excel', file);

                axios.post('/api/item', body).then(res => {
                    this.openNotification('Файл успешно импортирован', "", 'bottom-center', 'success')
                    this.loadItems();
                })
            },
            previewFiles(event) {
                console.log("FILES", event.target.files);
                this.importExcel(event.target.files[0])
            },
            exportExcel() {
                axios.get('/api/item/export', {responseType: 'blob'}).then(res => {
                    fileDownload(res.data, 'item.xlsx');
                    console.log(res);
                })
            },
            onUpdateCell(props, newVal) {
                let res = this.rows.find(x => x.id == props.formattedRow.id)
                if (props.column.field == "id") {
                    return;
                }
                delete res["row_num"];
                res[props.column.field] = newVal

                axios.put(`/api/cars/${props.formattedRow.id}`, res).then(res => {
                    this.openNotification('Данные успешно обновлены', "", 'bottom-center', 'success')
                }).catch((e) => {
                    this.openNotification('Ошибка', e.data.message, 'top-left', 'danger')
                })
            },
            onLog() {
                console.log(this.rows);
            },
            updateParams(newProps) {
                this.serverParams = {...this.serverParams, ...newProps}
            },
            onSearch(obj) {
                if (obj.searchTerm.length <= 3 && obj.searchTerm !== '') return;

                this.updateParams({
                    search: obj.searchTerm
                });

                this.loadItems();
            },
            onPageChange(params) {
                this.updateParams({
                    page: params.currentPage,
                });
                this.loadItems();
            },
            onPerPageChange(params) {
                this.updateParams({perPage: params.currentPerPage});
                this.loadItems();
            },
            onSortChange(params) {
                let [settings] = params

                this.updateParams({
                    sort_field: settings.field,
                    sort_type: settings.type,
                });
                this.loadItems();
            },
            onColumnFilter(params) {
                this.updateParams(params);
                this.loadItems();
            },
            clearFilter(){
                this.serverParams.search =  '';
                this.serverParams.columnFilters = {};
                this.serverParams.status = 0;

                this.loadItems();
            },
            async loadDics(){
                await axios.get('/api/item/dict').then(res => {
                    let {data} = res;
                    this.dics = {...data}
                })
            },
            async loadItems() {
                this.isLoading = true
                const loading = this.$vs.loading();
                let qs = querystring.stringify(this.serverParams)
                let columnParams = "";

                for (var par in this.serverParams.columnFilters){
                    columnParams += `&filter[${par}]=${this.serverParams.columnFilters[par]}`;
                }

                qs = qs + columnParams;

                console.log(qs)

                await axios.get(`/api/item?${qs}`, this.serverParams).then(res => {
                    this.totalRecords = res.data.total;
                    this.rows = res.data.data;
                    this.totalPages = res.data.last_page;
                    this.isLoading = false
                }).finally(function () {
                    loading.close();
                })
            }
        },
        created() {
            window.addEventListener("resize", this.calcHeightTable);
        },
        destroyed() {
            window.removeEventListener("resize", this.calcHeightTable);
        },
    };
</script>

<style>
    .ss {
        background: #DDEBF7!important;
        text-align: center;
    }

    .req {
        background: #E2EFDA!important;
        text-align: center;
    }

    .vgt-global-search {
        padding: .7em 0!important;
    }

    .vgt-table.bordered td, .vgt-table.bordered th {
        border: 1px solid #000;
    }

    .vgt-table td {
        padding: 0!important;
    }
    .cell {
        display: block;
    }

    .table-container {
        height: 80%;
    }

    .vgt-table td {
        height: 1px!important;
    }

    thead {
        top: -5px;
        position: sticky;
        background-color: #fff;
        z-index: 1;
    }

    .vgt-wrap {
        height: 100%;
    }

    .vgt-inner-wrap {
        height: 100%;
    }

    .vgt-responsive {
        height: 100%;
    }

    .button_import {
        position: relative;
        min-width: min-content;
    }

    .input_import {
        position: absolute;
        width: 100%;
        opacity: 0;
        height: 100%;
    }
</style>
