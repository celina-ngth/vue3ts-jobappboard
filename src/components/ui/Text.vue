<script lang="ts" setup>
const props = defineProps({
	tag: {
		type: String,
		default: 'p'
	}
})

const textClasses = {
	h1: 'text-2xl font-semibold',
	h2: 'text-xl font-semibold',
	h3: 'text-lg font-semibold',
	h4: 'text-md font-semibold',
	p: 'text-md'
}[props.tag]
</script>

<template>
	<component :is="tag" :class="textClasses">
		<slot />
	</component>
</template>
