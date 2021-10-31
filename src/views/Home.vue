<template>
  <div class="home">
    <ui-textfield v-model="city_name" @change="queryWeather">
      City Name
      <template #before>
        <ui-textfield-icon>location_city</ui-textfield-icon>
      </template>
    </ui-textfield>

    <p>City name: {{ city_name }}</p>

    <ui-card>
      <ui-card-content>
        <ui-card-media>
          <img :src="city_photo" />
          <img :src="weather_data.current?.condition.icon" alt="">
          <p>{{ weather_data.current?.condition.text }}</p>
        </ui-card-media>
        <ui-card-text>Température à {{ weather_data.location?.name}} : {{ weather_data.current?.temp_c }} °C</ui-card-text>
      </ui-card-content>
    </ui-card>

  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    //HelloWorld
  },
  data () {
    return {
      city_name : '',
      city_photo: '',
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
                this.city_photo = URL.createObjectURL(response);
              })
          })
        })
    }
  }
}
</script>
