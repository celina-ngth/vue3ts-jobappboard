<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Text from '@/components/ui/Text.vue'
import Icon from '@/components/ui/Icon.vue'
import JobCard from '@/components/Dashboard/JobCard.vue'
import Draggable from 'vuedraggable'
import { defineAsyncComponent, ref } from 'vue'

const AddJobModal = defineAsyncComponent(
	() => import('@/components/Dashboard/AddJobModal.vue')
)

const { t } = useI18n()

const openModal = ref(false)

export interface Job {
	id: string
	title: string
}

interface Column {
	id: string
	title: string
	icon: string
	jobs: Job[]
}

const columns = ref<Column[]>([
	{
		id: 'saved',
		title: t('dashboard.saved.title'),
		icon: 'Sparkles',
		jobs: [
			{ id: 'job-1', title: 'Google' },
			{ id: 'job-2', title: 'Facebook' }
		]
	},
	{
		id: 'applied',
		title: t('dashboard.applied.title'),
		icon: 'FileCheck',
		jobs: []
	},
	{
		id: 'interview',
		title: t('dashboard.interview.title'),
		icon: 'BriefcaseBusiness',
		jobs: []
	},
	{
		id: 'rejected',
		title: t('dashboard.rejected.title'),
		icon: 'ThumbsDown',
		jobs: []
	}
])
</script>

<template>
	<div class="container">
		<Text tag="h1">{{ $t('dashboard.title') }}</Text>

		<div class="flex items-start gap-4">
			<div v-for="column in columns" :key="column.id" class="flex w-full gap-4">
				<div
					class="flex w-full flex-col content-center items-center justify-center gap-2 overflow-hidden rounded-md border border-gray-300"
				>
					<div
						class="flex w-full content-center items-center justify-center gap-2 bg-slate-300 px-3 pt-2"
					>
						<Icon :name="column.icon" class="mb-2" />
						<Text tag="h4" class="text-center uppercase">
							{{ column.title }}
						</Text>
					</div>

					<div class="flex w-full flex-col gap-2 p-3">
						<AddJobModal
							:open-modal="openModal"
							@close-modal="openModal = false"
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
