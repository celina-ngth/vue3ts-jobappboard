<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import Text from '@/components/ui/Text.vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'

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
	<form @submit.prevent="handleSignup">
		<Text tag="h1">{{ $t('authentication.signup.title') }}</Text>

		<div class="flex flex-col gap-3">
			<Input
				v-model="displayName"
				label="Nom d'utilisateur"
				placeholder="Entrez votre nom d'utilisateur"
				class="p-2"
			/>
			<Input
				v-model="email"
				label="Email"
				type="email"
				placeholder="Votre adresse mail"
				class="p-2"
			/>
			<Input
				v-model="password"
				label="Mot de passe"
				type="password"
				placeholder="Mot de passe"
				class="p-2"
			/>

			<Button type="submit">
				{{ $t('authentication.signup.button') }}
			</Button>

			<div class="flex items-center gap-2">
				<div>{{ $t('authentication.login.noAccount') }}</div>
				<RouterLink to="/login">
					<Button variant="link" class="hover:cursor-pointer">
						{{ $t('authentication.login.button') }}
					</Button>
				</RouterLink>
			</div>

			<p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
		</div>
	</form>
</template>
