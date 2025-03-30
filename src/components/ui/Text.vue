<script lang="ts" setup>
const props = defineProps({
	tag: {
		type: String,
		default: 'p'
	}
})

const textClasses = {
	h1: 'text-2xl font-semibold pb-4',
	h2: 'text-xl font-semibold pb-3',
	h3: 'text-lg font-semibold pb-2',
	h4: 'text-sm font-semibold pb-2',
	p: 'text-base pb-2'
}[props.tag]
</script>

<template>
	<component :is="tag" :class="textClasses">
		<slot />
	</component>
</template>
