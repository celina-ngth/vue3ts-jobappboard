<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Icon from '@/components/ui/Icon.vue'

defineProps({
	openModal: {
		type: Boolean
	}
})

const emit = defineEmits(['closeModal'])
</script>

<template>
	<Dialog>
		<DialogTrigger as-child>
			<Button>
				<Icon name="Plus" />
			</Button>
		</DialogTrigger>

		<DialogContent class="sm:max-w-[600px]">
			<DialogHeader>
				<DialogTitle>Ajouter un job</DialogTitle>
				<DialogDescription>
					Ajoutez les détails de l'offre d'emploi qui vous intéresse pour
					l’intégrer à votre tableau de Suivi des candidatures.
				</DialogDescription>
			</DialogHeader>

			<div class="grid gap-4">
				<div class="grid gap-1">
					<Label for="offer">Nom du poste</Label>
					<Input
						id="offer"
						value="Offre d'emploi"
						label="Offre"
						class="col-span-3"
					/>
				</div>
				<div class="grid gap-1">
					<Label for="company">Nom de l'entreprise</Label>
					<Input
						id="company"
						value="Offre d'emploi"
						label="Offre"
						class="col-span-3"
					/>
				</div>
			</div>

			<DialogFooter>
				<Button type="submit"> Ajouter ce job </Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
