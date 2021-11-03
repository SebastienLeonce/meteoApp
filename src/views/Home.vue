<template>
  <div>
    <search-city />

    <div class="card-container">
      <weather-card v-for="weather in data" :weather=weather :key=weather.id />
    </div>

  </div>
</template>

<script>
import WeatherCard from '@/components/WeatherCard.vue'
import SearchCity from '@/components/SearchCity.vue'

export default {
  name: 'Home',
  components: {
    WeatherCard,
    SearchCity
  },
  computed: {
    data() {
      return this.$store.state.data
    }
  },
  beforeCreate() {
		this.$store.commit('initialiseStore');
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
