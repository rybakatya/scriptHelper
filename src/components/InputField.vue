<template>
  <div>
    <label v-if="label" class="input-label">{{ label }}</label>
    <div 
      contenteditable="true"
      @input="handleInput"
      @paste.prevent="handlePaste"
      :style="inputStyle"
      class="transcript-input"
      ref="transcriptInput"
    >
      <span>{{ userInput }}</span><span class="interim">{{ interimTranscript }}</span>
    </div>
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
          <path d="M12 15a3 3 0 0 1-3-3V6a3 3 0 0 1 6 0v6a3 3 0 0 1-3 3zm0 2c2.5 0 6 1.25 6 3.5V21H6v-1.5c0-2.25 3.5-3.5 6-3.5z" />
        </svg>
        <span class="button-text">{{ isRecording ? 'Listening...' : 'Hold for voice input' }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';

export default defineComponent({
  name: 'SpeechToTextInput',
  props: {
    label: {
      type: String as PropType<string>,
      default: ''
    }
  },
  
  setup(props, { emit }) {
    const userInput = ref<string>(''); // For user input
    const interimTranscript = ref<string>(''); // For interim results from speech recognition
    const isRecording = ref<boolean>(false);
    let recognition: SpeechRecognition | null = null;

    const handleInput = (event: Event) => {
      const target = event.target as HTMLElement;
      userInput.value = target.innerText.replace(/\n/g, ' \n'); // Update user input
    };

    const handlePaste = (event: ClipboardEvent) => {
      const text = event.clipboardData?.getData('text/plain');
      document.execCommand('insertText', false, text);
    };

    const startRecognition = () => {
      if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        console.error('Speech recognition not supported in this browser.');
        return;
      }

      emit('callStopDeadair'); // Emit the event to call the parent's function

      // Only initialize recognition if not already started
      if (!recognition) {
        recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let interim = '';
          let finalTranscript = userInput.value; // Start with existing user input

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              finalTranscript += result[0].transcript + ' '; // Append final result
            } else {
              interim += result[0].transcript + ' '; // Append interim results
            }
          }

          interimTranscript.value = interim.trim(); // Update interim transcript
          userInput.value = finalTranscript.trim(); // Update final transcript
        };

        recognition.onerror = (event: SpeechRecognitionError) => {
          console.error("Speech recognition error:", event.error);
          resetRecognition(); // Reset on error
        };

        recognition.onend = () => {
          isRecording.value = false; // Reset recording state when recognition ends
          resetRecognition(); // Clean up the instance
        };
      }

      isRecording.value = true; // Set recording state to true
      recognition.start();
    };

    const stopRecognition = () => {
      if (recognition && isRecording.value) {
        isRecording.value = false; // Set recording state to false
        recognition.stop();
      }
      emit('callStartDeadAir');
    };

    const resetRecognition = () => {
      recognition = null; // Clear the recognition instance
    };

    return {
      userInput,
      interimTranscript,
      handleInput,
      handlePaste,
      startRecognition,
      stopRecognition,
      isRecording,
    };
  },
});
</script>

<style scoped>
.input-label {
  margin-bottom: 5px;
  color: #fff; /* Light text color for label */
}

.controls {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.record-button {
  display: flex;
  align-items: center;
  width: 200px; /* Fixed width for the button */
  padding: 5px 10px; /* Smaller button size */
  font-size: 14px; /* Smaller font size */
  background-color: #444; /* Dark background for the button */
  color: #fff; /* Light text color */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s; /* Smooth transition for background color */
}

.record-button:hover {
  background-color: #555; /* Slightly lighter on hover */
}

.record-button.recording {
  background-color: #e74c3c; /* Red background while recording */
}

.microphone-icon {
  margin-right: 5px; /* Space between icon and text */
  fill: #fff; /* White icon color */
}

.button-text {
  flex-grow: 1; /* Ensure text takes available space */
  text-align: center; /* Center the text */
}

.transcript-input {
  background-color: #333; /* Dark background for the input area */
  color: #fff; /* Light text color */
  border: 1px solid #555; /* Border color */
  border-radius: 4px;
  padding: 10px;
  width: 400px; /* Fixed width */
  height: 100px; /* Fixed height */
  overflow-y: auto; /* Enable vertical scrollbar when text overflows */
  font-size: 16px;
  outline: none;
  white-space: pre-wrap; /* Preserve spaces and line breaks */
}

.interim {
  color: #aaa; /* Lighter color for interim results */
}

.transcript-input:focus {
  border-color: #777; /* Change border color when focused */
}
</style>
