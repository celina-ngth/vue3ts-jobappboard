<script lang="ts" setup>
import { PropType, reactive, ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Job, JobStatus } from '@/api/jobs/types'
import { useJobs } from '@/composables/useJobs'
import { toast } from 'vue-sonner'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { addJobMutation, updateJobMutation } = useJobs()

const props = defineProps({
	job: {
		type: Object as PropType<Job | null>
	},
	status: {
		type: String as PropType<JobStatus>
	}
})

const open = ref(false)

const newJob = reactive<Job>({
	id: props.job?.id ?? Date.now().toString(),
	title: props.job?.title ?? '',
	company: props.job?.company ?? '',
	status: props.status ?? props.job?.status
})

const updateNewJob = () => {
	newJob.status = props.status
}

const onSubmit = () => {
	props.job ? updateJobMutation.mutate(newJob) : addJobMutation.mutate(newJob)
	toast.success(
		props.job
			? t('modal.updated', { title: newJob.title })
			: t('modal.success', { title: newJob.title })
	)
	open.value = false
}

watch(
	() => props.status,
	() => {
		updateNewJob()
	}
)
</script>

<template>
	<Dialog v-model:open="open">
		<div @click="open = true">
			<slot />
		</div>

		<DialogContent class="sm:max-w-[600px]">
			<form
				:id="`add-job-${status}`"
				@submit.prevent="onSubmit"
				class="grid gap-4"
			>
				<DialogHeader>
					<DialogTitle>
						{{ $t(job ? 'modal.updateTitle' : 'modal.addTitle') }}
					</DialogTitle>
					<DialogDescription v-if="!job">
						{{ $t('modal.description') }}
					</DialogDescription>
				</DialogHeader>

				<div class="grid gap-2">
					<Label for="offer">{{ $t('modal.jobTitle') }}</Label>
					<Input v-model="newJob.title" id="offer" />
				</div>

				<div class="grid gap-2">
					<Label for="company">{{ $t('modal.company') }}</Label>
					<Input v-model="newJob.company" id="company" />
				</div>

				<DialogFooter>
					<Button :for="`add-job-${status}`" type="button" @click="onSubmit">
						{{ $t(job ? 'modal.updateButton' : 'modal.addButton') }}
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>
</template>
