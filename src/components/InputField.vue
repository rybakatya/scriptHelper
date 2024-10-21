<template>
  <div>
    <label v-if="label" class="input-label">{{ label }}</label>
    <div
      contenteditable="true"
      class="transcript-input"
      ref="transcriptInput"
      @input="handleInput"
      @paste.prevent="handlePaste"
    ></div>
    <div class="controls">
      <button
        @mousedown="startRecognition"
        @mouseup="stopRecognition"
        @mouseleave="stopRecognition"
        class="record-button"
        :class="{ recording: isRecording }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          class="microphone-icon"
        >
          <path
            d="M12 15a3 3 0 0 1-3-3V6a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0zm0 2c2.5 0 6 1.25 6 3.5V21H6v-1.5c0-2.25 3.5-3.5 6-3.5z"
          />
        </svg>
        <span class="button-text">
          {{ isRecording ? 'Listening...' : 'Hold for voice input' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'SpeechToTextInput',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  setup() {
    const transcriptInput = ref<HTMLElement | null>(null);
    const isRecording = ref(false);
    const finalTranscript = ref(''); // Store the confirmed transcript
    let recognition: SpeechRecognition | null = null;

    const handleInput = (event: InputEvent) => {
      const target = event.target as HTMLElement;
      console.log(target.innerText); // Debugging purposes
    };

    const handlePaste = (event: ClipboardEvent) => {
      const text = event.clipboardData?.getData('text/plain') || '';
      document.execCommand('insertText', false, text);
    };

    const startRecognition = () => {
      if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        console.error('Speech recognition not supported.');
        return;
      }

      if (!recognition) {
        recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let interim = ''; // Collect interim results

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              finalTranscript.value += result[0].transcript; // Append final text
            } else {
              interim += result[0].transcript; // Capture interim text
            }
          }

          // Display both final and interim transcripts
          if (transcriptInput.value) {
            transcriptInput.value.innerText = finalTranscript.value + interim;
          }
        };

        recognition.onerror = (event: SpeechRecognitionError) => {
          console.error('Speech recognition error:', event.error);
          resetRecognition();
        };

        recognition.onend = () => {
          isRecording.value = false;
          resetRecognition();
        };
      }

      isRecording.value = true;
      recognition.start();
    };

    const stopRecognition = () => {
      if (recognition && isRecording.value) {
        recognition.stop();
        isRecording.value = false;
      }
    };

    const resetRecognition = () => {
      recognition = null;
    };

    onMounted(() => {
      transcriptInput.value = document.querySelector('.transcript-input');
    });

    return {
      isRecording,
      startRecognition,
      stopRecognition,
      handleInput,
      handlePaste,
      transcriptInput,
    };
  },
});
</script>

<style scoped>
.input-label {
  margin-bottom: 5px;
  color: #fff;
}

.controls {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.record-button {
  display: flex;
  align-items: center;
  width: 200px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #444;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.record-button:hover {
  background-color: #555;
}

.record-button.recording {
  background-color: #e74c3c;
}

.microphone-icon {
  margin-right: 5px;
  fill: #fff;
}

.button-text {
  flex-grow: 1;
  text-align: center;
}

.transcript-input {
  background-color: #333;
  color: #fff;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 10px;
  width: 400px;
  height: 100px;
  overflow-y: auto;
  font-size: 16px;
  outline: none;
  white-space: pre-wrap;
}

.transcript-input:focus {
  border-color: #777;
}
</style>
