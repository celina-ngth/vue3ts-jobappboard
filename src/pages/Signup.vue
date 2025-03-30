<script setup lang="ts">
import { ref } from 'vue'
import Text from '@/components/ui/Text.vue'
import Button from '@/components/ui/Button.vue'

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
</script>

<template>
	<div class="flex min-h-[600px] flex-col items-center justify-center">
		<Text tag="h1">{{ $t('authentication.signup.title') }}</Text>

		<div class="flex w-1/2 flex-col gap-3">
			<input
				v-model="firstname"
				type="firstname"
				placeholder="Prénom"
				class="rounded-md border border-gray-300 p-2"
			/>
			<input
				v-model="lastname"
				type="lastname"
				placeholder="Nom"
				class="rounded-md border border-gray-300 p-2"
			/>
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

			<Button variant="information">
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
</template>
