 <script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useResumeStore } from '~/stores/resume'

const auth = useAuthStore()
const store = useResumeStore()
const toast = useToast()

const loading = ref(true)
const resumes = ref<any[]>([])
const deletingId = ref<number | null>(null)

// Modal State
const isDeleteModalOpen = ref(false)
const selectedResume = ref<any>(null)

// Fetch Resumes
async function fetchResumes() {
  try {
    loading.value = true

    const userId = auth.user?.id ?? 1

    const response = await $fetch('/api/resume/list', {
      query: { userId }
    })

    resumes.value = response.resumes || []
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description:
        error?.data?.statusMessage ||
        error?.statusMessage ||
        'Failed to load resumes.',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}

// Format Date
function formatDate(value: string) {
  return new Date(value).toLocaleString()
}

// Edit Resume
async function editResume(resume: any) {
  const content = resume.content || {}

  store.loadResumeData(content, {
    resumeId: resume.id
  })

  await navigateTo('/')
}

// Open Delete Modal
function confirmDelete(resume: any) {
  console.log('Selected Resume for Deletion:', isDeleteModalOpen.value)
  
  selectedResume.value = resume
  isDeleteModalOpen.value = true
  console.log('After Update the Value to open  Deletion:', isDeleteModalOpen.value)


}

// Confirm Delete
async function handleConfirmDelete() {
  if (!selectedResume.value || deletingId.value) return

  const resume = selectedResume.value

  try {
    deletingId.value = resume.id

    const userId = auth.user?.id ?? 1

    await $fetch('/api/resume/delete', {
      method: 'POST',
      body: {
        id: resume.id,
        userId
      }
    })

    resumes.value = resumes.value.filter(
      item => item.id !== resume.id
    )

    toast.add({
      title: 'Deleted',
      description: 'Resume deleted successfully.',
      color: 'success'
    })

    isDeleteModalOpen.value = false
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description:
        error?.data?.statusMessage ||
        error?.statusMessage ||
        'Failed to delete resume.',
      color: 'error'
    })
  } finally {
    deletingId.value = null
    selectedResume.value = null
  }
}

onMounted(fetchResumes)
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold">
          My Saved Resumes
        </h1>

        <p class="text-sm text-gray-500">
          Open any resume and continue editing with live templates.
        </p>
      </div>

      <UButton
        to="/"
        color="neutral"
        variant="soft"
        icon="i-heroicons-arrow-left"
      >
        Back to Builder
      </UButton>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="py-8 text-center text-sm text-gray-500"
    >
      <UIcon
        name="i-heroicons-arrow-path"
        class="animate-spin mr-2"
      />

      Loading resumes...
    </div>

    <!-- Empty -->
    <div
      v-else-if="!resumes.length"
      class="py-8 text-center text-sm text-gray-500"
    >
      No resumes saved yet.
    </div>

    <!-- Resume Grid -->
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <UCard
        v-for="resume in resumes"
        :key="resume.id"
      >
        <div class="space-y-2">

          <h2 class="font-semibold text-lg">
            {{ resume.title || 'Untitled Resume' }}
          </h2>

          <p class="text-xs text-gray-500">
            Saved: {{ formatDate(resume.createdAt) }}
          </p>

          <p class="text-sm text-gray-600 line-clamp-2">
            Template:
            {{ resume.content?.templateId || 'template-1' }}
          </p>

          <div class="pt-2 flex gap-2">

            <!-- Edit -->
            <UButton
              size="sm"
              color="primary"
              @click="editResume(resume)"
            >
              Edit & Load
            </UButton>

            <!-- Delete -->
            <UButton
              size="sm"
              color="error"
              variant="soft"
              :loading="deletingId === resume.id"
              @click="confirmDelete(resume)"
            >
              Delete
            </UButton>

          </div>
        </div>
      </UCard>
    </div>

    <!-- DELETE MODAL -->
    <UModal
      v-model:open="isDeleteModalOpen"
      :dismissible="false"
      title="Delete Resume"
    >
      <template #body>
        <p class="text-sm text-gray-600">
          Are you sure you want to delete

          <strong>
            "{{ selectedResume?.title || 'Untitled Resume' }}"
          </strong>

          ?

          This action cannot be undone.
        </p>
      </template>

      <template #footer>
        <div class="flex justify-end gap-3">

          <UButton
            label="Cancel"
            color="neutral"
            variant="ghost"
            @click="isDeleteModalOpen = false"
          />

          <UButton
            label="Confirm Delete"
            color="error"
            :loading="deletingId !== null"
            @click="handleConfirmDelete"
          />

        </div>
      </template>
    </UModal>

  </div>
</template>