<template>
    <div class="home">
        <div class="header" ref="headers">
            <vs-navbar v-model="active" dark square class="py-2 bg-black">
                <template #left>
                    <svg id="logo" @click="$router.push({name: 'user.index'})" width="170" height="50" xmlns="http://www.w3.org/2000/svg" style="transform: scale(.85);">
                        <g>
                            <title>Layer 1</title>
                            <g id="svg_1">
                                <path fill="#fff" d="m22.8918,11.50894c2.827,7.1293 -1.7824,11.7049 -6.3724,16.2879c-4.2731,4.682 -8.0372,9.549 -0.4664,18.31c-2.8291,-7.127 1.7811,-11.705 6.368,-16.282c4.277,-4.694 8.0403,-9.5542 0.4708,-18.3159z" clip-rule="evenodd" fill-rule="evenodd"/>
                                <path fill="#fff" d="m16.053,2.39314c2.8305,7.1306 -1.7771,11.7031 -6.3706,16.2839c-4.2722,4.6875 -8.0351,9.5548 -0.462,18.3148c-2.8296,-7.134 1.7797,-11.706 6.3688,-16.286c4.2745,-4.6871 8.0342,-9.5528 0.4638,-18.3127z" clip-rule="evenodd" fill-rule="evenodd"/>
                                <path fill="#fff" d="m132.218,18.05342l0,14.572l6.421,0l0,-5.334l7.056,0l0,-3.191l-7.056,0l0,-2.857l13.997,0l0,11.382l6.422,0l0,-11.382l5.817,0l0,-3.19" clip-rule="evenodd" fill-rule="evenodd"/>
                                <path fill="#fff" d="m118.10667,29.43068l0,-2.527l8.374,0l0,-3.191l-8.374,0l0,-2.501l10.755,0l0,-3.191l-17.177,0l0,14.572l17.309,0l0,-3.162" clip-rule="evenodd" fill-rule="evenodd"/>
                                <path fill="#fff" d="m50.7126,17.89763l-17.7938,0l0,3.19l5.6864,0l0,11.382l6.4219,0l0,-11.382l5.6855,0" clip-rule="evenodd" fill-rule="evenodd"/>
                                <path fill="#fff" d="m63.3921,17.89663l-6.8831,0l-8.0153,14.572l4.174,0l1.3177,-2.502l8.9999,0l1.3133,2.502l7.1123,0m-15.8352,-5.522l2.9708,-5.639l2.8445,5.639l-5.8153,0z" clip-rule="evenodd" fill-rule="evenodd"/>
                                <path fill="#fff" d="m104.14,17.98993l0,7.284l-10.27,-7.284l-4.985,0l0,14.571l4.397,0l0,-8.017l10.544,8.017l4.708,0l0,-14.571" clip-rule="evenodd" fill-rule="evenodd"/>
                                <path fill="#fff" d="m86.704,17.95819l-17.4213,0l0,3.19l5.6851,0l0,11.382l6.4232,0l0,-11.382l5.313,0" clip-rule="evenodd" fill-rule="evenodd"/>
                            </g>
                            <text transform="matrix(0.967243 0 0 0.907443 1.11501 5.06025)" stroke="#000" xml:space="preserve" text-anchor="start" font-family="'Arimo'" font-size="14" id="svg_10" y="46.47691" x="34.33429" stroke-width="0" fill="#fff">ПОРТАЛ ТМЦ</text>
                        </g>
                    </svg>

                    <template v-if="token">
                        <vs-button square ripple="" icon flat @click="$root.$emit('ON_REFRESH')" class="mr-1 my-1 alex-btn">
                            Обновить
                        </vs-button>

                        <vs-button square danger  flat @click="$root.$emit('DELETE_ROWS')" class="mr-1 my-1 alex-btn">
                            Удалить строки
                        </vs-button>

                        <vs-button square warn  flat @click="$root.$emit('MASS_UPDATE')" class="mr-1 my-1 alex-btn">
                            Массовое редактирование
                        </vs-button>

                        <vs-button square ripple="" flat @click="$root.$emit('ON_EXAMPLE')" class="mr-1 my-1 alex-btn">
                            Скачать форму для заявки
                        </vs-button>
                    </template>

                    <template v-if="!token">
                        <vs-button square v-if="!token" @click="$router.push({ name: 'user.registration'})" :active="active == 'request'" id="registration"  class="alex-btn">
                            Регистрация
                        </vs-button>

                    </template>
                </template>
                <pre>

                </pre>
                <template #right>
                    <vs-button square v-if="!token" flat @click.prevent="logout" href="#" class="text-white alex-btn"> Авторизация</vs-button>

                    <form v-if="token">
                        <vs-button square title="Импорт" flat icon type="submit" color="#7d33ff" class="mr-1 my-1 border-bottom alex-btn">
                            <input type="file" ref="import" class="input_import" @change="importFile">
                            <i class="bx bx-upload "></i>
                        </vs-button>
                    </form>

                    <div v-if="token" class="dropdown">
                        <vs-button square flat  icon class="btn alex-btn dropdown-toggle" style="padding-right: 1.1em" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {{user.fio}}
                            <i class='bx bx-cog'></i>
                        </vs-button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <personal v-model="user"></personal>
                            <hr>
                            <li><a @click="$root.$emit('ON_EXCEL')" class="dropdown-item" href="#">Экспорт</a></li>
                            <li><a v-if="token" @click.prevent="logout"  class="dropdown-item" href="#">Выход</a></li>
                        </ul>
                    </div>
                </template>

            </vs-navbar>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Personal from "./Personal";

    export default {
        name: "Index",
        data: () => ({
            token: null,
            active: 'main',
            user: {},
        }),
        components: {
            Personal
        },
        mounted() {
            this.getToken();
        },
        updated() {
            this.getToken();
        },
        methods: {
            importFile(e){
                if (confirm('Перед началом импорта убедитесь что заголовок таблицы начинается с 3 строки Excel')) {
                    this.$root.$emit('ON_IMPORT', e.target.files[0])
                    this.$refs.import.value = null
                }
            },
            getToken() {
                this.token = localStorage.getItem("x_xsrf")
            },
            logout() {
                axios.post('/logout').then(res => {
                    localStorage.removeItem("x_xsrf");
                    this.$router.push({name: 'user.login'})
                })
            }
        }
    }
</script>

<style>
    body {

    }

    .alex-btn {
        background: transparent!important;
        color: white!important;
        border: 1px solid white!important;
    }

    .home {
        display: flex;
        height: 100vh;
        flex-direction: column;
    }

    .header {
        height: 65px;
        background: #eee;
        /*background: #038e63;*/
    }

    .content {
        display: flex;
        flex: 2;
        align-items: stretch;
        flex-direction: column;
        max-height: calc(100vh - 65px);
        max-height: -webkit-calc(100vh - 65px);
    }


    .border-bottom {
        border-bottom: 1px solid white;
    }

    .square {
        /*height: 100%;*/
    }

    #logo {
        cursor: pointer;
    }
</style>
