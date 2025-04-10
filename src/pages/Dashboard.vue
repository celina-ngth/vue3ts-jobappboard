<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import Draggable from 'vuedraggable'
import Text from '@/components/ui/Text.vue'
import Icon from '@/components/ui/Icon.vue'
import { Button } from '@/components/ui/button'
import JobCard from '@/components/Job/JobCard.vue'
import JobModal from '@/components/Job/JobModal.vue'
import { useJobs } from '@/composables/useJobs'
import { JobBoard, JobStatus } from '@/api/jobs/types'
import { toast } from 'vue-sonner'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { jobsQuery, updateJobMutation, deleteJobMutation } = useJobs()
const { data, isLoading } = jobsQuery()

const localColumns = ref<JobBoard[]>([])

const columns = computed(() => data.value)

const handleStatusChange = async (e: any, columnId: JobStatus) => {
	if (!e.added) return

	const { element } = e.added
	const updatedJob = { ...element, status: columnId }

	updateJobMutation.mutate(updatedJob)
}

const handleDelete = async (jobId: string) => {
	deleteJobMutation.mutate(jobId)

	toast.success(t('dashboard.deletedMessage'))
}

watchEffect(() => {
	if (data.value) {
		localColumns.value = JSON.parse(JSON.stringify(data.value))
	}
})
</script>

<template>
	<div class="container">
		<Text tag="h1">{{ $t('dashboard.title') }}</Text>

		<div v-if="!columns?.length && !isLoading">
			{{ $t('dashboard.notAuthenticated') }}
		</div>

		<div v-if="isLoading">
			<Icon name="LoaderCircle" class="mx-auto size-8 animate-spin" />
		</div>

		<div v-else class="flex items-start gap-4">
			<div
				v-for="column in localColumns"
				:key="column.id"
				class="flex w-full gap-4"
			>
				<div
					:data-status="column.id"
					class="flex w-full flex-col content-center items-center justify-center gap-2 overflow-hidden rounded-md border border-gray-300"
				>
					<div
						class="flex w-full content-center items-center justify-center gap-2 bg-slate-300 px-3 pt-2"
					>
						<Icon :name="column.icon" class="mb-2" />
						<Text tag="h4" class="text-center uppercase">
							{{ $t(`dashboard.${column.id}.title`) }}
						</Text>
					</div>

					<div class="flex w-full flex-col gap-2 p-3">
						<JobModal :status="column.id">
							<Button class="w-full">
								<Icon name="Plus" />
							</Button>
						</JobModal>

						<Draggable
							v-model="column.jobs"
							item-key="id"
							group="list"
							class="flex w-full flex-col gap-2"
							@change="handleStatusChange($event, column.id)"
						>
							<template #item="{ element: job }">
								<JobCard
									:job="job"
									:status="column.id"
									@delete="handleDelete(job.id)"
								/>
							</template>
						</Draggable>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
