<script setup lang="ts">
const auth = useAuthStore()
const store = useResumeStore()
const toast = useToast()

const loading = ref(false)
const resumes = ref<any[]>([])
const deletingId = ref<number | null>(null)

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
      description: error?.data?.statusMessage || error?.statusMessage || 'Failed to load resumes.',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}

function formatDate(value: string) {
  return new Date(value).toLocaleString()
}

async function editResume(resume: any) {
  const content = resume.content || {}
  store.loadResumeData(content, { resumeId: resume.id })
  await navigateTo('/')
}

async function deleteResume(resume: any) {
  if (!import.meta.client) {
    return
  }

  const confirmed = window.confirm(`Delete "${resume.title || 'Untitled Resume'}"?`)
  if (!confirmed) {
    return
  }

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

    resumes.value = resumes.value.filter(item => item.id !== resume.id)
    toast.add({
      title: 'Deleted',
      description: 'Resume deleted successfully.',
      color: 'green'
    })
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error?.data?.statusMessage || error?.statusMessage || 'Failed to delete resume.',
      color: 'red'
    })
  } finally {
    deletingId.value = null
  }
}

onMounted(fetchResumes)
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold">My Saved Resumes</h1>
        <p class="text-sm text-gray-500">Open any resume and continue editing with live templates.</p>
      </div>
      <UButton to="/" color="primary" variant="soft">
        Back to Builder
      </UButton>
    </div>

    <div v-if="loading" class="py-8 text-center text-sm text-gray-500">
      Loading resumes...
    </div>

    <div v-else-if="!resumes.length" class="py-8 text-center text-sm text-gray-500">
      No resumes saved yet.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UCard v-for="resume in resumes" :key="resume.id">
        <div class="space-y-2">
          <h2 class="font-semibold text-lg">
            {{ resume.title || 'Untitled Resume' }}
          </h2>
          <p class="text-xs text-gray-500">
            Saved: {{ formatDate(resume.createdAt) }}
          </p>
          <p class="text-sm text-gray-600 line-clamp-2">
            Template: {{ resume.content?.templateId || 'template-1' }}
          </p>
          <div class="pt-2 flex gap-2">
            <UButton size="sm" color="primary" @click="editResume(resume)">
              Edit & Load
            </UButton>
            <UButton
              size="sm"
              color="red"
              variant="soft"
              :loading="deletingId === resume.id"
              @click="deleteResume(resume)"
            >
              Delete
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
