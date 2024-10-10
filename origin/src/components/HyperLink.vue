<template>
    <a class="link" :href="props.link" target="_blank">{{ props.text }}</a>
</template>

<script setup lang="ts">
interface Props 
{
    link : string,
    target : string,
    text : string
}
const props = defineProps<Props>();
</script>
<style>
.link
{
    color: lightblue;
}
</style>