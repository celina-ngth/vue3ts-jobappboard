<script lang="ts" setup>
import { Job } from '@/api/jobs/types'
import { Label } from '@/components/ui/label'
import JobModal from '@/components/Job/JobModal.vue'

defineProps<{ job: Job }>()
</script>

<template>
	<div
		class="rounded-md border border-slate-300 p-3 hover:cursor-pointer hover:bg-gray-100"
	>
		<JobModal :job="job" :status="job.status">
			<Label class="text-xs font-normal uppercase hover:cursor-pointer">
				{{ job.company }}
			</Label>
			<Label class="hover:cursor-pointer">
				{{ job.title }}
			</Label>
		</JobModal>
	</div>
</template>
