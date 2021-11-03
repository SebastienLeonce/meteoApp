<template>
  <div class="home">
    <ui-textfield v-model="city_name" @change="queryWeather" class="input-search">
      City Name
      <template #before>
        <ui-textfield-icon>location_city</ui-textfield-icon>
      </template>
    </ui-textfield>

    <div class="card-container">
      <ui-card class="card" v-for="weather in data" :key=weather.id>
        <ui-card-content>
          <ui-card-media class="card-content-media">
            <img :src="weather.city_photo"/>
          </ui-card-media>
          <ui-divider></ui-divider>
          <ui-card-text>
            <div class="card-content-text-img">
              <img :src="weather.current?.condition.icon" alt="">
              <p>{{ weather.current?.condition.text }}</p>
            </div>
            <p>Température à {{ weather.location?.name}} : {{ weather.current?.temp_c }} °C</p>
          </ui-card-text>
        </ui-card-content>
      </ui-card>
    </div>

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
  computed: {
    data() {
      return this.$store.state.data
    }
  },
  beforeCreate() {
		this.$store.commit('initialiseStore');
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

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  margin: 1%;
}

.card-content-text-img {
  display: flex;
  justify-content: center;
}

.card-content-media {
  height: 300px;
  width: 300px;
  display:flex;
  align-items:center;
}

.input-search {
  margin: 1%;
  width: -webkit-fill-available;
}

</style>
