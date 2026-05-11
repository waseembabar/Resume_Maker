<script setup lang="ts">
import { useResumeStore } from '../stores/resume.js'
import { useAuthStore } from '../stores/auth.js'

const userStore = useAuthStore()
const toast = useToast()

const store = useResumeStore()
const newSkill = ref('')
const isAutoSaving = ref(false)
const showTemplateModal = ref(false)
let autoSaveTimer: ReturnType<typeof setTimeout> | null = null

const templateCards = [
  { id: 'template-1', label: 'Split-Pane (Left)', desc: 'Left heavy sidebar, right experience column.' },
  { id: 'template-2', label: 'Split-Pane (Right)', desc: 'Right heavy sidebar, left experience focus.' },
  { id: 'template-3', label: 'Minimalist Grid (Swiss A)', desc: 'Whitespace-first grid with strong dividers.' },
  { id: 'template-4', label: 'Minimalist Grid (Swiss B)', desc: 'Swiss style with alternate hierarchy.' },
  { id: 'template-5', label: 'Asymmetric Creative A', desc: 'Offset sections with unconventional flow.' },
  { id: 'template-6', label: 'Asymmetric Creative B', desc: 'Asymmetric columns and reordered blocks.' },
  { id: 'template-7', label: 'Executive T-Shape A', desc: 'Full-width top summary + balanced columns.' },
  { id: 'template-8', label: 'Executive T-Shape B', desc: 'Dense executive structure with top panel.' },
  { id: 'template-9', label: 'Editorial Timeline', desc: 'Timeline-driven experience hierarchy.' },
  { id: 'template-10', label: 'Modular Cards', desc: 'Card-based modular information grouping.' }
]

const steps = [
  'personal',
  'experience',
  'education',
  'projects',
  'skills'
]

const isSaving = ref(false)

// async function nextStep() {
//   // Only attempt to save if the user is logged in (check your auth store)
//   // if (!authStore.isLoggedIn) return next()

//   isSaving.value = true

//   const success = await store.saveResumeData()

//   if (success) {
//     if (store.activeTabIndex < steps.length - 1) {
//       store.activeTabIndex++
//     }
//   } else {
//     // Optional: Use Nuxt UI Toast to show error
//     // toast.add({ title: 'Error saving data', color: 'red' })
//   }

//   isSaving.value = false
// }
function nextStep() {

  if (store.activeTabIndex < steps.length - 1) {

    store.activeTabIndex++

  }

}

function prevStep() {
  if (store.activeTabIndex > 0) {
    store.activeTabIndex--
  }
}

function goToStep(index: number) {
  if (index <= store.activeTabIndex) {
    store.activeTabIndex = index
  }
}

const addSkill = () => {
  if (newSkill.value.trim()) {
    store.skills.push(newSkill.value.trim())
    newSkill.value = ''
  }
}

function handleProfileImageUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) {
    return
  }
  if (!file.type.startsWith('image/')) {
    toast.add({ title: 'Invalid file', description: 'Please upload an image file.', color: 'red' })
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    store.personalInfo.profileImage = String(reader.result || '')
  }
  reader.readAsDataURL(file)
}

function selectTemplateFromModal(templateId: string) {
  store.selectedTemplateId = templateId
}

const resumePayload = computed(() => ({
  personalInfo: store.personalInfo,
  education: store.education,
  experience: store.experience,
  skills: store.skills,
  projects: store.projects
}))

function exportAsPdf() {
  if (!import.meta.client) {
    return
  }
  window.print()
}

async function autoSaveResume(showToast = false) {
  if (!userStore.user?.id) {
    return
  }
  isAutoSaving.value = true
  const ok = await store.saveResumeData(userStore.user.id)
  isAutoSaving.value = false
  if (showToast && ok) {
    toast.add({ title: 'Saved', description: 'Resume auto-saved successfully.' })
  }
}

watch(
  () => [store.personalInfo, store.experience, store.education, store.projects, store.skills, store.selectedTemplateId],
  () => {
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer)
    }
    autoSaveTimer = setTimeout(() => {
      autoSaveResume()
    }, 1000)
  },
  { deep: true }
)

async function generateResume() {
  try {
    const response = await $fetch('/api/resume/save', {
      method: 'POST',
      body: {
        userId: userStore.user?.id ?? 1,
        resumeId: store.resumeId,
        title: 'My Professional Resume',
        content: {
          ...resumePayload.value,
          templateId: store.selectedTemplateId
        }
      }
    })
    
    if (response?.resume?.id) {
      store.resumeId = response.resume.id
    }
    toast.add({ title: 'Success', description: response.message || 'Resume generated successfully.' })
  } catch (error: any) {
    toast.add({ title: 'Error', description: error?.statusMessage || error?.data?.statusMessage || 'Unable to generate resume.', color: 'red' })
  }
}
</script>

<template>
  <div class="w-full mx-auto px-4 py-6">

    <!-- HEADER -->
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold">Resume Builder</h1>
      <p class="text-gray-500">Fill details and see live preview</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

      <!-- LEFT SIDE -->
      <div class="w-full relative">
        <div
          v-if="showTemplateModal"
          class="absolute top-0 left-0 right-0 z-40"
        >
          <div class="rounded-2xl border bg-white dark:bg-gray-900 shadow-2xl p-4 mb-4">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-lg font-semibold">Choose Resume Template</h3>
              <UButton size="xs" color="gray" variant="soft" @click="showTemplateModal = false">
                Close
              </UButton>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[420px] overflow-auto pr-1">
              <button
                v-for="card in templateCards"
                :key="card.id"
                type="button"
                class="text-left rounded-xl border p-3 transition hover:shadow"
                :class="store.selectedTemplateId === card.id ? 'ring-2 ring-primary-500 border-primary-400' : 'border-gray-200 dark:border-gray-700'"
                @click="selectTemplateFromModal(card.id)"
              >
                <p class="font-semibold text-sm">{{ card.label }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ card.desc }}</p>
              </button>
            </div>
          </div>
        </div>

        <!-- STEP PROGRESS -->
        <div class="mb-6">

          <div class="flex justify-between mb-3">
            <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center cursor-pointer"
              @click="goToStep(index)">
              <div class="w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold transition-all"
                :class="[
                  store.activeTabIndex === index
                    ? 'bg-primary text-white'
                    : index < store.activeTabIndex
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                ]">
                {{ index + 1 }}
              </div>

              <p class="text-xs mt-1">{{ step }}</p>
            </div>
          </div>

          <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div class="h-full bg-primary transition-all"
              :style="{ width: ((store.activeTabIndex + 1) / steps.length) * 100 + '%' }"></div>
          </div>

        </div>

        <!-- PERSONAL -->
        <div v-if="store.activeTabIndex === 0">
          <div class="relative overflow-hidden px-4">

            <!-- Background Glow -->
            <div class="absolute -top-32 -right-32 w-96 h-96 bg-primary-500/10 blur-3xl rounded-full"></div>
            <div class="absolute bottom-0 left-0 w-72 h-72 bg-pink-500/10 blur-3xl rounded-full"></div>

            <div class="relative space-y-8">

              <!-- Header -->
              <div class="mt-4 mb-4">

                <h2 class="text-xl text-md-2xl font-black tracking-tight text-gray-900 dark:text-white">
                  Personal Information
                </h2>

                <p class="text-gray-500 pt-1">
                  Create a stunning first impression with a modern and professional profile.
                </p>
              </div>
              <!-- Identity Section -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

                <div>
                  <div class="flex items-center gap-3 mb-3">

                    <div>
                      <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                        Identity
                      </h3>
                      <p class="text-sm text-gray-500">
                        Your professional headline
                      </p>
                    </div>
                  </div>
                </div>

                <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <UFormGroup label="Profile Image" class="md:col-span-2">
                    <div class="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        class="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-500"
                        @change="handleProfileImageUpload"
                      >
                      <img
                        v-if="store.personalInfo.profileImage"
                        :src="store.personalInfo.profileImage"
                        alt="Profile Preview"
                        class="h-14 w-14 rounded-full object-cover border"
                      >
                    </div>
                  </UFormGroup>

                  <UFormGroup label="Full Name">
                    <UInput v-model="store.personalInfo.fullName" size="xl" placeholder="Waseem Babar"
                      icon="i-heroicons-user" color="primary" variant="outline" :ui="{
                        rounded: 'rounded-2xl',
                        padding: { xl: 'px-5 py-4' },
                        base: 'bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 transition-all shadow-sm hover:shadow-lg'
                      }" />
                  </UFormGroup>

                  <UFormGroup label="Job Title">
                    <UInput v-model="store.personalInfo.jobTitle" size="xl" placeholder="Senior Vue Developer"
                      icon="i-heroicons-briefcase" color="primary" variant="outline" :ui="{
                        rounded: 'rounded-2xl',
                        padding: { xl: 'px-5 py-4' },
                        base: 'bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 transition-all shadow-sm hover:shadow-lg'
                      }" />
                  </UFormGroup>

                </div>
              </div>

              <!-- Contact Section -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

                <div>
                  <div class="flex items-center gap-3 mb-3">


                    <div>
                      <h3 class="text-sm font-bold text-gray-900 dark:text-white">
                        Contact & Socials
                      </h3>
                      <p class="text-sm text-gray-500">
                        Ways recruiters can reach you
                      </p>
                    </div>
                  </div>
                </div>

                <div class="lg:col-span-2">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <UFormGroup label="Email Address">
                      <UInput v-model="store.personalInfo.email" icon="i-heroicons-envelope"
                        placeholder="hello@waseem.com" size="lg" :ui="{
                          rounded: 'rounded-2xl',
                          base: 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-400 transition-all'
                        }" />
                    </UFormGroup>

                    <UFormGroup label="Phone Number">
                      <UInput v-model="store.personalInfo.phone" icon="i-heroicons-phone" placeholder="+92 300..."
                        size="lg" :ui="{
                          rounded: 'rounded-2xl',
                          base: 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-400 transition-all'
                        }" />
                    </UFormGroup>

                    <UFormGroup label="Location">
                      <UInput v-model="store.personalInfo.location" icon="i-heroicons-map-pin"
                        placeholder="Islamabad, Pakistan" size="lg" :ui="{
                          rounded: 'rounded-2xl',
                          base: 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-400 transition-all'
                        }" />
                    </UFormGroup>

                    <UFormGroup label="GitHub URL">
                      <UInput v-model="store.personalInfo.github" icon="i-simple-icons-github"
                        placeholder="github.com/waseem" size="lg" :ui="{
                          rounded: 'rounded-2xl',
                          base: 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-400 transition-all'
                        }" />
                    </UFormGroup>

                    <UFormGroup label="Portfolio Website" class="md:col-span-2">
                      <UInput v-model="store.personalInfo.portfolio" icon="i-heroicons-globe-alt"
                        placeholder="www.yourportfolio.com" size="lg" :ui="{
                          rounded: 'rounded-2xl',
                          base: 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-400 transition-all'
                        }" />
                    </UFormGroup>

                  </div>
                </div>
              </div>

              <!-- About Section -->
              <div class=" ">
                <div class="flex flex-col mb-3">

                  <h3 class="text-sm font-bold text-gray-900 dark:text-white">
                    About Me
                  </h3>
                  <p class="text-sm text-gray-500">
                    A brief summary of your professional background and aspirations
                  </p>
                </div>
                <div class=" ">
                  <UTextarea v-model="store.personalInfo.aboutMe" :rows="10" class="w-full"
                    placeholder="Passionate Front-end Developer with expertise in Vue.js, Nuxt, and modern UI/UX design..." />

                </div>
              </div>

            </div>
          </div>

          <div class="flex justify-end mt-6">
            <UButton :loading="isSaving" @click="nextStep">
              {{ store.activeTabIndex === steps.length - 1 ? 'Finish' : 'Continue' }}
            </UButton>
          </div>
        </div>

        <!-- EXPERIENCE -->
        <div v-if="store.activeTabIndex === 1">
          <div class="mt-8 space-y-8">

            <!-- Header -->
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                  Work Experience
                </h3>

                <p class="text-sm text-gray-500 mt-1">
                  Add your professional work experience
                </p>
              </div>

              <UBadge color="primary" variant="soft" size="lg">
                {{ store.experience.length }} Added
              </UBadge>
            </div>

            <!-- Experience List -->
            <div class="space-y-6">

              <UCard v-for="(job, index) in store.experience" :key="index"
                class="relative overflow-hidden border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <!-- Header -->
                <template #header>
                  <div class="flex justify-end">

                    <!-- Delete -->
                    <UButton v-if="store.experience.length > 1" color="red" variant="soft" icon="i-heroicons-trash"
                      square @click="store.removeExperience(index)" />

                  </div>
                </template>

                <!-- Form -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <!-- Company Name -->
                  <UFormField label="Company Name" class="w-full">
                    <UInput v-model="job.company" size="lg" class="w-full" icon="i-heroicons-building-office"
                      placeholder="Google / Microsoft / Freelance" />
                  </UFormField>

                  <!-- Position -->
                  <UFormField label="Starting Position" class="w-full">
                    <UInput v-model="job.role" size="lg" class="w-full" icon="i-heroicons-briefcase"
                      placeholder="Front End Developer" />
                  </UFormField>

                  <!-- Start Date -->
                  <UFormField label="Start Date" class="w-full">
                    <UInput type="month" v-model="job.startDate" size="lg" class="w-full" />
                  </UFormField>

                  <!-- End Date -->
                  <UFormField label="End Date" class="w-full">
                    <UInput type="month" v-model="job.endDate" :disabled="job.isCurrent" size="lg" class="w-full" />
                  </UFormField>

                  <!-- Location -->
                  <UFormField label="Company Location" class="w-full">
                    <UInput v-model="job.location" size="lg" class="w-full" icon="i-heroicons-map-pin"
                      placeholder="City, Country" />
                  </UFormField>

                  <!-- Current Working -->
                  <UFormField label="Current Position" class="w-full">
                    <div
                      class="h-[34px] w-full flex items-center px-4 rounded-xl border border-gray-200 dark:border-gray-800">
                      <UCheckbox v-model="job.isCurrent" label="Currently Working" />
                    </div>
                  </UFormField>

                  <!-- Description -->
                  <UFormField label="Job Description" class="md:col-span-2 w-full">
                    <UTextarea v-model="job.description" :rows="5" autoresize class="w-full"
                      placeholder="Describe your responsibilities, achievements, technologies used, and key contributions..." />
                  </UFormField>

                </div>
              </UCard>

            </div>

            <!-- Add Experience -->
            <UButton block color="gray" variant="soft" icon="i-heroicons-plus"
              class="py-5 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition"
              @click="store.addExperience">
              Add New Experience
            </UButton>
          </div>

          <div class="flex justify-between mt-6">
            <UButton @click="prevStep">Back</UButton>
            <UButton :loading="isSaving" @click="nextStep">
              {{ store.activeTabIndex === steps.length - 1 ? 'Finish' : 'Continue' }}
            </UButton>
          </div>
        </div>

        <!-- EDUCATION -->
        <div v-if="store.activeTabIndex === 2">
          <div class="mt-8 space-y-8">

            <!-- Header -->
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                  Education
                </h3>

                <p class="text-sm text-gray-500 mt-1">
                  Add your educational background
                </p>
              </div>

              <UBadge color="primary" variant="soft" size="lg">
                {{ store.education.length }} Added
              </UBadge>
            </div>

            <!-- Education List -->
            <div class="space-y-6">

              <UCard v-for="(edu, index) in store.education" :key="index"
                class="relative overflow-hidden border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">


                <!-- Header -->
                <template #header>
                  <div class="flex items-center justify-end">
                    <UButton :disabled="store.education.length <= 1" color="red" variant="soft" icon="i-heroicons-trash"
                      square @click="store.removeEducation(index)" />

                  </div>
                </template>

                <!-- Form -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <!-- Institution -->
                  <UFormField label="School / University Name" class="w-full">
                    <UInput v-model="edu.institution" size="lg" class="w-full" icon="i-heroicons-building-library"
                      placeholder="Harvard University" />
                  </UFormField>

                  <!-- Location -->
                  <UFormField label="Location" class="w-full">
                    <UInput v-model="edu.location" size="lg" class="w-full" icon="i-heroicons-map-pin"
                      placeholder="City, Country" />
                  </UFormField>

                  <!-- Field -->
                  <UFormField label="Field of Study" class="w-full">
                    <UInput v-model="edu.field" size="lg" class="w-full" icon="i-heroicons-book-open"
                      placeholder="Computer Science" />
                  </UFormField>

                  <!-- Marks -->
                  <UFormField label="Marks / CGPA" class="w-full">
                    <UInput v-model="edu.marks" size="lg" class="w-full" icon="i-heroicons-star"
                      placeholder="3.8 CGPA / 85%" />
                  </UFormField>

                  <!-- Start Date -->
                  <UFormField label="Start Date" class="w-full">
                    <UInput type="month" v-model="edu.startDate" size="lg" class="w-full" />
                  </UFormField>

                  <!-- End Date -->
                  <UFormField label="End Date" class="w-full">
                    <UInput type="month" v-model="edu.endDate" :disabled="edu.isCurrent" size="lg" class="w-full" />
                  </UFormField>

                  <UFormField label="isCurrent Education" class="w-full">
                    <div
                      class="h-[34px] w-full flex items-center px-4 rounded-xl border border-gray-200 dark:border-gray-800">
                      <UCheckbox v-model="edu.isCurrent" label="Currently Studying" />
                    </div>
                  </UFormField>
                </div>

              </UCard>

            </div>

            <!-- Add Education -->
            <UButton block color="gray" variant="soft" icon="i-heroicons-plus"
              class="py-5 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition"
              @click="store.addEducation">
              Add Education
            </UButton>


          </div>

          <div class="flex justify-between mt-6">
            <UButton @click="prevStep">Back</UButton>
            <UButton :loading="isSaving" @click="nextStep">
              {{ store.activeTabIndex === steps.length - 1 ? 'Finish' : 'Continue' }}
            </UButton>
          </div>
        </div>

        <!-- PROJECTS -->
        <div v-if="store.activeTabIndex === 3">
          <div class="mt-8 space-y-8">

            <!-- Header -->
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                  Projects
                </h3>

                <p class="text-sm text-gray-500 mt-1">
                  Showcase your personal and professional projects
                </p>
              </div>

              <UBadge color="primary" variant="soft" size="lg">
                {{ store.projects.length }} Added
              </UBadge>
            </div>

            <!-- Projects List -->
            <div class="space-y-6">

              <UCard v-for="(project, index) in store.projects" :key="index"
                class="relative overflow-hidden border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">

                <!-- Top Border -->


                <!-- Header -->
                <template #header>
                  <div class="flex   justify-end">



                    <!-- Delete -->
                    <UButton color="red" variant="soft" icon="i-heroicons-trash" :disabled="store.projects.length === 1"
                      square @click="store.removeProject(index)" />

                  </div>
                </template>

                <!-- Form -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <!-- Project Name -->
                  <UFormField label="Project Name" class="w-full">
                    <UInput v-model="project.name" size="lg" class="w-full" icon="i-heroicons-folder"
                      placeholder="E-Commerce Website" />
                  </UFormField>

                  <!-- Company -->
                  <UFormField label="Company / Platform" class="w-full" help="Where you built this project">
                    <UInput v-model="project.company" size="lg" class="w-full" icon="i-heroicons-building-office-2"
                      placeholder="Freelance / Upwork / Company" />
                  </UFormField>

                  <!-- Start Date -->
                  <UFormField label="Start Date" class="w-full">
                    <UInput type="month" v-model="project.startDate" size="lg" class="w-full" />
                  </UFormField>

                  <!-- End Date -->
                  <UFormField label="End Date" class="w-full">
                    <UInput type="month" :disabled="project.isCurrent" v-model="project.endDate" size="lg"
                      class="w-full" />
                  </UFormField>
                  <!-- Current Working -->
                  <UFormField label="Current Working" class="w-full">
                    <div
                      class="h-[34px] w-full flex items-center px-4 rounded-xl border border-gray-200 dark:border-gray-800">
                      <UCheckbox v-model="project.isCurrent" label="Currently Working" />
                    </div>
                  </UFormField>
                  <!-- Tech Stack -->
                  <UFormField label="Tech Stack" class="md:col-span-2 w-full">
                    <UInput v-model="project.techStack" size="lg" class="w-full" icon="i-heroicons-command-line"
                      placeholder="Nuxt 3, Tailwind CSS, MySQL" />
                  </UFormField>

                  <!-- Description -->
                  <UFormField label="Project Description" class="md:col-span-2 w-full">
                    <UTextarea v-model="project.description" :rows="5" autoresize class="w-full"
                      placeholder="Describe your project features, goals, technologies used, and achievements..." />
                  </UFormField>

                </div>

              </UCard>

            </div>

            <!-- Add Project -->
            <UButton block color="gray" variant="soft" icon="i-heroicons-plus"
              class="py-5 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition"
              @click="store.addProject">
              Add Project
            </UButton>


          </div>

          <div class="flex justify-between mt-6">
            <UButton @click="prevStep">Back</UButton>
            <UButton :loading="isSaving" @click="nextStep">
              {{ store.activeTabIndex === steps.length - 1 ? 'Finish' : 'Continue' }}
            </UButton>

          </div>
        </div>

        <!-- SKILLS -->
        <div v-if="store.activeTabIndex === 4">
          <UCard class="mt-6 shadow-sm border-gray-200">
            <div class="space-y-6">
              <UFormGroup label="Expertise & Skills" help="Type a skill (e.g., JavaScript) and press Add or Enter">
                <div class="flex gap-2">
                  <UInput v-model="newSkill" class="flex-1" placeholder="e.g. Nuxt.js" size="lg"
                    @keyup.enter="addSkill" />
                  <UButton size="lg" icon="i-heroicons-plus" @click="addSkill">Add</UButton>
                </div>
              </UFormGroup>

              <div
                class="flex flex-wrap gap-3 mt-4 min-h-[80px] p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300">
                <UBadge v-for="(skill, i) in store.skills" :key="i" size="lg" class="px-4 py-2 flex items-center gap-2">
                  {{ skill }}
                  <UIcon name="i-heroicons-x-mark" class="cursor-pointer hover:text-red-300"
                    @click="store.skills.splice(i, 1)" />
                </UBadge>
                <p v-if="store.skills.length === 0" class="text-gray-400 text-sm italic w-full text-center">No skills
                  added yet.
                  Start typing above!</p>
              </div>

              <div class="flex justify-between mt-8 pt-6 border-t">
                <UButton color="white" size="lg" @click="store.activeTabIndex--">Back</UButton>
                <div class="flex gap-2">
                  <UButton color="gray" variant="soft" size="lg" @click="exportAsPdf">
                    Export PDF
                  </UButton>
                  <UButton color="primary" size="xl" class="px-12 font-bold shadow-lg" @click="generateResume">
                    Generate Final Resume
                  </UButton>
                </div>
              </div>
            </div>
          </UCard>

        </div>

      </div>

      <!-- RIGHT SIDE PREVIEW -->
      <div
        class="sticky top-6 h-[calc(100vh-3rem)] overflow-auto bg-white dark:bg-gray-900 border rounded-2xl p-6 shadow-lg">
        <div class="flex flex-wrap justify-between gap-2 mb-3">
          <UBadge :color="isAutoSaving ? 'amber' : 'green'" variant="soft">
            {{ isAutoSaving ? 'Auto-saving...' : 'Auto-save enabled' }}
          </UBadge>
          <div class="flex gap-2">
            <UButton to="/resumes" size="xs" variant="soft" color="primary">
              My Resumes
            </UButton>
            <UButton size="xs" variant="soft" color="gray" @click="autoSaveResume(true)">
              Save Now
            </UButton>
          </div>
        </div>
        <ResumeTemplateSelector
          v-model="store.selectedTemplateId"
          @view-all="showTemplateModal = true"
        />
        <ResumeLivePreview
          :template-id="store.selectedTemplateId"
          :resume="resumePayload"
        />
      </div>

    </div>
  </div>
</template>