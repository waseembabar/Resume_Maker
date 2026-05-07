 <script setup lang="ts">
import { useResumeStore } from '../stores/resume.js'

const store = useResumeStore()
const newSkill = ref('')
const ActiveTab = computed(() => store.activeTabIndex)
// Define the tabs structure
const items = [
  { slot: 'personal', label: '1. Personal', icon: 'i-heroicons-user' },
  { slot: 'experience', label: '2. Experience', icon: 'i-heroicons-briefcase' },
  { slot: 'education', label: '3. Education', icon: 'i-heroicons-academic-cap' },
  { slot: 'projects', label: '4. Projects', icon: 'i-heroicons-folder' },
  { slot: 'skills', label: '5. Skills', icon: 'i-heroicons-bolt' }
]

// Navigation logic
function nextStep() {
  if (ActiveTab.value < items.length - 1) {
    ActiveTab.value++
  }
}

// Skills logic
const addSkill = () => {
  if (newSkill.value.trim()) {
    store.skills.push(newSkill.value.trim())
    newSkill.value = ''
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 lg:p-8">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Resume Builder</h1>
      <p class="text-gray-500 mt-2">Fill in your details to generate a professional CV {{ store.activeTabIndex }}
         {{ store.unlockedTabs }}
      </p>
    </div>

    <UTabs v-model="store.activeTabIndex" :items="items" class="w-full">
      
      <template #personal>
  <div class="relative overflow-hidden">
    
    <!-- Background Glow -->
    <div class="absolute -top-32 -right-32 w-96 h-96 bg-primary-500/10 blur-3xl rounded-full"></div>
    <div class="absolute bottom-0 left-0 w-72 h-72 bg-pink-500/10 blur-3xl rounded-full"></div>

    <div class="relative space-y-8">

      <!-- Header -->
      <div class="text-center mb-10">
        

        <h2 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
          Personal Information
        </h2>

        <p class="text-gray-500 mt-3 max-w-2xl mx-auto">
          Create a stunning first impression with a modern and professional profile.
        </p>
      </div>

      <!-- Main Card -->
      <div class="bg-white/80 dark:bg-gray-900/70 backdrop-blur-2xl border border-white/20 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden">

        <!-- Top Gradient -->
        <div class="h-2 bg-gradient-to-r from-primary-500 via-pink-500 to-purple-500"></div>

        <div class="p-8 lg:p-10 space-y-12">

          <!-- Identity Section -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

            <div>
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center">
                  <UIcon name="i-heroicons-user-circle" class="w-6 h-6 text-primary-600" />
                </div>

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

              <UFormGroup label="Full Name">
                <UInput
                  v-model="store.personalInfo.fullName"
                  size="xl"
                  placeholder="Waseem Babar"
                  icon="i-heroicons-user"
                  color="primary"
                  variant="outline"
                  :ui="{
                    rounded: 'rounded-2xl',
                    padding: { xl: 'px-5 py-4' },
                    base: 'bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 transition-all shadow-sm hover:shadow-lg'
                  }"
                />
              </UFormGroup>

              <UFormGroup label="Job Title">
                <UInput
                  v-model="store.personalInfo.jobTitle"
                  size="xl"
                  placeholder="Senior Vue Developer"
                  icon="i-heroicons-briefcase"
                  color="primary"
                  variant="outline"
                  :ui="{
                    rounded: 'rounded-2xl',
                    padding: { xl: 'px-5 py-4' },
                    base: 'bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 transition-all shadow-sm hover:shadow-lg'
                  }"
                />
              </UFormGroup>

            </div>
          </div>

          <!-- Contact Section -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

            <div>
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center">
                  <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-pink-500" />
                </div>

                <div>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white">
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
                  <UInput
                    v-model="store.personalInfo.email"
                    icon="i-heroicons-envelope"
                    placeholder="hello@waseem.com"
                    size="lg"
                    :ui="{
                      rounded: 'rounded-2xl',
                      base: 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-400 transition-all'
                    }"
                  />
                </UFormGroup>

                <UFormGroup label="Phone Number">
                  <UInput
                    v-model="store.personalInfo.phone"
                    icon="i-heroicons-phone"
                    placeholder="+92 300..."
                    size="lg"
                    :ui="{
                      rounded: 'rounded-2xl',
                      base: 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-400 transition-all'
                    }"
                  />
                </UFormGroup>

                <UFormGroup label="Location">
                  <UInput
                    v-model="store.personalInfo.location"
                    icon="i-heroicons-map-pin"
                    placeholder="Islamabad, Pakistan"
                    size="lg"
                    :ui="{
                      rounded: 'rounded-2xl',
                      base: 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-400 transition-all'
                    }"
                  />
                </UFormGroup>

                <UFormGroup label="GitHub URL">
                  <UInput
                    v-model="store.personalInfo.github"
                    icon="i-simple-icons-github"
                    placeholder="github.com/waseem"
                    size="lg"
                    :ui="{
                      rounded: 'rounded-2xl',
                      base: 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-400 transition-all'
                    }"
                  />
                </UFormGroup>

                <UFormGroup label="Portfolio Website" class="md:col-span-2">
                  <UInput
                    v-model="store.personalInfo.portfolio"
                    icon="i-heroicons-globe-alt"
                    placeholder="www.yourportfolio.com"
                    size="lg"
                    :ui="{
                      rounded: 'rounded-2xl',
                      base: 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-400 transition-all'
                    }"
                  />
                </UFormGroup>

              </div>
            </div>
          </div>

          <!-- About Section -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

            <div>
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <UIcon name="i-heroicons-document-text" class="w-6 h-6 text-purple-500" />
                </div>

                <div>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                    About You
                  </h3>
                  <p class="text-sm text-gray-500">
                    A short professional summary
                  </p>
                </div>
              </div>
            </div>

            <div class="lg:col-span-2">

              <UFormGroup label="Professional Summary">
                <UTextarea
                  v-model="store.personalInfo.aboutMe"
                  :rows="7"
                  placeholder="Passionate Front-end Developer with expertise in Vue.js, Nuxt, and modern UI/UX design..."
                  :ui="{
                    rounded: 'rounded-3xl',
                    base: 'bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 shadow-sm hover:shadow-lg transition-all p-4'
                  }"
                />

                <template #hint>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-xs text-gray-400">
                      Recommended: 200-400 characters
                    </span>

                    <span class="text-xs font-medium text-primary-500">
                      {{ store.personalInfo.aboutMe?.length || 0 }}/400
                    </span>
                  </div>
                </template>
              </UFormGroup>

            </div>
          </div>

        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="sticky bottom-4 z-20">
        <div class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border border-white/20 dark:border-gray-800 shadow-2xl rounded-3xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center shadow-lg">
              <UIcon name="i-heroicons-check-badge" class="w-7 h-7 text-white" />
            </div>

            <div>
              <h4 class="font-bold text-gray-900 dark:text-white">
                Looking Professional ✨
              </h4>

              <p class="text-sm text-gray-500">
                Your profile is becoming recruiter-ready.
              </p>
            </div>
          </div>

          <UButton
            size="xl"
            color="primary"
            trailing-icon="i-heroicons-arrow-right"
            class="px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all duration-300"
            @click="nextStep"
          >
            Continue
          </UButton>

        </div>
      </div>

    </div>
  </div>
</template>

      <template #experience>
        <div class="mt-6 space-y-6">
          <div v-for="(job, index) in store.experience" :key="index">
            <UCard class="relative shadow-sm border-gray-200">
              <template #header>
                <div class="flex justify-between items-center">
                  <span class="font-bold text-primary">Job Position #{{ index + 1 }}</span>
                  <UButton v-if="store.experience.length > 1" color="red" variant="soft" icon="i-heroicons-trash" @click="store.removeExperience(index)" />
                </div>
              </template>
              
              <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
                <UFormGroup label="Company Name" class="md:col-span-3"><UInput v-model="job.company" size="lg" placeholder="Google / Freelance" /></UFormGroup>
                <UFormGroup label="Job Position" class="md:col-span-3"><UInput v-model="job.role" size="lg" placeholder="Front End Developer" /></UFormGroup>
                <UFormGroup label="Start Date" class="md:col-span-2"><UInput type="month" v-model="job.startDate" size="lg" /></UFormGroup>
                <UFormGroup label="End Date" class="md:col-span-2"><UInput type="month" v-model="job.endDate" :disabled="job.isCurrent" size="lg" /></UFormGroup>
                <UFormGroup label="Company Location" class="md:col-span-2"><UInput v-model="job.location" size="lg" placeholder="City, Country" /></UFormGroup>
                <UFormGroup label="Job Description" class="md:col-span-6"><UTextarea v-model="job.description" :rows="3" placeholder="Describe your responsibilities..." /></UFormGroup>
                <div class="md:col-span-6"><UCheckbox v-model="job.isCurrent" label="I currently work here" /></div>
              </div>
            </UCard>
          </div>
          <UButton block label="Add New Experience" icon="i-heroicons-plus" color="gray" variant="dashed" class="py-4" @click="store.addExperience" />
          <div class="flex justify-between mt-8"><UButton color="white" icon="i-heroicons-arrow-left" @click="store.activeTabIndex--">Back</UButton><UButton @click="nextStep">Continue</UButton></div>
        </div>
      </template>

      <template #education>
        <div class="mt-6 space-y-6">
          <div v-for="(edu, index) in store.education" :key="index">
            <UCard class="shadow-sm border-gray-200">
              <template #header>
                <div class="flex justify-between items-center">
                  <span class="font-bold text-primary">Education #{{ index + 1 }}</span>
                  <UButton v-if="store.education.length > 1" color="red" variant="soft" icon="i-heroicons-trash" @click="store.removeEducation(index)" />
                </div>
              </template>
              <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
                <UFormGroup label="School/University Name" class="md:col-span-4"><UInput v-model="edu.institution" size="lg" /></UFormGroup>
                <UFormGroup label="Location" class="md:col-span-2"><UInput v-model="edu.location" size="lg" /></UFormGroup>
                <UFormGroup label="Field of Study" class="md:col-span-3"><UInput v-model="edu.field" size="lg" /></UFormGroup>
                <UFormGroup label="Marks / CGPA" class="md:col-span-3"><UInput v-model="edu.marks" size="lg" /></UFormGroup>
                <UFormGroup label="Start Date" class="md:col-span-3"><UInput type="month" v-model="edu.startDate" size="lg" /></UFormGroup>
                <UFormGroup label="End Date" class="md:col-span-3"><UInput type="month" v-model="edu.endDate" size="lg" /></UFormGroup>
              </div>
            </UCard>
          </div>
          <UButton block label="Add Education" icon="i-heroicons-plus" color="gray" variant="dashed" class="py-4" @click="store.addEducation" />
          <div class="flex justify-between mt-8"><UButton color="white" @click="store.activeTabIndex--">Back</UButton><UButton @click="nextStep">Continue</UButton></div>
        </div>
      </template>

      <template #projects>
        <div class="mt-6 space-y-6">
          <div v-for="(project, index) in store.projects" :key="index">
            <UCard class="shadow-sm border-gray-200">
              <template #header>
                <div class="flex justify-between items-center">
                  <span class="font-bold text-primary">Project #{{ index + 1 }}</span>
                  <UButton v-if="store.projects.length > 1" color="red" variant="soft" icon="i-heroicons-trash" @click="store.removeProject(index)" />
                </div>
              </template>
              <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
                <UFormGroup label="Project Name" class="md:col-span-3"><UInput v-model="project.name" size="lg" /></UFormGroup>
                <UFormGroup label="Company/Platform" class="md:col-span-3" help="Where you built this"><UInput v-model="project.company" size="lg" /></UFormGroup>
                <UFormGroup label="Start Date" class="md:col-span-3"><UInput type="month" v-model="project.startDate" size="lg" /></UFormGroup>
                <UFormGroup label="End Date" class="md:col-span-3"><UInput type="month" v-model="project.endDate" size="lg" /></UFormGroup>
                <UFormGroup label="Tech Stack" class="md:col-span-6"><UInput v-model="project.techStack" placeholder="Nuxt 3, Tailwind CSS, MySQL" size="lg" /></UFormGroup>
                <UFormGroup label="Project Description" class="md:col-span-6"><UTextarea v-model="project.description" :rows="3" /></UFormGroup>
              </div>
            </UCard>
          </div>
          <UButton block label="Add Project" icon="i-heroicons-plus" color="gray" variant="dashed" class="py-4" @click="store.addProject" />
          <div class="flex justify-between mt-8"><UButton color="white" @click="store.activeTabIndex--">Back</UButton><UButton @click="nextStep">Continue</UButton></div>
        </div>
      </template>

      <template #skills>
        <UCard class="mt-6 shadow-sm border-gray-200">
          <div class="space-y-6">
            <UFormGroup label="Expertise & Skills" help="Type a skill (e.g., JavaScript) and press Add or Enter">
              <div class="flex gap-2">
                <UInput v-model="newSkill" class="flex-1" placeholder="e.g. Nuxt.js" size="lg" @keyup.enter="addSkill" />
                <UButton size="lg" icon="i-heroicons-plus" @click="addSkill">Add</UButton>
              </div>
            </UFormGroup>
            
            <div class="flex flex-wrap gap-3 mt-4 min-h-[120px] p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300">
              <UBadge v-for="(skill, i) in store.skills" :key="i" size="lg" class="px-4 py-2 flex items-center gap-2">
                {{ skill }}
                <UIcon name="i-heroicons-x-mark" class="cursor-pointer hover:text-red-300" @click="store.skills.splice(i, 1)" />
              </UBadge>
              <p v-if="store.skills.length === 0" class="text-gray-400 text-sm italic w-full text-center">No skills added yet. Start typing above!</p>
            </div>

            <div class="flex justify-between mt-8 pt-6 border-t">
              <UButton color="white" size="lg" @click="store.activeTabIndex--">Back</UButton>
              <UButton color="primary" size="xl" class="px-12 font-bold shadow-lg">Generate Final Resume</UButton>
            </div>
          </div>
        </UCard>
      </template>

    </UTabs>
  </div>
</template>


