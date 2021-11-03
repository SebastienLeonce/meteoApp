<template>
  <div>
    <search-city />

    <div class="card-container">
      <weather-card v-for="weather in data" :weather=weather :key=weather.id />
    </div>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

import WeatherCard from '@/components/WeatherCard.vue'
import SearchCity from '@/components/SearchCity.vue'

export default {
  name: 'Home',
  components: {
    WeatherCard,
    SearchCity
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
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
