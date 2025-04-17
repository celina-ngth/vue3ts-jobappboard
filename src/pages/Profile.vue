<template>
	<div class="p-6">
		<h2 class="mb-4 text-2xl font-bold">{{ $t('profile.title') }}</h2>

		<div v-if="authStore.isAuthenticated" class="flex flex-col gap-4">
			<Label>Votre adresse mail</Label>
			<Input
				label="Votre email"
				:placeholder="authStore.user?.email"
				disabled
				class="mb-4 p-2"
			/>

			<Label>Votre nom d'utilisateur</Label>
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

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'
import { toast } from 'vue-sonner'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const authStore = useAuthStore()
const newDisplayName = ref(authStore.user?.displayName ?? '')

const saveDisplayName = async () => {
	if (!newDisplayName.value.trim()) return
	await authStore.updateDisplayName(newDisplayName.value)

	toast.success(t('profile.updatedMessage'), {
		duration: 3000
	})
}
</script>
