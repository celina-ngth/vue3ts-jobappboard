<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'

const authStore = useAuthStore()
const newDisplayName = ref(authStore.user?.displayName || '')

const saveDisplayName = async () => {
	if (!newDisplayName.value.trim()) return
	await authStore.updateDisplayName(newDisplayName.value)
}
</script>

<template>
	<div class="p-6">
		<h2 class="mb-4 text-2xl font-bold">{{ $t('profile.title') }}</h2>

		<div v-if="authStore.isAuthenticated" class="flex flex-col gap-4">
			<Input
				label="Votre email"
				:placeholder="authStore.user?.email"
				disabled
				class="p-2"
			/>
			<Input
				v-model="newDisplayName"
				label="Votre nom d'utilisateur"
				placeholder="Entrez votre nom d'utilisateur"
				class="p-2"
			/>

			<Button @click="saveDisplayName">
				{{ $t('profile.updateButton') }}
			</Button>
		</div>
	</div>
</template>
