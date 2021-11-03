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

        const queryWeather = () => {
            let weather_data = {}

            axios.get('http://api.weatherapi.com/v1/current.json', {
                params: {
                key: process.env.VUE_APP_API_WEATHER,
                q: city_name.value,
                aqi: 'no'
                }
            }).then( (response) => {
                weather_data = response.data;
                weather_data.time = new Date().toLocaleString();
                weather_data.city_name = response.data.location.name;
                axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json', {
                    params: {
                    key: process.env.VUE_APP_API_GOOGLE,
                    query: city_name.value
                    }
                }).then( (response) => {
                    fetch('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?key=' + process.env.VUE_APP_API_GOOGLE + "&photoreference=" + response.data.results[0].photos[0].photo_reference + "&maxheight=300&maxwidth=300", 
                    {
                        mode: 'cors',
                        headers: new Headers({'Access-Control-Allow-Origin':'*'})
                    })
                    .then( (response) => {
                        return response.blob();
                    }).then( (response) => {
                        weather_data.city_photo = URL.createObjectURL(response);
                        store.commit('push', weather_data);
                    })
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