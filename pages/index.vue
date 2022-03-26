<template>
  <section :class="{ 'off': !power }">
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
      <!-- <div id="tip"></div> -->

      <!-- Tape -->
      <div id="tape"></div>

      <!-- Insert -->
      <div id="insert" :class="{ inserted:  power }"></div>

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
      <button id="pause" :disabled="!power" @click="pauseProgram"></button>

      <!-- Power Button -->
      <button id="power" :disabled="!power" @click="powerOff"></button>

      <!-- Stereo -->
      <div id="stereo" :class="{ on: power }"></div>

      <!-- Panel -->
      <div id="panel">
        <!-- Waveform -->
        <img id="waveform" :src="`/images/waveforms/${track.slug}.png`" v-if="track" />
      </div>

      <!-- Purchase Button -->
      <button id="purchase" @click="openLink('https://music.apple.com/us/album/red-light-fever/360320348')"></button>
    </div>
  </section>
</template>

<script>
import gsap from 'gsap'
import { Howl, Howler } from 'howler'
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
  computed: {
    track() {
      // Current track
      return this.tracks[this.currentProgram]

    }
  },
  watch: {
    balance(balance) {
      // Adjust howler balance
      Howler.stereo(balance)

    },
    power(power) {
      // If power off
      if (!power) {
        // Stop all sounds
        Howler.stop()

        // Set program to null
        this.currentProgram = null
 
      }
    },
    track(newTrack, oldTrack) {
      // If old track exists
      if (oldTrack) {
        // Stop it
        oldTrack.sound.stop()

      }

      // If new track exists
      if (newTrack) {
        // Play it
        newTrack.sound.play()

      }
      
    },
    volume(volume) {
      // Adjust howler volume
      Howler.volume(volume)

    }
  },
  methods: {
    initializeHowler() {
      // Loop through tracks
      this.tracks.forEach(track => {
        // Create Howler sound object
        track.sound = new Howl({
          src: [`https://leemartin-dev.s3.amazonaws.com/clients/taylorhawkins/${track.slug}.mp3`],
          onended: () => {
            // Get next program
            this.nextProgram()

          }
        })

      })
    },
    initializeHammer() {
      // Get tape
      let tape = document.getElementById('tape')

      // Get insert
      let insert = document.getElementById('insert')

      // Set rest positions
      let restX = 200
      let restY = -36

      // Start positions
      var startX, startY

      // Initialize hammer
      let hammer = new Hammer(tape)

      // Allow pan in all directions
      hammer.get('pan').set({
        direction: Hammer.DIRECTION_ALL
      })

      // Pan start
      hammer.on('panstart', e => {
        // Log
        console.log('panstart', e)
        
        // Update start positions
        startX = gsap.getProperty(tape, "x")
        startY = gsap.getProperty(tape, "y")

      })

      // Pan
      hammer.on('pan', e => {
        // Log
        console.log('pan', e)

        // Set to new position
        gsap.set(tape, {
          x: startX + e.deltaX,
          y: startY + e.deltaY
        })

      })

      // Pan end
      hammer.on('panend', e => {
        // Log
        console.log('panend', e)
        
        // Check to see if tape and drop are overlapping
        let overlap = this.elementsOverlap(tape, insert)
        
        // // If overlap
        if (overlap) {
          // Animate into drop area
          gsap.to(tape, {
            x: gsap.getProperty(insert, "left") + 7,
            y: gsap.getProperty(insert, "top") + 7
          })

          // Turn on
          this.power = true

          // Set to first program
          this.currentProgram = 0

          // Disable hammer
          // hammer.set({
          //   enable: false
          // })
          
        } else {
          // Animate back to start position
          gsap.to(tape, {            
            x: restX,
            y: restY
          })

          // Turn off
          this.power = false
          
        }
        
      })

    },
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
    pauseProgram() {
      // If track is playing
      if (this.track.sound.playing()) {
        // Pause it
        this.track.sound.pause()

      } else {
        // Play it
        this.track.sound.play()

      }
    },
    openLink(url) {
      // Open url in new window
      window.open(url)

    },
    powerOff() {
      // Alert
      alert("Now why would you to do that?")

    },
    elementsOverlap(el1, el2) {
      // Get rect of first element
      const domRect1 = el1.getBoundingClientRect()

      // Get rect of second element
      const domRect2 = el2.getBoundingClientRect()

      // Do they overlay?
      return !(
        domRect1.top > domRect2.bottom ||
        domRect1.right < domRect2.left ||
        domRect1.bottom < domRect2.top ||
        domRect1.left > domRect2.right
      )
    }
  },
  mounted() {
    // Initialize Howler
    this.initializeHowler()

    // Initialize Hammer
    this.initializeHammer()

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
  @apply transition-all duration-1000;
}

section.off{
  @apply filter grayscale;
}

#background{
  @apply absolute bg-black bg-contain bg-top bg-no-repeat h-full left-0 top-0 w-full;
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
  transform: translate(200px, -77px);
  width: 175px;
}

#tape{
  @apply absolute cursor-pointer z-20;
  background: url(/images/tape.png);
  height: 36px;
  transform: translate(200px, -36px);
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

#stereo.on{
  background-position: 100% 0;
}

#panel{
  @apply absolute;
  /* background: linear-gradient(#025B25, #19792F, #025B25); */
  height: 69px;
  left: 453px;
  top: 91px;
  width: 244px;
}

#panel img#waveform{
  @apply block h-full w-full;
}

button#purchase{
  @apply absolute rounded-full;
  height: 56px;
  left: 746px;
  top: 86px;
  width: 56px;
}
</style>