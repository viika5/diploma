<template>
    <div>
        <h2>Test</h2>
        <input type="file" @change="setFile" ref="file">
        <button class="btn btn-success" @click="send">send</button>
    </div>
</template>

<script>
    export default {
        name: "Test",
        data: () => ({
            file: null,
        }),
        methods: {
            setFile(e){
                this.file =  this.$refs.file.files[0];
            },
            send(){
                let body = new FormData();
                body.append('file', this.file);
                body.append("_method", "PUT");

                axios.post('http://localhost:8000/api/item/3300', body, { headers: {"Content-Type": "multipart/form-data" }}).then(res => {
                    console.log(res.data)
                })
            }
        }
    }
</script>

<style scoped>

</style>
