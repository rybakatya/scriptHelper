<template>
    <nav class="navbar">
      <ul class="navbar-list">
        <li class="navbar-item">
          <span>Tools</span>
          <ul class="dropdown">
            <li @click="onTimerClicked" class="dropdown-item">Hold Timer</li>
            <li @click="onNotepadClicked" class="dropdown-item">Scratch Paper</li>
          </ul>
        </li>
      </ul>
    </nav>
  
    <Widget v-if="showTimerWidget" :width="200" :height="100" title="Timer">
      <div class="stopwatch">
        <span>{{ formattedTime }}</span>
        <button class="dropDownButton" @click="toggle">{{ isRunning ? 'Stop' : 'Start' }}</button>
        <button class="dropDownButton" @click="reset">Reset</button>
      </div>
    </Widget>
  
    <Widget v-if="showScratchWidget" :width="300" :height="200" title="Scratch Paper (does not get copied to notes)">
        <textarea
            rows="4"
            cols="50"
            style="width: 100%; resize: none;">
        </textarea>
      <button @click="copy">Copy</button>
    </Widget>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, onBeforeUnmount } from 'vue';
  import Widget from './Widget.vue';
  
  export default defineComponent({
    name: 'Navbar',
    components: {
      Widget
    },

    setup() {
      const showTimerWidget = ref(false);
      const showScratchWidget = ref(false);
      const isRunning = ref(false);
      const startTime = ref(0);
      const elapsedTime = ref(0);
      let timer: ReturnType<typeof setInterval> | null = null;
       
      const formattedTime = computed(() => {
        const totalSeconds = Math.floor(elapsedTime.value / 1000);
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
      });
  
      const toggle = () => {
        if (isRunning.value) {
          clearInterval(timer!);
          isRunning.value = false;
        } else {
          startTime.value = Date.now() - elapsedTime.value;
          timer = setInterval(() => {
            elapsedTime.value = Date.now() - startTime.value;
          }, 1000);
          isRunning.value = true;
        }
      };
  
      const reset = () => {
        clearInterval(timer!);
        isRunning.value = false;
        elapsedTime.value = 0;
      };
  
      const onTimerClicked = () => {
        showTimerWidget.value = true;
      };
  
      const onNotepadClicked = () => {
        showScratchWidget.value = true;
      };
  
      
  
      const copy = () => {
        // Your copy logic here
      };
  
      onBeforeUnmount(() => {
        clearInterval(timer!);
      });
  
      return {
        showTimerWidget,
        showScratchWidget,
        formattedTime,
        
        toggle,
        reset,
        onTimerClicked,
        onNotepadClicked,
        
        copy
      };
    }
  });
 </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  
  
  <style scoped>
  .navbar {
    background-color: #333;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 10px 20px;
    z-index: 1000;
  }
  
  .navbar-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .navbar-item {
    position: relative;
    margin: 0 15px;
    cursor: pointer;
  }
  
  .navbar-item:hover .dropdown {
    display: block;
  }
  
  .dropdown {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #444;
    padding: 10px 0;
    border-radius: 4px;
  }
  
  .dropdown-item {
    padding: 10px 20px;
    color: white;
    white-space: nowrap; /* Prevent line breaks */
    width: 100%; /* Full width */
    text-align: left; /* Align text to the left */
    list-style: none;
    position:relative;
  }
  
  .dropdown-item:hover {
    background-color: #555;
  }
  
  .stopwatch {
    display: flex;
    align-items: center;
  }
  
  button {
    margin-left: 10px;
  }

  .dropDownButton
  {
    outline: none;
    background-color: ;
  }
  </style>
  