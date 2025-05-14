<template>
	<form @submit.prevent="handleSignup">
		<Text tag="h1">{{ $t('authentication.signup.title') }}</Text>

		<div class="flex flex-col gap-3">
			<Label>{{ $t('authentication.login.yourEmail') }}</Label>
			<Input
				v-model="email"
				:label="$t('authentication.login.email')"
				type="email"
				:placeholder="$t('authentication.login.yourEmail')"
				class="mb-4 p-2"
			/>

			<Label>{{ $t('authentication.login.yourPassword') }}</Label>
			<Input
				v-model="password"
				type="password"
				:label="$t('authentication.login.password')"
				:placeholder="$t('authentication.login.password')"
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

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import Text from '@/components/ui/Text.vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'

const router = useRouter()
const { signup } = useAuth()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleSignup = async () => {
	try {
		await signup(email.value, password.value)
		router.push('/')
	} catch (error) {
		errorMessage.value = 'Erreur : ' + error.message
	}
}
</script>
