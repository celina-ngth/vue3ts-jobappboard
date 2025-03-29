<script lang="ts" setup>
defineProps({
	to: {
		type: String
	},
	fullWidth: {
		type: Boolean
	}
})

defineEmits(['clicked'])
</script>

<template>
	<button
		:href="to"
		@click="$emit('clicked')"
		class="flex justify-center rounded-md border border-gray-200 px-4 py-2 text-center hover:cursor-pointer hover:bg-gray-100"
		:class="{ 'w-full': fullWidth }"
	>
		<slot />
	</button>
</template>
