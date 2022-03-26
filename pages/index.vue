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
</style>