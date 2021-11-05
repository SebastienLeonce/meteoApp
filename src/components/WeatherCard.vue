<template>
  <ui-card class="card">
    <ui-card-content>
      <ui-card-media class="card-content-media">
        <img :src="photo_url" loading="lazy"/>
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
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'WeatherCard',
  props: {
    weather: Object
  },
  setup(props) {
    const photo_url = ref('');
    const proxy_url = process.env.VUE_APP_PROXY_URL;
    
    fetch(proxy_url + 'https://maps.googleapis.com/maps/api/place/photo?key=' + process.env.VUE_APP_API_GOOGLE + "&photoreference=" + props.weather.city_photo + "&maxheight=300&maxwidth=300")
      .then( (response) => {
          return response.blob();
      }).then( (response) => {
          photo_url.value = URL.createObjectURL(response);
      });

    return {
      photo_url,
    }
  }
}
</script>

<style scoped lang="scss">
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
  justify-content: center;
}
</style>
