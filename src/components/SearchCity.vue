<template>
    <ui-textfield v-model="city_name" @change="queryWeather" class="input-search">
      City Name
      <template #before>
        <ui-textfield-icon>location_city</ui-textfield-icon>
      </template>
    </ui-textfield>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios';
import { useStore } from 'vuex'

export default {
    name: 'SearchCity',
    setup() {
        const store      = useStore()

        const city_name  = ref('')
        const proxy_url = process.env.VUE_APP_PROXY_URL

        const queryWeather = () => {
            let weather_data = {}

            axios.get('http://api.weatherapi.com/v1/current.json', {
                params: {
                key: process.env.VUE_APP_API_WEATHER || 'null',
                q: city_name.value,
                aqi: 'no'
                }
            }).then( (response) => {
                weather_data = response.data;
                weather_data.time = new Date().toLocaleString();
                weather_data.city_name = response.data.location.name;
                axios.get(proxy_url + 'https://maps.googleapis.com/maps/api/place/textsearch/json', {
                    params: {
                    key: process.env.VUE_APP_API_GOOGLE,
                    query: city_name.value
                    }
                }).then( (response) => {
                    weather_data.city_photo = response.data.results[0].photos[0].photo_reference;
                    store.commit('push', weather_data);
                })
            })
        }

        return {
            city_name,
            queryWeather
        }
    },
 
}
</script>

<style scoped lang="scss">
.input-search {
  margin: 1%;
  width: -webkit-fill-available;
}
</style>