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
      weather_data: {}
    }
  },
  methods: {
    queryWeather () {
      console.log(process.env)
      this.axios.get('http://api.weatherapi.com/v1/current.json', {
        params: {
          key: process.env.VUE_APP_API_WEATHER,
          q: this.city_name,
          aqi: 'no'
        }
      }).then( (response) => {
        this.weather_data = response.data
        console.log(response.data)
      })
    }
  }
}
//http://api.weatherapi.com/v1/current.json?key=87660a1cef9e43ab8cc133646213010&q=London&aqi=no
// that.axios.get('/api',{
//                 params: {
//                     period: (d.getMonth() + 1) + "/" + d.getFullYear()
//                 }
//             }).then(function (response) {
//                 that.depenses = response.data;
//                 that.data = that.depenses.slice((that.page - 1)*8, (that.page - 1)*8 + 8)
//                 that.total = response.data.length;
//             }).catch(function (error) {
//                 console.log(error);
//             });
</script>
