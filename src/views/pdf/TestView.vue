<template>

<test />

</template>

<script>
export default {

    data:() => {

    },
    components: {
        'test': () => import('../components/upload/testPdf.vue'),
    },


}
</script>

<style>

</style>