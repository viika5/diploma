<template>

    <div class="d-flex justify-content-center align-items-center h-100">
        <div class="card w-25">
            <div class="card-header">
                <h3>Регистрация</h3>
            </div>
            <div class="card-body">

                <input type="text" v-model="fio" class="form-control mb-3" placeholder="ФИО">
                <input type="text" v-model="login" class="form-control mb-3" placeholder="Логин">
                <input type="password" v-model="password" class="form-control mb-3" placeholder="Пароль">
                <input type="password" v-model="password_confirmation" class="form-control mb-3" placeholder="Потверждение">

                <select v-model="initiator" class="form-select mb-3">
                    <option value="null" selected>Выберитие инициатора заявок (ИЗ)</option>
                    <option v-for="init in initiators" :value="init">{{init.name}}</option>
                </select>

                <select v-model="department" class="form-select mb-3">
                    <option value="null">Выберитие подразделение ИЗ</option>
                    <option v-for="dept in departments" :value="dept.name">{{dept.name}}</option>
                </select>

                <vs-button @click.prevent="register" type="submit" class="btn btn-success w-100">Регистрация</vs-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Registration",
        data: () => ({
            fio: null,
            login: null,
            initiator: null,
            department: null,
            password: null,
            password_confirmation: null,

            initiators: [],
            departments: [],
        }),
        watch: {
            initiator(val){
                this.getDepartment(val.id)
            }
        },
        methods: {
            getInitiator(){
                axios.get('/api/initiator').then(response => {
                    this.initiators = response.data
                })
            },
            getDepartment(id = 1){
                axios.get(`/api/initiator/${id}`).then(response => {
                    this.departments = response.data
                })
            },
            register() {
                axios.get('/sanctum/csrf-cookie').then(res => {
                    axios.post('/register', {
                        login: this.login,
                        fio: this.fio,
                        initiator: this.initiator.name,
                        department: this.department,
                        password: this.password,
                        password_confirmation: this.password_confirmation
                    }).then(response => {
                        localStorage.setItem("x_xsrf", response.config.headers["X-XSRF-TOKEN"])
                        this.$router.push({name: 'user.personal'})
                    }).catch(error => {
                        let message = Object.values(error.data.errors).reduce((i, item) => i += item + '\n', '');


                        alert(message)
                    })
                })
            },
        },
        mounted() {
            this.getInitiator()
            this.getDepartment()
        }
    }
</script>

<style scoped>

</style>
