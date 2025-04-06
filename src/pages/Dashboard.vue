<script setup lang="ts">
import { computed, ref } from 'vue'
import Draggable from 'vuedraggable'
import Text from '@/components/ui/Text.vue'
import Icon from '@/components/ui/Icon.vue'
import JobCard from '@/components/Dashboard/JobCard.vue'
import AddJobModal from '@/components/Dashboard/AddJobModal.vue'
import { useJobs } from '@/composables/useJobs'
import { JobStatus } from '@/api/jobs/types'

const { jobsQuery } = useJobs()
const { data, isLoading } = jobsQuery()

const openModal = ref(false)

const columns = computed(() => data.value)

const handleSubmit = (type: JobStatus) => {
	openModal.value = false
	console.log({ type })
}
</script>

<template>
	<div class="container">
		<Text tag="h1">{{ $t('dashboard.title') }}</Text>

		<div v-if="isLoading">
			<Icon name="LoaderCircle" class="mx-auto size-8 animate-spin" />
		</div>

		<div v-else class="flex items-start gap-4">
			<div v-for="column in columns" :key="column.id" class="flex w-full gap-4">
				<div
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
						<AddJobModal
							:open-modal="openModal"
							:status="column.id"
							@close-modal="handleSubmit(column.id)"
							class="h-[100px] w-full"
						/>

						<Draggable
							v-model="column.jobs"
							group="jobs"
							item-key="id"
							:animation="100"
							class="flex w-full flex-col gap-2"
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
