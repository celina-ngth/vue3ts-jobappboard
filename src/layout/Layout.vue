<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Layout/Header.vue'
</script>

<template>
	<div class="flex flex-col">
		<Header />

		<main class="mt-8">
			<RouterView />
		</main>
	</div>
</template>
