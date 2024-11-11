<template>


    <div class="d-flex justify-content-center align-items-center h-100">
        <div class="card w-25">
            <div class="card-header">
                <h3>Авторизация</h3>
            </div>
            <div class="card-body">
                <div class="input-group mb-3 d-flex">
                    <span class="input-group-text">@</span>
                    <input type="text" v-model="login" class="form-control" placeholder="Логин"/>
                </div>

                <div class="input-group mb-3 d-flex">
                    <span class="input-group-text">@</span>
                    <input type="password" v-model="password" class="form-control" placeholder="Пароль"/>
                </div>
            </div>
            <div class="card-footer d-flex">
                <vs-button @click.prevent="submit" type="submit" class="btn btn-success w-100">Войти</vs-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data: () => ({
            login: null,
            password: null,
        }),
        methods: {
            submit() {
                axios.get('/sanctum/csrf-cookie').then(res => {
                    axios.post('/login', {login: this.login, password: this.password}).then(response => {
                        localStorage.setItem("x_xsrf", response.config.headers["X-XSRF-TOKEN"])
                        this.$router.push({name: 'user.index'})
                    })
                    .catch(err => {
                        this.$vs.notification({color: "danger", position: "bottom-center",title: "Ошибка", text: err.data.message})
                    })
                })

            }
        }
    }
</script>

<style>

</style>
