<template>
	<div class="flex flex-col">
		<Header />

		<main class="mt-20">
			<RouterView />
		</main>
	</div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/layout/Header.vue'
</script>
