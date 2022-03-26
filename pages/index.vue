<template>
  <section>
    <!-- 8-Track Player -->
    <div id="player">
      <!-- Insert Slot -->
      <div id="insert"></div>

      <!-- Programs -->
      <div id="programs">
        <div class="program" v-for="(track, i) in tracks" :key="track.slug" :class="['program', { active: currentProgram == i }]"></div>
      </div>

      <!-- Program Button -->
      <button id="program" @click="nextProgram"></button>

      <!-- Pause Button -->
      <button id="pause"></button>

      <!-- Power Button -->
      <button id="power"></button>

      <!-- Stereo -->
      <div id="stereo"></div>

      <!-- Panel -->
      <div id="panel"></div>

      <!-- Purchase Button -->
      <button id="purchase" @click="openLink('https://music.apple.com/us/album/red-light-fever/360320348')"></button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentProgram: 0
    }
  },
  methods: {
    nextProgram() {
      // If we haven't arrived at last program
      if (this.currentProgram + 1 < this.tracks.length) {
        // Increment program
        this.currentProgram += 1

      } else {
        // Back to first program
        this.currentProgram = 0

      }
    },
    openLink(url) {
      // Open url in new window
      window.open(url)

    }
  },
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

#insert{
  @apply absolute;
  background: red;
  background: url(/images/slot.jpg);
  height: 50px;
  left: 75px;
  top: 108px;
  width: 189px;
}

#insert.overlap{
  background-position: 100% 0%;
}

#insert.inserted{
  background-position: -100% 0%;
}

#programs{
  @apply absolute flex justify-between;
  height: 20px;
  left: 75px;
  top: 66px;
  width: 131px;
}

#programs .program{
  @apply rounded-full;
  background: red;
  background: url(/images/programs.png);
  height: 20px;
  width: 20px;
}

#programs .program:nth-child(1){
  background-position: 0 0;
}

#programs .program:nth-child(2){
  background-position: -20px 0;
}

#programs .program:nth-child(3){
  background-position: -40px 0;
}

#programs .program:nth-child(3){
  background-position: -60px 0;
}

#programs .program:nth-child(1).active{
  background-position: -80px;
}

#programs .program:nth-child(2).active{
  background-position: -100px;
}

#programs .program:nth-child(3).active{
  background-position: -120px;
}

#programs .program:nth-child(4).active{
  background-position: -140px;
}

button#program{
  @apply absolute;
  height: 25px;
  left: 229px;
  top: 63px;
  width: 35px;
}

button#pause{
  @apply absolute;
  height: 25px;
  left: 294px;
  top: 169px;
  width: 35px;
}

button#power{
  @apply absolute;
  height: 25px;
  left: 360px;
  top: 169px;
  width: 35px;
}

#stereo{
  @apply absolute rounded-full;
  background: url(/images/stereo.png);
  height: 13px;
  left: 568px;
  top: 44px;
  width: 13px;
}

#panel{
  @apply absolute;
  background: #025B25;
  height: 69px;
  left: 453px;
  top: 91px;
  width: 244px;
}

button#purchase{
  @apply absolute rounded-full;
  height: 56px;
  left: 746px;
  top: 86px;
  width: 56px;
}
</style>