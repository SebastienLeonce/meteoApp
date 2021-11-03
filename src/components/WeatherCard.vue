<template>
  <ui-card class="card">
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
</template>

<script>
export default {
  name: 'WeatherCard',
  props: {
    weather: Object
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
}
</style>
