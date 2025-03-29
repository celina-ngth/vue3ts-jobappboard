<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Text from '@/components/ui/Text.vue'
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'

const { t } = useI18n()

const STATUS = [
	{
		icon: 'Sparkles',
		name: t('dashboard.wishlist.title')
	},
	{
		icon: 'FileCheck',
		name: t('dashboard.applied.title')
	},
	{
		icon: 'BriefcaseBusiness',
		name: t('dashboard.interview.title')
	},
	{
		icon: 'ThumbsDown',
		name: t('dashboard.rejected.title')
	}
]
</script>

<template>
	<Text tag="h1">{{ $t('dashboard.title') }}</Text>

	<div class="grid grid-cols-4 gap-4">
		<div v-for="(status, index) in STATUS" :key="`${status.name}-${index}`">
			<div
				class="flex w-full flex-col content-center items-center justify-center gap-2 rounded border border-gray-200 p-3"
			>
				<div
					class="flex w-full content-center items-center justify-center gap-2"
				>
					<Icon :name="status.icon" class="mb-2" />
					<Text tag="h4" class="text-center uppercase">
						{{ status.name }}
					</Text>
				</div>

				<Button full-width><Icon name="Plus" /></Button>
			</div>
		</div>
	</div>
</template>
