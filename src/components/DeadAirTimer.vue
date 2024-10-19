<template>
  <div>
    <InputField @callStopDeadair="stopDeadAir" label="Call Reason:" />
    <InputField @callStopDeadair="stopDeadAir" label="Call Action:"/>
    <InputField @callStopDeadair="stopDeadAir" label="Call Resolution:"/>
    <p>
        <input class ="dark" type="text" id="search" name="search">
        <button class ="dark" type="button" onclick="openResearchLinks()">Search Central Point</button>
    </p>
    <p>
        <button class ="dark" type="button" onclick="genSummary()">Generate Summary</button>
        <button class ="dark" type="button" onclick="copyRAR()">Copy Notes</button>  
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, toRefs } from 'vue';
import InputField from './InputField.vue';
import beepFx from '../assets/beep.mp3';

export default defineComponent({
  components: { InputField },
  setup() {
    const deadLine = ref(0);
    const nextAlertTime = ref(0);
    const timesAlterted = ref(0);
    const isRecording = ref<boolean>(false);
    const intervalId = ref<number | null>(null);
    const audio = new Audio(beepFx);
    const recognition = ref<SpeechRecognition | null>(null); // Use null as the initial value
    const startRepeatingFunction = () => {
        intervalId.value = setInterval(() => {
        var time = Math.floor(Date.now() / 1000);
        if(time >= deadLine.value)
        {
          if(time >= nextAlertTime.value)
          {

            nextAlertTime.value = time + 2;
            console.log("dead air reminder!");
            audio.play();
            timesAlterted.value += 1;
            if(timesAlterted.value >= 2)
            {
              deadLine.value = time += 10;
              nextAlertTime.value = deadLine.value += 2;
              timesAlterted.value = 0;
            }
          }
        }
        console.log('Repeating function executed!'); 
      }, 750); // Repeat every 1000 milliseconds (1 second)
    };
    const stopRepeatingFunction = () => {
      if (intervalId.value) {
        clearInterval(intervalId.value);
        intervalId.value = null;
      }
    };
    onUnmounted(()=>
    {
      stopRepeatingFunction();
    });
    onMounted(() => {
      if (recognition.value !== null) return; // Check if recognition is already initialized
      if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        console.error('Speech recognition not supported in this browser.');
        return;
      }
      deadLine.value = Math.floor(Date.now()/ 1000) + 10;
      startRepeatingFunction();
      recognition.value = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
      recognition.value.continuous = true;
      recognition.value.interimResults = true;

      recognition.value.onresult = (event: SpeechRecognitionEvent) => {
        // Handle the speech recognition results here
        deadLine.value = Math.floor(Date.now() / 1000) + 10;
      };

      recognition.value.start();
    });

    // Return refs so they can be used in methods
    return {
      ...toRefs({ isRecording, recognition }), // Spread the refs
      stopDeadAir,
      startDeadAir,
      startRepeatingFunction,
      stopRepeatingFunction
    };

    function stopDeadAir() {
      if (recognition.value === null) return;
      recognition.value.stop(); // Use recognition.value to access the SpeechRecognition instance
    }

    function startDeadAir() {
      if (recognition.value === null) return;
      recognition.value.start();
    }
  },
});
</script>

<style>
.dark 
{
  color:whitesmoke;
  background-color: #3d3d3d;
}
</style>
