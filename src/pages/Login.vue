<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Text from '@/components/ui/Text.vue'
import Button from '@/components/ui/Button.vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
	try {
		await login(email.value, password.value)
		router.push('/')
	} catch (error) {
		errorMessage.value = 'Erreur : ' + error.message
	}
}
</script>

<template>
	<form @submit.prevent="handleLogin" class="space-y-4">
		<div class="flex min-h-[600px] flex-col items-center justify-center">
			<Text tag="h1">{{ $t('authentication.login.title') }}</Text>

			<div class="flex w-1/2 flex-col gap-3">
				<input
					v-model="email"
					type="email"
					placeholder="Email"
					class="rounded-md border border-gray-300 p-2"
				/>
				<input
					v-model="password"
					type="password"
					placeholder="Mot de passe"
					class="rounded-md border border-gray-300 p-2"
				/>

				<Button variant="information" type="submit">
					{{ $t('authentication.login.button') }}
				</Button>

				<div class="flex gap-2">
					{{ $t('authentication.signup.hasAccount') }}
					<RouterLink to="/signup">
						<Button link>
							{{ $t('authentication.signup.button') }}
						</Button>
					</RouterLink>
				</div>

				<p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
			</div>
		</div>
	</form>
</template>
