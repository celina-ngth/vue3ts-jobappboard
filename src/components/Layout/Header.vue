<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
</script>

<template>
	<div class="fixed w-full bg-slate-800 py-2 text-white">
		<div class="container flex justify-between">
			<router-link to="/" class="text-lg font-semibold tracking-tight">
				{{ $t('common.title') }}
			</router-link>

			<router-link to="/login">
				<Button>{{ $t('authentication.login.title') }}</Button>
			</router-link>
		</div>
	</div>
</template>
