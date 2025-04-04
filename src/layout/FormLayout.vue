<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Layout/Header.vue'
</script>

<template>
	<div class="flex flex-col">
		<Header />

		<div
			class="container flex min-h-[600px] w-full flex-col items-center justify-center"
		>
			<div class="w-[600px]">
				<RouterView />
			</div>
		</div>
	</div>
</template>
