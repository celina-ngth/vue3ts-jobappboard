<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Text from '@/components/ui/Text.vue'
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'
import JobCard from '@/components/Dashboard/JobCard.vue'
import Draggable from 'vuedraggable'
import { ref } from 'vue'

const { t } = useI18n()

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
		id: 'wishlist',
		title: t('dashboard.wishlist.title'),
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
	<Text tag="h1">{{ $t('dashboard.title') }}</Text>

	<div class="flex items-start gap-4">
		<div v-for="column in columns" :key="column.id" class="flex w-full gap-4">
			<div
				class="flex w-full flex-col content-center items-center justify-center gap-2 rounded border border-gray-200 p-3"
			>
				<div
					class="flex w-full content-center items-center justify-center gap-2"
				>
					<Icon :name="column.icon" class="mb-2" />
					<Text tag="h4" class="text-center uppercase">
						{{ column.title }}
					</Text>
				</div>

				<Button full-width><Icon name="Plus" /></Button>

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
</template>
