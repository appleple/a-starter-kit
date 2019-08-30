<template>
	<section>
		<h1><i class="fab fa-vuejs"></i> Vue example</h1>

		<p>{{ count }}</p>
		<button @click="plus"><i class="fas fa-plus"></i> plus</button>
	</section>
</template>

<script>
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { faPlus } from '@fortawesome/free-solid-svg-icons';
  import { faVuejs } from '@fortawesome/free-brands-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { store } from "../containers/store";

  library.add(faPlus, faVuejs);

  export default {
    name: "example",
	components: { FontAwesomeIcon },
    data() {
      return {
        store,
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
