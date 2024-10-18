<template>
    <div
      v-if="isVisible"
      class="widget"
      :style="{ left: `${position.x}px`, top: `${position.y}px`, width: `${computedWidth}px`, height: `${computedHeight}px` }"
    >
      <div class="header" @mousedown.prevent="startDragging">
        <span class="title">{{ title }}</span>
        <button @click="closeWidget" class="close-button">X</button>
      </div>
      <div class="content" v-show="isContentVisible">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  
  export default defineComponent({
    name: 'Widget',
    props: {
      title: {
        type: String,
        default: 'Movable Widget'
      },
      width: {
        type: Number,
        default: 300 // Default width
      },
      height: {
        type: Number,
        default: 200 // Default height
      }
    },
    setup(props) {
      const isVisible = ref(true);
      const isContentVisible = ref(true);
      const position = ref({ x: 100, y: 100 });
  
      const computedWidth = computed(() => Math.max(props.width, 100));
      const computedHeight = computed(() => Math.max(props.height, 100));
  
      const closeWidget = () => {
        isVisible.value = false;
      };
  
      const startDragging = (event: MouseEvent) => {
        const offset = { x: event.clientX - position.value.x, y: event.clientY - position.value.y };
  
        const onMouseMove = (e: MouseEvent) => {
          position.value.x = e.clientX - offset.x;
          position.value.y = e.clientY - offset.y;
        };
  
        const onMouseUp = () => {
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
        };
  
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      };
  
      return {
        isVisible,
        isContentVisible,
        position,
        computedWidth,
        computedHeight,
        closeWidget,
        startDragging
      };
    }
  });
  </script>
  
  <style scoped>
  .widget {
    position: absolute;
    border: 1px solid #555;
    background: #222;
    color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #333;
    color: #fff;
    padding: 10px;
    cursor: move; /* Indicates draggable area */
  }
  
  .header .close-button {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    margin-left: auto; /* Push the button to the right */
  }
  
  .header .close-button:hover {
    color: #ddd;
  }
  
  .content {
    padding: 10px;
  }
  </style>
  