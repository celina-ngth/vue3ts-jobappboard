<script lang="ts" setup>
import { PropType, reactive, ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Icon from '@/components/ui/Icon.vue'
import { Job, JobStatus } from '@/api/jobs/types'
import { useJobs } from '@/composables/useJobs'
import { toast } from 'vue-sonner'

const { addJobMutation } = useJobs()

const props = defineProps({
	status: {
		type: String as PropType<JobStatus>
	}
})

const newJob = reactive<Job>({
	id: Date.now().toString(),
	title: '',
	company: '',
	status: props.status
})

const open = ref(false)

const onSubmit = () => {
	addJobMutation.mutate(newJob)
	toast.success(`Added ${newJob.title} to board`)
	open.value = false
}
</script>

<template>
	<Dialog v-model:open="open">
		<Button @click="open = true">
			<Icon name="Plus" />
		</Button>

		<DialogContent class="sm:max-w-[600px]">
			<form
				:id="`add-job-${status}`"
				@submit.prevent="onSubmit"
				class="grid gap-4"
			>
				<DialogHeader>
					<DialogTitle>Ajouter un job</DialogTitle>
					<DialogDescription>
						Ajoutez les détails de l'offre d'emploi qui vous intéresse pour
						l’intégrer à votre Dashboard de suivi des candidatures.
					</DialogDescription>
				</DialogHeader>

				<div class="grid gap-2">
					<Label for="offer">Nom du poste {{ newJob.title }}</Label>
					<Input v-model="newJob.title" id="offer" />
				</div>

				<div class="grid gap-2">
					<Label for="company">Entreprise {{ newJob.company }}</Label>
					<Input v-model="newJob.company" id="company" />
				</div>

				<DialogFooter>
					<Button :for="`add-job-${status}`" type="button" @click="onSubmit">
						Ajouter cette offre
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>
</template>
