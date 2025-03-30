<script lang="ts" setup>
defineProps({
	to: {
		type: String
	},
	variant: {
		type: String
	},
	fullWidth: {
		type: Boolean
	},
	link: {
		type: Boolean
	}
})

defineEmits(['clicked'])
</script>

<template>
	<button
		:href="to"
		@click="$emit('clicked')"
		class="flex hover:cursor-pointer hover:opacity-90"
		:class="{
			'w-full': fullWidth,
			'justify-center rounded-md border border-gray-300 px-4 py-2 text-center':
				!link,
			'underline underline-offset-2': link,
			'bg-blue-500 text-white': variant === 'information'
		}"
	>
		<slot />
	</button>
</template>
