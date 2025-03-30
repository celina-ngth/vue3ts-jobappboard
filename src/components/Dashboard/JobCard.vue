<script lang="ts" setup>
import { Job } from '@/pages/Dashboard.vue'

defineProps<{ job: Job }>()
</script>

<template>
	<div
		class="flex w-full gap-2 rounded-md border border-gray-200 p-3 hover:cursor-pointer hover:bg-gray-100"
	>
		{{ job.title }}
	</div>
</template>
