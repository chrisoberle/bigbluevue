<template>
  <b-container fluid>
    <div class="hero">
      <div>
        <h1 class="display-3">{{ title }}</h1>
        <p class="lead">{{ msg }}</p>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      title: 'Big Blue Vue',
      msg: 'Full Stack Coding Challenge with Vue.js'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hero {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .hero .lead {
    font-weight: 200;
    font-size: 1.5rem;
  }
</style>
