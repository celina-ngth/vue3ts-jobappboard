<template>
	<div class="fixed w-full bg-slate-800 py-2">
		<div class="container flex items-center justify-between">
			<RouterLink
				to="/"
				class="text-lg font-semibold tracking-tight text-white"
			>
				{{ $t('common.title') }}
			</RouterLink>

			<RouterLink v-if="!isAuthenticated" to="/login">
				<Button class="text-white">
					{{ $t('authentication.login.title') }}
				</Button>
			</RouterLink>

			<NavigationMenu v-else>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>
							{{
								$t('navigation.greetings', {
									name: user.displayName ?? user.email
								})
							}}
						</NavigationMenuTrigger>

						<NavigationMenuContent class="w-[150px]">
							<NavigationMenuLink as-child>
								<RouterLink to="/profile">
									<div class="w-full">{{ $t('profile.title') }}</div>
								</RouterLink>
							</NavigationMenuLink>

							<NavigationMenuLink as-child>
								<div @click="handleLogout" class="w-full hover:cursor-pointer">
									{{ $t('authentication.logout.button') }}
								</div>
							</NavigationMenuLink>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/useAuthStore'
import { storeToRefs } from 'pinia'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger
} from '@/components/ui/navigation-menu'

const authStore = useAuthStore()
const { user, isAuthenticated } = storeToRefs(authStore)

const handleLogout = () => {
	authStore.logout()
	router.push('/login')
}
</script>
