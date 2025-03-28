<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
	<h1 class="container">{{ msg }}</h1>
</template>
