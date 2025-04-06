<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
	<Toaster position="top-right" />

	<RouterView />

	<VueQueryDevtools initial-is-open />
</template>
