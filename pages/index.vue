<template>
  <section>
    <div id="player">
      <div id="slot"></div>
    </div>
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

<style lang="postcss" scoped>
#player{
  @apply bg-green-200 relative;
  background: url(/images/player.jpg);
  border-radius: 8px;
  height: 249px;
  width: 849px;
}

#slot{
  @apply absolute;
  background: red;
  background: url(/images/slot.jpg);
  height: 50px;
  left: 75px;
  top: 108px;
  width: 189px;
}

#slot.overlap{
  background-position: 100% 0%;
}

#slot.inserted{
  background-position: -100% 0%;
}
</style>