<template>
	<section>
		<h1>Vue example</h1>

		<p>{{ count }}</p>
		<button @click="plus">plus</button>
	</section>
</template>

<script>
  export default {
    name: "sample",
    data() {
      return {
        count: 0,
      }
    },
    methods: {
      plus() {
        this.count++;
      }
    }
  }
</script>

<style scoped>

</style>
