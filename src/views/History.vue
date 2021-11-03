<template>
  <div class="about">
    <h1>This is an history page</h1>
    <ui-table :data="data" :thead="['City Name', 'Time']" :tbody="['city_name', 'time']"></ui-table>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'History',
  components: {
  },
  setup () {
    const store = useStore()

    store.commit('initialiseStore');

    return {
      data: computed(() => store.state.data),
    }
  },
}
</script>

<style scoped lang="scss">
</style>
