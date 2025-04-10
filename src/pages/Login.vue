<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import Text from '@/components/ui/Text.vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'

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
	<form @submit.prevent="handleLogin">
		<Text tag="h1">{{ $t('authentication.login.title') }}</Text>

		<div class="flex flex-col gap-3">
			<Input
				v-model="email"
				label="Email"
				type="email"
				placeholder="Votre adresse mail"
				class="p-2"
			/>
			<Input
				v-model="password"
				type="password"
				label="Mot de passe"
				placeholder="Mot de passe"
				class="p-2"
			/>

			<Button type="submit" variant="default">
				{{ $t('authentication.login.button') }}
			</Button>

			<div class="flex items-center gap-2">
				<div>{{ $t('authentication.signup.hasAccount') }}</div>
				<RouterLink to="/signup">
					<Button variant="link" class="hover:cursor-pointer">
						{{ $t('authentication.signup.button') }}
					</Button>
				</RouterLink>
			</div>

			<p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
		</div>
	</form>
</template>
