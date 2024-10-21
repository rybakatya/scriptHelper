<template>
  <div>
    <InputField @callStopDeadair="stopDeadAir" label="Call Reason:" v-model="callReason" />
    <InputField @callStopDeadair="stopDeadAir" label="Call Action:" />
    <InputField @callStopDeadair="stopDeadAir" label="Call Resolution:" v-model="callResolution" />

    <p>
      <input class="dark" type="text" id="search" name="search" />
      <button class="dark" type="button" @click="openResearchLinks">Search Central Point</button>
    </p>

    <p>
      <button class="dark" type="button" @click="genSummary">Generate Summary</button>
      <button class="dark" type="button" @click="copyRAR">Copy Notes</button>
    </p>

    <!-- Summary Paragraph -->
    <p v-if="showSummary" ref="summaryRef" class="importantText">
      Just to summarize what we did today, you called because you {{ callReason }} and what we did was {{ callResolution }}. 
      In the future, you can visit our self-service portal at {{ stateMainSite }}. There you can print new ID cards 
      in case they're lost, search for providers or specialists covered by your plan, or review claims and authorization statuses.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, nextTick } from 'vue';
import InputField from './InputField.vue';
import beepFx from '../assets/beep.mp3';

export default defineComponent({
  components: { InputField },

  setup() {
    const callReason = ref('');
    const callResolution = ref('');
    const stateMainSite = ref('');
    const showSummary = ref(false);
    const summaryRef = ref<HTMLElement | null>(null);

    const genSummary = () => {
      showSummary.value = true;
      nextTick(() => {
        summaryRef.value?.scrollIntoView({ behavior: 'smooth' });
      });
    };

    const deadLine = ref(0);
    const nextAlertTime = ref(0);
    const timesAlterted = ref(0);
    const intervalId = ref<number | null>(null);
    const audio = new Audio(beepFx);
    const recognition = ref<SpeechRecognition | null>(null);

    const startRepeatingFunction = () => {
      intervalId.value = setInterval(() => {
        const time = Math.floor(Date.now() / 1000);
        if (time >= deadLine.value && time >= nextAlertTime.value) {
          nextAlertTime.value = time + 2;
          console.log('dead air reminder!');
          audio.play();
          timesAlterted.value += 1;

          if (timesAlterted.value >= 2) {
            deadLine.value = time + 10;
            nextAlertTime.value = deadLine.value + 2;
            timesAlterted.value = 0;
          }
        }
        console.log('Repeating function executed!');
      }, 750);
    };

    const stopRepeatingFunction = () => {
      if (intervalId.value) {
        clearInterval(intervalId.value);
        intervalId.value = null;
      }
    };

    onMounted(() => {
      if (recognition.value !== null) return;
      if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        console.error('Speech recognition not supported in this browser.');
        return;
      }
      deadLine.value = Math.floor(Date.now() / 1000) + 10;
      startRepeatingFunction();

      recognition.value = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
      recognition.value.continuous = true;
      recognition.value.interimResults = true;

      recognition.value.onresult = () => {
        deadLine.value = Math.floor(Date.now() / 1000) + 10;
      };

      recognition.value.start();
    });

    onUnmounted(() => {
      stopRepeatingFunction();
    });

    const stopDeadAir = () => {
      if (recognition.value) recognition.value.stop();
    };

    const startDeadAir = () => {
      if (recognition.value) recognition.value.start();
    };

    return {
      callReason,
      callResolution,
      stateMainSite,
      showSummary,
      summaryRef,
      genSummary,
      stopDeadAir,
      startDeadAir,
    };
  },
});
</script>

<style>
.dark {
  color: whitesmoke;
  background-color: #3d3d3d;
}

</style>
