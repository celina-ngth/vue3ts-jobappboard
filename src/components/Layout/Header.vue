<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/useAuthStore'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { user, isAuthenticated } = storeToRefs(authStore)

const handleLogout = () => {
	authStore.logout()
	router.push('/login')
}
</script>

<template>
	<div class="fixed w-full bg-slate-800 py-2 text-white">
		<div class="container flex items-center justify-between">
			<router-link to="/" class="text-lg font-semibold tracking-tight">
				{{ $t('common.title') }}
			</router-link>

			<router-link v-if="!isAuthenticated" to="/login">
				<Button>{{ $t('authentication.login.title') }}</Button>
			</router-link>

			<div v-else class="flex items-center gap-2">
				<div>{{ user.email }}</div>
				<Button @click="handleLogout" link>
					{{ $t('authentication.logout.button') }}
				</Button>
			</div>
		</div>
	</div>
</template>
