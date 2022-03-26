<template>
  <section>
    <!-- ========== -->
    <!-- Taylor Hawkins -->
    <!-- Red Light Fever -->
    <!-- 8-Track Player -->
    <!-- RIP -->
    <!-- ========== -->
    
    <!-- Background -->
    <div id="background"></div>

    <!-- Player -->
    <div id="player">
      <!-- Tip -->
      <div id="tip"></div>

      <!-- Tape -->
      <div id="tape"></div>

      <!-- Insert -->
      <div id="insert">
        <!-- Slot -->
        <div id="slot"></div>
      </div>

      <!-- Programs -->
      <div id="programs">
        <div class="program" v-for="(track, i) in tracks" :key="track.slug" :class="['program', { active: currentProgram == i }]"></div>
      </div>

      <!-- Program Button -->
      <button id="program" :disabled="!power" @click="nextProgram"></button>

      <!-- Volume Slider -->
      <div id="volume">
        <Slider v-model.number="volume"></Slider>
      </div>

      <!-- Balance Slider -->
      <div id="balance">
        <Slider :min="-1" :max="1" v-model.number="balance"></Slider>
      </div>

      <!-- Pause Button -->
      <button id="pause" :disabled="!power"></button>

      <!-- Power Button -->
      <button id="power" :disabled="!power" @click="powerOff"></button>

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
import Slider from '~/components/Slider'

export default {
  components: { Slider },
  data() {
    return {
      balance: 0,
      currentProgram: null,
      power: false,
      volume: 1
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

    },
    powerOff() {
      // Alert
      alert("Now why would you to do that?")

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
section{
  
}

#background{
  @apply absolute bg-black bg-contain bg-top bg-no-repeat filter grayscale h-full left-0 top-0 w-full;
  background-image: url(/images/background.jpg);
}

#player{
  @apply absolute bg-green-200 left-1/2 relative transform -translate-x-1/2 -translate-y-1/2 top-1/2;
  background: url(/images/player.jpg);
  border-radius: 8px;
  height: 249px;
  width: 849px;
}

#tip{
  @apply absolute;
  background: url(/images/tip.png);
  height: 35px;
  left: 200px;
  top: -77px;
  width: 175px;
}

#tape{
  @apply absolute cursor-pointer;
  background: url(/images/tape.png);
  height: 36px;
  left: 200px;
  top: -36px;
  width: 175px;
}

#insert{
  @apply absolute flex items-center justify-center;
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

#insert #slot{
  height: 36px;
  width: 175px;
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

#volume{
  @apply absolute;
  left: 294px;
  top: 55px;
}

#balance{
  @apply absolute;
  left: 360px;
  top: 55px;
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