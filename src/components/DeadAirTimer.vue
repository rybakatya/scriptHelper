<template>
  <div>
    <InputField @callStopDeadair="stopDeadAir" label="Tests" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs } from 'vue';
import InputField from './InputField.vue';

export default defineComponent({
  components: { InputField },
  setup() {
    const isRecording = ref<boolean>(false);
    const recognition = ref<SpeechRecognition | null>(null); // Use null as the initial value

    onMounted(() => {
      if (recognition.value !== null) return; // Check if recognition is already initialized
      if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        console.error('Speech recognition not supported in this browser.');
        return;
      }

      recognition.value = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
      recognition.value.continuous = true;
      recognition.value.interimResults = true;

      recognition.value.onresult = (event: SpeechRecognitionEvent) => {
        // Handle the speech recognition results here
      };

      recognition.value.start();
    });

    // Return refs so they can be used in methods
    return {
      ...toRefs({ isRecording, recognition }), // Spread the refs
      stopDeadAir,
      startDeadAir,
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
