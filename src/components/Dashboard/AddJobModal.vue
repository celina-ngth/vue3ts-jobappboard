<script lang="ts" setup>
import { PropType, reactive } from 'vue'
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
import { Job, JobStatus } from '@/api/jobs/types'

const props = defineProps({
	openModal: {
		type: Boolean
	},
	status: {
		type: String as PropType<JobStatus>
	}
})

const emit = defineEmits(['closeModal'])

const offer = reactive<Job>({
	id: Date.now().toString(),
	title: '',
	company: '',
	status: props.status
})

const onSubmit = () => {
	console.log(offer)
}
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
					l’intégrer à votre Dashboard de suivi des candidatures.
				</DialogDescription>
			</DialogHeader>

			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="offer">Nom du poste {{ offer.title }}</Label>
					<Input v-model="offer.title" id="offer" />
				</div>
				<div class="grid gap-2">
					<Label for="company">Entreprise {{ offer.company }}</Label>
					<Input v-model="offer.company" id="company" />
				</div>
			</div>

			<DialogFooter>
				<Button type="submit" @click="onSubmit">Ajouter cette offre</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
