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
							Hello {{ user.displayName ?? user.email }} 👋
						</NavigationMenuTrigger>

						<NavigationMenuContent>
							<NavigationMenuLink as-child>
								<RouterLink to="/profile">
									<div
										class="w-[200px] px-2 py-3 hover:cursor-pointer hover:bg-slate-100"
									>
										Profil
									</div>
								</RouterLink>
							</NavigationMenuLink>

							<NavigationMenuLink as-child>
								<div
									@click="handleLogout"
									class="w-[200px] px-2 py-3 hover:cursor-pointer hover:bg-slate-100"
								>
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
