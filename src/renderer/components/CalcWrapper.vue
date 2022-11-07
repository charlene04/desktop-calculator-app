<template>
  <div id="calcWrapper">
      <CalcDisplay :display-value="dispValue" :sub-display-value="subDispValue"></CalcDisplay>
      <CalcButton
        v-for="b in buttons" 
        :key="b.id" 
        :b-values="b"
        @handle-press="handlePress" 
        :style="b.id === 1 ? bStyleObjectLarge:  bStyleObjectRegular">
      </CalcButton>
  </div>
</template>


<script setup>
import CalcDisplay from './CalcDisplay.vue'
import CalcButton from './CalcButton.vue'
import { ref } from 'vue';
//import { Animation } from '@/renderer/composables/Animation';

window.addEventListener('keyup', handleKeyPress, true);

const dispValue = ref('0');
const subDispValue = ref('');
const prevValue = ref('0');
const prevOp = ref('=');
const opInEffect = ref(false);
const bStyleObjectRegular = {width: '25%'};
const  bStyleObjectLarge = { width: '49.9%'};
const buttons = ref(
    [
        {
            id: 1,
            name: "AC",
            isReg: true,
            isOp: false
        },
        {
            id: 2,
            name: "C",
            isReg: true,
            isOp: false
        },
        {
            id: 3,
            name: "/",
            isReg: false,
            isOp: true
        },
        {
            id: 4,
            name: "7",
            isReg: true,
            isOp: false
        },
        {
            id: 5,
            name: "8",
            isReg: true,
            isOp: false
        },
        {
            id: 6,
            name: "9",
            isReg: true,
            isOp: false
        },
        {
            id: 7,
            name: "x",
            isReg: false,
            isOp: true
        },
        {
            id: 8,
            name: "4",
            isReg: true,
            isOp: false
        },
        {
            id: 9,
            name: "5",
            isReg: true,
            isOp: false
        },
        {
            id: 10,
            name: "6",
            isReg: true,
            isOp: false
        },
        {
            id: 11,
            name: "+",
            isReg: false,
            isOp: true
        },
        {
            id: 12,
            name: "1",
            isReg: true,
            isOp: false
        },
        {
            id: 13,
            name: "2",
            isReg: true,
            isOp: false
        },
        {
            id: 14,
            name: "3",
            isReg: true,
            isOp: false
        },
        {
            id: 15,
            name: "-",
            isReg: false,
            isOp: true
        },
        {
            id: 16,
            name: "0",
            isReg: true,
            isOp: false
        },
        {
            id: 17,
            name: ".",
            isReg: true,
            isOp: false
        },
        {
            id: 18,
            name: "\u00b1",
            isReg: true,
            isOp: false
        },
        {
            id: 19,
            name: "=",
            isReg: false,
            isOp: true
        }
]);
function handleKeyPress(event) {
    let keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '/', '-', '=', '.', '*', 'Enter', 'Backspace']
    if (keys.includes(event.key)) {
        //Animation(event.target);
        handlePress(event);
    }
}

function handlePress(event) {
    var number = event.key ? event.key : event.textContent.trim();
    switch (number){
        case "AC": clearAll();
            break;
        case "C": clearDisplay();
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9": numberPressed(number);
        break; 
        case "+": computeOp("+");
            break;
        case "-": computeOp("-");
            break;
        case "/": computeOp("/");
            break;
        case "x": computeOp("x");
            break;
        case "*": computeOp("x");
            break;
        case "=": equalPressed();
            break;
        case "Enter": equalPressed();
            break;
        case ".": addPoint();
            break;
        case "\u00b1": negateValue();
            break;
        case "Backspace":
            dispValue.value = dispValue.value.substring(0, dispValue.value.length-1);
            break;
        default:
            alert("KEY ERROR: in default");
    }
}

function negateValue() {
    if (dispValue.value != "0"){
        if (dispValue.value.indexOf("-") < 0){
        dispValue.value = "-" + dispValue.value;
        }
        else{
            dispValue.value = dispValue.value.substring(1);
        }
    }
    
}

function addPoint() {
    if (dispValue.value.indexOf(".") < 0){
        dispValue.value += "."
    }
}

function equalPressed() {
    try{
        computeEqual(prevValue.value, dispValue.value, prevOp.value);
        subDispValue.value = "";
    }
    catch (e){
        alert(e);
    }
}

function numberPressed(number) {
    opInEffect.value = false;
    if (dispValue.value === "0"){
        dispValue.value = number;
    }
    else {
        if (dispValue.value.length >= 15){
            alert("KEY ERROR: Display limit reached");
        }
        else{
            dispValue.value += number;
        }
        
    }
    
}

function computeOp(op) {
    if (!opInEffect.value){
        try{
            computeEqual(prevValue.value, dispValue.value, prevOp.value);
            prevValue.value = dispValue.value;
            dispValue.value = "0";
            prevOp.value = op;
            subDispValue.value = prevValue.value.toString() + " " + prevOp.value + "    ";
            opInEffect.value = true;
        }
        catch (e){
            alert(e);
        }
        
    }
    
}
function computeEqual(op1, op2, op) {
    let op1_num = parseFloat(op1);
    let op2_num = parseFloat(op2);
    let result = 0;
    if (op === "+"){
        result = op1_num + op2_num;
    }
    else if (op === "-"){
        result = op1_num - op2_num;
    }
    else if (op === "x"){
        result = op1_num * op2_num;
    }
    else if (op === "/"){
        if (op2_num == 0){
            throw "MATH ERROR: Cannot divide by 0";
        }
        else{
            result = op1_num / op2_num;
        }
        
    }
    else{
        result = op2_num;
    }
    let temp = result.toString();
    if (temp.length >= 15){
        throw "DISPLAY ERROR: Computation result will not fit on display. Use C or AC to perform a simpler computation.";
    }
    dispValue.value = temp;
    prevValue.value = "0";
    prevOp.value = "=";

}
function clearDisplay() {
    dispValue.value = "0";
}
function clearAll() {
    clearDisplay();
    prevValue.value = "0";
    prevOp.value = "=";
    subDispValue.value ="";
    opInEffect.value = false;
}



// STALE IMPLEMENTATION WITH OPTIONS API

// export default {
//     name: 'CalcWrapper',
//     components:{
//         CalcDisplay,
//         CalcButton
//     },
//     data() {
//         return {
//             dispValue: "0",
//             subDispValue: "",
//             prevValue: "0",
//             prevOp: "=",
//             opInEffect: false,
//             bStyleObjectRegular:{
//                 width: '25%'
//             },
//             bStyleObjectLarge:{
//                 width: '49.9%',
//             },
//             buttons:[
//                 {
//                     id: 1,
//                     name: "AC",
//                     isReg: true,
//                     isOp: false
//                 },
//                 {
//                     id: 2,
//                     name: "C",
//                     isReg: true,
//                     isOp: false
//                 },
//                 {
//                     id: 3,
//                     name: "/",
//                     isReg: false,
//                     isOp: true
//                 },
//                 {
//                     id: 4,
//                     name: "7",
//                     isReg: true,
//                     isOp: false
//                 },
//                 {
//                     id: 5,
//                     name: "8",
//                     isReg: true,
//                     isOp: false
//                 },
//                 {
//                     id: 6,
//                     name: "9",
//                     isReg: true,
//                     isOp: false
//                 },
//                 {
//                     id: 7,
//                     name: "x",
//                     isReg: false,
//                     isOp: true
//                 },
//                 {
//                     id: 8,
//                     name: "4",
//                     isReg: true,
//                     isOp: false
//                 },
//                 {
//                     id: 9,
//                     name: "5",
//                     isReg: true,
//                     isOp: false
//                 },
//                 {
//                     id: 10,
//                     name: "6",
//                     isReg: true,
//                     isOp: false
//                 },
//                 {
//                     id: 11,
//                     name: "+",
//                     isReg: false,
//                     isOp: true
//                 },
//                 {
//                     id: 12,
//                     name: "1",
//                     isReg: true,
//                     isOp: false
//                 },
//                 {
//                     id: 13,
//                     name: "2",
//                     isReg: true,
//                     isOp: false
//                 },
//                 {
//                     id: 14,
//                     name: "3",
//                     isReg: true,
//                     isOp: false
//                 },
//                 {
//                     id: 15,
//                     name: "-",
//                     isReg: false,
//                     isOp: true
//                 },
//                 {
//                     id: 16,
//                     name: "0",
//                     isReg: true,
//                     isOp: false
//                 },
//                 {
//                     id: 17,
//                     name: ".",
//                     isReg: true,
//                     isOp: false
//                 },
//                 {
//                     id: 18,
//                     name: "\u00b1",
//                     isReg: true,
//                     isOp: false
//                 },
//                 {
//                     id: 19,
//                     name: "=",
//                     isReg: false,
//                     isOp: true
//                 }
//             ]
//         }
//     },

//     created() {
//         window.addEventListener('keyup', this.handleKeyPress, true);
//     },

//     methods: {
//         handleKeyPress: function(event) {
//             let keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '/', '-', '=', '.', '*', 'Enter', 'Backspace']
//             if (keys.includes(event.key)) {
//                 this.handlePress(event);
//             }
//         },

//         handlePress: function (event){
//             var number = event.key ? event.key : event.textContent.trim();
//             switch (number){
//                 case "AC": this.clearAll();
//                     break;
//                 case "C": this.clearDisplay();
//                     break;
//                 case "0":
//                 case "1":
//                 case "2":
//                 case "3":
//                 case "4":
//                 case "5":
//                 case "6":
//                 case "7":
//                 case "8":
//                 case "9": this.numberPressed(number);
//                 break; 
//                 case "+": this.computeOp("+");
//                     break;
//                 case "-": this.computeOp("-");
//                     break;
//                 case "/": this.computeOp("/");
//                     break;
//                 case "x": this.computeOp("x");
//                     break;
//                 case "*": this.computeOp("x");
//                     break;
//                 case "=": this.equalPressed();
//                     break;
//                 case "Enter": this.equalPressed();
//                     break;
//                 case ".": this.addPoint();
//                     break;
//                 case "\u00b1": this.negateValue();
//                     break;
//                 case "Backspace":
//                     this.dispValue = this.dispValue.substring(0, this.dispValue.length-1);
//                     break;
//                 default:
//                     alert("KEY ERROR: in default");
//             }
//         },
//         negateValue: function(){
//             if (this.dispValue != "0"){
//                 if (this.dispValue.indexOf("-") < 0){
//                 this.dispValue = "-" + this.dispValue;
//                 }
//                 else{
//                     this.dispValue = this.dispValue.substring(1);
//                 }
//             }
            
//         },
//         addPoint: function() {
//             if (this.dispValue.indexOf(".") < 0){
//                 this.dispValue += "."
//             }
//         },
//         equalPressed: function(){
//             try{
//                 this.computeEqual(this.prevValue, this.dispValue, this.prevOp);
//                 this.subDispValue = "";
//             }
//             catch (e){
//                 alert(e);
//             }
//         },
//         numberPressed: function(number){
//             this.opInEffect = false;
//             if (this.dispValue === "0"){
//                 this.dispValue = number;
//             }
//             else {
//                 if (this.dispValue.length >= 15){
//                     alert("KEY ERROR: Display limit reached");
//                 }
//                 else{
//                     this.dispValue += number;
//                 }
                
//             }
            
//         },
//         computePlus: function (){
//             this.dispValue = this.computeOps(this.prevValue, this.dispValue, "+")
//         },
//         computeSub: function (){
//             this.dispValue = this.computeOps(this.prevValue, this.dispValue, "-")
//         },
//         computeDiv: function (){
//             this.dispValue = this.computeOps(this.prevValue, this.dispValue, "/")
//         },
//         computeMult: function (){
//             this.dispValue = this.computeOps(this.prevValue, this.dispValue, "x")
//         },
//         computeOp: function (op){
//             if (!this.opInEffect){
//                 try{
//                     this.computeEqual(this.prevValue, this.dispValue, this.prevOp);
//                     this.prevValue = this.dispValue;
//                     this.dispValue = "0";
//                     this.prevOp = op;
//                     this.subDispValue = this.prevValue.toString() + " " + this.prevOp + "    ";
//                     this.opInEffect = true;
//                 }
//                 catch (e){
//                     alert(e);
//                 }
                
//             }
            
//         },
//         computeEqual: function(op1, op2, op){
//             let op1_num = parseFloat(op1);
//             let op2_num = parseFloat(op2);
//             let result = 0;
//             if (op === "+"){
//                 result = op1_num + op2_num;
//             }
//             else if (op === "-"){
//                 result = op1_num - op2_num;
//             }
//             else if (op === "x"){
//                 result = op1_num * op2_num;
//             }
//             else if (op === "/"){
//                 if (op2_num == 0){
//                     throw "MATH ERROR: Cannot divide by 0";
//                 }
//                 else{
//                     result = op1_num / op2_num;
//                 }
                
//             }
//             else{
//                 result = op2_num;
//             }
//             let temp = result.toString();
//             if (temp.length >= 15){
//                 throw "DISPLAY ERROR: Computation result will not fit on display. Use C or AC to perform a simpler computation.";
//             }
//             this.dispValue = temp;
//             this.prevValue = "0";
//             this.prevOp = "=";

//         },
//         clearDisplay: function (){
//             this.dispValue = "0";
//         },
//         clearAll: function (){
//             this.clearDisplay();
//             this.prevValue = "0";
//             this.prevOp = "=";
//             this.subDispValue ="";
//             this.opInEffect = false;
//         }
//     }
//}
</script>

<style>
    #calcWrapper {
        width: 100%;
        box-sizing: border-box;
        border: 15px solid black;
        height: 100%;
        overflow: hidden;
        box-shadow: 5px 5px 5px #4b4b4c;
    }
</style>
