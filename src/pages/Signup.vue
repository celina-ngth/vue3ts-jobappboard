<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Text from '@/components/ui/Text.vue'
import Button from '@/components/ui/Button.vue'
import { useAuth } from '@/composables/useAuth'
import { FwbInput } from 'flowbite-vue'

const router = useRouter()
const { signup } = useAuth()

const displayName = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleSignup = async () => {
	try {
		await signup(email.value, password.value, displayName.value)
		router.push('/')
	} catch (error) {
		errorMessage.value = 'Erreur : ' + error.message
	}
}
</script>

<template>
	<form @submit.prevent="handleSignup" class="space-y-4">
		<div class="flex min-h-[600px] flex-col items-center justify-center">
			<Text tag="h1">{{ $t('authentication.signup.title') }}</Text>

			<div class="flex w-1/2 flex-col gap-3">
				<FwbInput
					v-model="displayName"
					label="Nom d'utilisateur"
					placeholder="Entrez votre nom d'utilisateur"
					class="p-2"
				/>
				<FwbInput
					v-model="email"
					label="Email"
					type="email"
					placeholder="Votre adresse mail"
					class="p-2"
				/>
				<FwbInput
					v-model="password"
					label="Mot de passe"
					type="password"
					placeholder="Mot de passe"
					class="p-2"
				/>

				<Button variant="information" type="submit">
					{{ $t('authentication.signup.button') }}
				</Button>

				<div class="flex gap-2">
					{{ $t('authentication.login.noAccount') }}
					<RouterLink to="/login">
						<Button link>
							{{ $t('authentication.login.button') }}
						</Button>
					</RouterLink>
				</div>

				<p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
			</div>
		</div>
	</form>
</template>
