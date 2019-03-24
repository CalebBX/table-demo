<template>
    <div>test</div>
</template>
<script>
export default {
    methods: {
        getItems() {
            console.log("test");
            this.$http
                .get(
                    "https://britecore-coding-test.firebaseio.com/payments.json"
                )
                .then(res => console.log(res));
        }
    },
    created() {
        this.getItems();
    }
};
</script>