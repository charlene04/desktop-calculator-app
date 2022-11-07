<template>
  <div id="vuebutton">
      <button class="calc-button" 
        @click="buttonPressed($event)"
        :class="{'opButton': bValues.isOp, 'regButton': bValues.isReg}"
      >
        {{ bValues.name }}
      </button>
  </div>
</template>

<script setup>
import { Animation } from '@/renderer/composables/Animation';
defineProps({
  bValues: Object
});

const emits = defineEmits(['handle-press'])

const buttonPressed = (event) => {
  emits('handle-press', event.target);
  let bt = event.target;
  Animation(bt);
}
// export default {
//   name: 'CalcButton',
//   props: {
//       bValues: Object
//   },
//   methods:{
//     buttonPressed: function(event){
//       this.$emit('handle-press', event.target);
//       let bt = event.target;
//       Velocity(bt, {"font-size": "40px", opacity: 0.7},
//         {duration: 100, 
//         easing: "bounceIn",
//         complete: function(){
//           Velocity(bt, {"font-size": "30px", opacity: 1},
//             {duration: 100, easing: "bounceOut"});
//           }}
//       );
//     }
//   }
// }
</script>

<style>
#vuebutton {
  margin: 0px;
  height: 90px;
  box-sizing: border-box;
  float: left;
}
.calc-button{
    width: 100%;
    height: 100%;
    font-family: Lato, Verdana, sans-serif;
    text-align: center;
    font-size: 30px;
    color: white;
}
.opButton{
    background-color: #38908f;
}
.regButton{
    background-color: #676767;
}
</style>
