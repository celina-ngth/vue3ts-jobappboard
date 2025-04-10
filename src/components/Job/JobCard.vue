<script lang="ts" setup>
import { Job } from '@/api/jobs/types'
import { Label } from '@/components/ui/label'
import Icon from '@/components/ui/Icon.vue'
import JobModal from '@/components/Job/JobModal.vue'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

defineProps<{ job: Job }>()

const emit = defineEmits(['delete'])
</script>

<template>
	<div
		class="flex items-center justify-between rounded-md border border-slate-300 p-3 hover:cursor-pointer hover:bg-gray-100"
	>
		<JobModal :job="job" :status="job.status">
			<Label class="text-xs font-normal uppercase hover:cursor-pointer">
				{{ job.company }}
			</Label>
			<Label class="hover:cursor-pointer">
				{{ job.title }}
			</Label>
		</JobModal>

		<DropdownMenu>
			<DropdownMenuTrigger>
				<Icon
					name="EllipsisVertical"
					class="hover:cursor-pointer hover:text-gray-600"
				/>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuItem @click="emit('delete', job.id)">
					{{ $t('dashboard.delete') }}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
</template>
