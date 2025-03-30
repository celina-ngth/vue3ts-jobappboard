<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/useAuthStore'
import { storeToRefs } from 'pinia'
import { FwbDropdown } from 'flowbite-vue'
import { FwbButton } from 'flowbite-vue'
import { Settings } from 'lucide-vue-next'

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
			<RouterLink to="/" class="text-lg font-semibold tracking-tight">
				{{ $t('common.title') }}
			</RouterLink>

			<RouterLink v-if="!isAuthenticated" to="/login">
				<Button>{{ $t('authentication.login.title') }}</Button>
			</RouterLink>

			<div v-else class="flex items-center gap-2">
				<div>Hello {{ user.displayName ?? user.email }} 👋</div>
				<FwbDropdown placement="bottom" align-to-end>
					<template #trigger>
						<FwbButton color="light" class="hover:cursor-pointer">
							<Settings />
						</FwbButton>
					</template>

					<nav class="w-[200px] py-2 text-slate-700">
						<RouterLink to="/profile">
							<div class="block px-4 py-2 hover:bg-gray-100">Profil</div>
						</RouterLink>
						<div
							@click="handleLogout"
							link
							full-width
							class="block px-4 py-2 hover:cursor-pointer hover:bg-gray-100"
						>
							{{ $t('authentication.logout.button') }}
						</div>
					</nav>
				</FwbDropdown>
			</div>
		</div>
	</div>
</template>
