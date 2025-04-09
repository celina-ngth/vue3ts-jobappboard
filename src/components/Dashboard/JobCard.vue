<script lang="ts" setup>
import { Job } from '@/api/jobs/types'
import { Label } from '@/components/ui/label'

defineProps<{ job: Job }>()
</script>

<template>
	<div
		class="flex w-full flex-col gap-2 rounded-md border border-slate-300 p-3 hover:cursor-pointer hover:bg-gray-100"
	>
		<Label class="text-xs font-normal uppercase hover:cursor-pointer">
			{{ job.company }}
		</Label>
		<Label class="hover:cursor-pointer">
			{{ job.title }}
		</Label>
	</div>
</template>
