<template>
    <ui-textfield v-model="city_name" @change="queryWeather" class="input-search">
      City Name
      <template #before>
        <ui-textfield-icon>location_city</ui-textfield-icon>
      </template>
    </ui-textfield>
</template>

<script>
import { ref, reactive } from 'vue'
import axios from 'axios';
import { useStore } from 'vuex'

export default {
    name: 'SearchCity',
    setup() {
        const store      = useStore()

        const city_name  = ref('')
        let weather_data = reactive({})

        const queryWeather = () => {
            axios.get('http://api.weatherapi.com/v1/current.json', {
                params: {
                key: process.env.VUE_APP_API_WEATHER,
                q: city_name.value,
                aqi: 'no'
                }
            }).then( (response) => {
                weather_data = response.data
                axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
                    params: {
                    key: process.env.VUE_APP_API_GOOGLE,
                    query: city_name.value
                    }
                }).then( (response) => {
                    fetch('https://maps.googleapis.com/maps/api/place/photo?key=' + process.env.VUE_APP_API_GOOGLE + "&photoreference=" + response.data.results[0].photos[0].photo_reference + "&maxheight=300&maxwidth=300")
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
            weather_data,
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