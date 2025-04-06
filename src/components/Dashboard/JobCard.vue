<script lang="ts" setup>
import { Job } from '@/api/jobs/types'
import { Label } from '@/components/ui/label'

defineProps<{ job: Job }>()
</script>

<template>
	<div
		class="flex flex-col w-full gap-2 rounded-md border border-slate-300 p-3 hover:cursor-pointer hover:bg-gray-100"
	>
		<Label>
			{{ job.title }}
		</Label>
		<Label>
			{{ job.company }}
		</Label>
	</div>
</template>
