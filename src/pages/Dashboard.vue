<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import Draggable from 'vuedraggable'
import Text from '@/components/ui/Text.vue'
import Icon from '@/components/ui/Icon.vue'
import JobCard from '@/components/Dashboard/JobCard.vue'
import AddJobModal from '@/components/Dashboard/AddJobModal.vue'
import { useJobs } from '@/composables/useJobs'
import { JobBoard, JobStatus } from '@/api/jobs/types'

const { jobsQuery, updateJobMutation } = useJobs()
const { data, isLoading } = jobsQuery()

const columns = computed(() => data.value)

async function handleStatusChange(e: any, columnId: JobStatus) {
	if (!e.added) return

	const { element } = e.added
	const updatedJob = { ...element, status: columnId }

	updateJobMutation.mutate(updatedJob)
}

const localColumns = ref<JobBoard[]>([])

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
						<AddJobModal :status="column.id" class="h-[100px] w-full" />

						<Draggable
							v-model="column.jobs"
							item-key="id"
							group="list"
							class="flex w-full flex-col gap-2"
							@change="handleStatusChange($event, column.id)"
						>
							<template #item="{ element: job }">
								<JobCard :job="job" />
							</template>
						</Draggable>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
