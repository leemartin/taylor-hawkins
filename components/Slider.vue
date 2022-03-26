<template>
  <div class="slider">
    <input type="range" :min="min" :max="max" :value="value" step="0.1" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="postcss" scoped>
.slider{
  height: 101px;
  width: 35px;
}

/* Base */
input[type=range]{
  -webkit-appearance: none;
  background: transparent;
  border-radius: 0;
  height: 35px;
  transform-origin: top left;
  transform: rotateZ(90deg) translateY(-35px);
  width: 101px;
}

input[type=range]::-webkit-slider-thumb{
  -webkit-appearance: none;
}

input[type=range]:focus{
  outline: none;
}

input[type=range]::-ms-track{
  background: transparent;
  border-color: transparent;
  color: transparent;
  cursor: pointer;
  width: 101px;
}

/* Thumb */
input[type=range]::-webkit-slider-thumb{
  -webkit-appearance: none;
  background: url(/images/handle.jpg);
  border: none;
  border-radius: 0;
  box-shadow: none;
  cursor: pointer;
  height: 35px;
  width: 25px;
}

input[type=range]::-moz-range-thumb{
  background: url(/images/handle.jpg);
  border: none;
  border-radius: 0;
  box-shadow: none;
  cursor: pointer;
  height: 35px;
  width: 25px;
}

input[type=range]::-ms-thumb{
  background: url(/images/handle.jpg);
  border: none;
  border-radius: 0;
  box-shadow: none;
  cursor: pointer;
  height: 35px;
  width: 25px;
}

/* Track */
input[type=range]::-webkit-slider-runnable-track{
  background: transparent;
  border-radius: 0;
  border: none;
  box-shadow: none;
  cursor: pointer;
  height: 35px;
  width: 100%;
}

input[type=range]::-moz-range-track{
  background: transparent;
  border-radius: 0;
  border: none;
  box-shadow: none;
  cursor: pointer;
  height: 35px;
  width: 100%;
}

input[type=range]::-ms-track{
  background: transparent;
  border-radius: 0;
  border: none;
  box-shadow: none;
  cursor: pointer;
  height: 35px;
  width: 100%;
}

input[type=range]::-ms-fill-lower{
  background: transparent;
  border-radius: 0;
  border: none;
  box-shadow: none;
}

input[type=range]::-ms-fill-upper{
  background: transparent;
  border-radius: 0;
  border: none;
  box-shadow: none;
}

input[type=range]:focus::-ms-fill-upper{
  background: transparent;
  border-radius: 0;
  border: none;
  box-shadow: none;
}
</style>