<template>
  <div id="display">
      <div id="displayText">
        <div id = "leftOf">{{displayValue}}</div>
        <div id = "blinker"> <CalcBlinker /> </div>
      </div>
      <div id="subText"><p>{{subDisplayValue}}</p></div>
  </div>
</template>

<script setup>
import CalcBlinker from "./CalcBlinker.vue";
import Velocity from "velocity-animate";
import { onMounted } from 'vue';

defineProps({
  displayValue: String,
  subDisplayValue: String
});

const onLoady = () => {
  Velocity(document.getElementById("blinker"), {opacity: 0}, {loop: true});
};

onMounted(() => {
  onLoady();
});




// export default {
//   name: 'CalcDisplay',
//   props: {
//       displayValue: String,
//       subDisplayValue: String
//   },
//   components:{
//     CalcBlinker
//   },
//   mounted:function(){
//     this.onLoady()
//   },
//   methods: {
//     onLoady: function() {
//       Velocity(document.getElementById("blinker"), {opacity: 0}, {loop: true});
//     }
//   }
  
//}
</script>

<style >
  @import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
  #display {
    width: 100%;
    border-radius: 5px;
    height: 120px;
    float: right;
  }
  #leftOf{
    width: 99.75%;
  }
  #blinker{
    width: 1.00%;
  }
  #displayText,  #subText{
      font-family: 'Lato', sans-serif;
      text-align: right;
      margin-bottom: 0px;
      overflow:hidden;
      text-overflow: ellipsis;
  }
  #displayText{
      display: flex;
      flex-direction: row;
      height: 50px;
      font-size: 3em;
  }
  #subText{
      height: 50px;
      font-size: 1.5em;
      color: #38908f;
      border: none;
      background-color: #f9f9f9;
  }
</style>
