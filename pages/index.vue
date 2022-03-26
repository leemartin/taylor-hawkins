<template>
  <section>
    <h1>Taylor Hawkins</h1>

    <div>{{ tracks }}</div>
  </section>
</template>

<script>
export default {
  async asyncData({ $content }) {
    let tracks = await $content('tracks').fetch().catch(err => {
      console.log(err)
    })

    return {
      tracks
    }
  }
}
</script>