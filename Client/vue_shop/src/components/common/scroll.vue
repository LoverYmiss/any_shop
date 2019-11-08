<template>
  <vue-scroll
    :ops="ops"
  ></vue-scroll>
</template>

<script>
  export default {
    name: "scroll",
    data () {
      return {
      }
    },
    mounted() {
      console.log(this.ops);
    }
  }
</script>

<style scoped>

</style>
