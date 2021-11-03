<template>
    <ui-textfield v-model="city_name" @change="queryWeather" class="input-search">
      City Name
      <template #before>
        <ui-textfield-icon>location_city</ui-textfield-icon>
      </template>
    </ui-textfield>
</template>

<script>
export default {
  name: 'SearchCity',
  data () {
    return {
      city_name : '',
      weather_data: {}
    }
  },
  methods: {
    queryWeather () {
      this.axios.get('http://api.weatherapi.com/v1/current.json', {
        params: {
          key: process.env.VUE_APP_API_WEATHER,
          q: this.city_name,
          aqi: 'no'
        }
      }).then( (response) => {
        this.weather_data = response.data
          this.axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
            params: {
              key: process.env.VUE_APP_API_GOOGLE,
              query: this.city_name
            }
          }).then( (response) => {
            fetch('https://maps.googleapis.com/maps/api/place/photo?key=' + process.env.VUE_APP_API_GOOGLE + "&photoreference=" + response.data.results[0].photos[0].photo_reference + "&maxheight=300&maxwidth=300")
              .then( (response) => {
                return response.blob();
              }).then( (response) => {
                this.weather_data.city_photo = URL.createObjectURL(response);
                this.$store.commit('push', this.weather_data);
              })
          })
        })
    }
  }
}
</script>

<style scoped lang="scss">
.input-search {
  margin: 1%;
  width: -webkit-fill-available;
}
</style>