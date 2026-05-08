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


function generateResume() {
  // Here you would typically send the data to your backend or generate a PDF
  // For this example, we'll just log the store data to the console
  console.log('Generating Resume with the following data:', {
    personalInfo: store.personalInfo,
    experience: store.experience,
    education: store.education,
    projects: store.projects,
    skills: store.skills
  })
  alert('Resume generated! Check the console for the output.')
}
</script>

<template>
  <div class="max-w-4xl mx-auto ">
    <div class="mb-8 text-center">
      <h1 class="text-2xl text-md-3xl font-bold text-gray-900 dark:text-white mt-2">Resume Builder</h1>
      <p class="text-gray-500 mt-2">Fill in your details to generate a professional CV 
      </p>
    </div>

    <UTabs v-model="store.activeTabIndex" :items="items" class="w-full px-4">
      
      <template #personal>
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

      <!-- Main Card -->
      <div> 

        <div class="">

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
                <UTextarea
                  v-model="store.personalInfo.aboutMe"
                  :rows="10"
                  class="w-full"
                  placeholder="Passionate Front-end Developer with expertise in Vue.js, Nuxt, and modern UI/UX design..."
                />

            </div>
          </div>

        </div>
      </div>
      <div class="flex justify-end mt-8 mb-5 "><UButton @click="nextStep">Continue</UButton></div>

      <!-- Bottom CTA -->
    

    </div>
  </div>
</template>

      <template #experience>
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

      <UBadge
        color="primary"
        variant="soft"
        size="lg"
      >
        {{ store.experience.length }} Added
      </UBadge>
    </div>

    <!-- Experience List -->
    <div class="space-y-6">

      <UCard
        v-for="(job, index) in store.experience"
        :key="index"
        class="relative overflow-hidden border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <!-- Header -->
        <template #header>
          <div class="flex justify-end">

            <!-- Delete -->
            <UButton
              v-if="store.experience.length > 1"
              color="red"
              variant="soft"
              icon="i-heroicons-trash"
              square
              @click="store.removeExperience(index)"
            />

          </div>
        </template>

        <!-- Form -->
       <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

  <!-- Company Name -->
  <UFormField
    label="Company Name"
    class="w-full"
  >
    <UInput
      v-model="job.company"
      size="lg"
      class="w-full"
      icon="i-heroicons-building-office"
      placeholder="Google / Microsoft / Freelance"
    />
  </UFormField>

  <!-- Position -->
  <UFormField
    label="Starting Position"
    class="w-full"
  >
    <UInput
      v-model="job.role"
      size="lg"
      class="w-full"
      icon="i-heroicons-briefcase"
      placeholder="Front End Developer"
    />
  </UFormField>

  <!-- Start Date -->
  <UFormField
    label="Start Date"
    class="w-full"
  >
    <UInput
      type="month"
      v-model="job.startDate"
      size="lg"
      class="w-full"
    />
  </UFormField>

  <!-- End Date -->
  <UFormField
    label="End Date"
    class="w-full"
  >
    <UInput
      type="month"
      v-model="job.endDate"
      :disabled="job.isCurrent"
      size="lg"
      class="w-full"
    />
  </UFormField>

  <!-- Location -->
  <UFormField
    label="Company Location"
    class="w-full"
  >
    <UInput
      v-model="job.location"
      size="lg"
      class="w-full"
      icon="i-heroicons-map-pin"
      placeholder="City, Country"
    />
  </UFormField>

  <!-- Current Working -->
  <UFormField
    label="Current Position"
    class="w-full"
  >
    <div class="h-[34px] w-full flex items-center px-4 rounded-xl border border-gray-200 dark:border-gray-800">
      <UCheckbox
        v-model="job.isCurrent"
        label="Currently Working"
      />
    </div>
  </UFormField>

  <!-- Description -->
  <UFormField
    label="Job Description"
    class="md:col-span-2 w-full"
  >
    <UTextarea
      v-model="job.description"
      :rows="5"
      autoresize
      class="w-full"
      placeholder="Describe your responsibilities, achievements, technologies used, and key contributions..."
    />
  </UFormField>

</div>
      </UCard>

    </div>

    <!-- Add Experience -->
    <UButton
      block
      color="gray"
      variant="soft"
      icon="i-heroicons-plus"
      class="py-5 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition"
      @click="store.addExperience"
    >
      Add New Experience
    </UButton>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-4">

      <UButton
        color="white"
        size="lg"
        icon="i-heroicons-arrow-left"
        @click="store.activeTabIndex--"
      >
        Back
      </UButton>

      <UButton
        size="lg"
        trailing-icon="i-heroicons-arrow-right"
        @click="nextStep"
      >
        Continue
      </UButton>

    </div>

  </div>
</template>

       <template #education>
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

      <UBadge
        color="primary"
        variant="soft"
        size="lg"
      >
        {{ store.education.length }} Added
      </UBadge>
    </div>

    <!-- Education List -->
    <div class="space-y-6">

      <UCard
        v-for="(edu, index) in store.education"
        :key="index"
        class="relative overflow-hidden border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
      >
 

        <!-- Header -->
        <template #header>
          <div class="flex items-center justify-end"> 
            <UButton
            :disabled="store.education.length <= 1" 
              color="red"
              variant="soft"
              icon="i-heroicons-trash"
              square
              @click="store.removeEducation(index)"
            />

          </div>
        </template>

        <!-- Form -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <!-- Institution -->
          <UFormField
            label="School / University Name"
            class="w-full"
          >
            <UInput
              v-model="edu.institution"
              size="lg"
              class="w-full"
              icon="i-heroicons-building-library"
              placeholder="Harvard University"
            />
          </UFormField>

          <!-- Location -->
          <UFormField
            label="Location"
            class="w-full"
          >
            <UInput
              v-model="edu.location"
              size="lg"
              class="w-full"
              icon="i-heroicons-map-pin"
              placeholder="City, Country"
            />
          </UFormField>

          <!-- Field -->
          <UFormField
            label="Field of Study"
            class="w-full"
          >
            <UInput
              v-model="edu.field"
              size="lg"
              class="w-full"
              icon="i-heroicons-book-open"
              placeholder="Computer Science"
            />
          </UFormField>

          <!-- Marks -->
          <UFormField
            label="Marks / CGPA"
            class="w-full"
          >
            <UInput
              v-model="edu.marks"
              size="lg"
              class="w-full"
              icon="i-heroicons-star"
              placeholder="3.8 CGPA / 85%"
            />
          </UFormField>

          <!-- Start Date -->
          <UFormField
            label="Start Date"
            class="w-full"
          >
            <UInput
              type="month"
              v-model="edu.startDate"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <!-- End Date -->
          <UFormField
            label="End Date"
            class="w-full"
          >
            <UInput
              type="month"
              v-model="edu.endDate"
               :disabled="edu.isCurrent"
              size="lg"
              class="w-full"
            />
          </UFormField>

           <UFormField
    label="isCurrent Education"
    class="w-full"
  >
    <div class="h-[34px] w-full flex items-center px-4 rounded-xl border border-gray-200 dark:border-gray-800">
      <UCheckbox
        v-model="edu.isCurrent"
        label="Currently Studying"
      />
    </div>
  </UFormField>
        </div>

      </UCard>

    </div>

    <!-- Add Education -->
    <UButton
      block
      color="gray"
      variant="soft"
      icon="i-heroicons-plus"
      class="py-5 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition"
      @click="store.addEducation"
    >
      Add Education
    </UButton>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-4">

      <UButton
        color="white"
        size="lg"
        icon="i-heroicons-arrow-left"
        @click="store.activeTabIndex--"
      >
        Back
      </UButton>

      <UButton
        size="lg"
        trailing-icon="i-heroicons-arrow-right"
        @click="nextStep"
      >
        Continue
      </UButton>

    </div>

  </div>
</template>

       <template #projects>
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

      <UBadge
        color="primary"
        variant="soft"
        size="lg"
      >
        {{ store.projects.length }} Added
      </UBadge>
    </div>

    <!-- Projects List -->
    <div class="space-y-6">

      <UCard
        v-for="(project, index) in store.projects"
        :key="index"
        class="relative overflow-hidden border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
      >

        <!-- Top Border -->
     

        <!-- Header -->
        <template #header>
          <div class="flex   justify-end">

             

            <!-- Delete -->
            <UButton 
              color="red"
              variant="soft"
              icon="i-heroicons-trash"
              :disabled="store.projects.length === 1"
              square
              @click="store.removeProject(index)"
            />

          </div>
        </template>

        <!-- Form -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <!-- Project Name -->
          <UFormField
            label="Project Name"
            class="w-full"
          >
            <UInput
              v-model="project.name"
              size="lg"
              class="w-full"
              icon="i-heroicons-folder"
              placeholder="E-Commerce Website"
            />
          </UFormField>

          <!-- Company -->
          <UFormField
            label="Company / Platform"
            class="w-full"
            help="Where you built this project"
          >
            <UInput
              v-model="project.company"
              size="lg"
              class="w-full"
              icon="i-heroicons-building-office-2"
              placeholder="Freelance / Upwork / Company"
            />
          </UFormField>

          <!-- Start Date -->
          <UFormField
            label="Start Date"
            class="w-full"
          >
            <UInput
              type="month"
              v-model="project.startDate"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <!-- End Date -->
          <UFormField
            label="End Date"
            class="w-full"
          >
            <UInput
              type="month"
               :disabled="project.isCurrent"
              v-model="project.endDate"
              size="lg"
              class="w-full"
            />
          </UFormField>
 <!-- Current Working -->
  <UFormField
    label="Current Working"
    class="w-full"
  >
    <div class="h-[34px] w-full flex items-center px-4 rounded-xl border border-gray-200 dark:border-gray-800">
      <UCheckbox
        v-model="project.isCurrent"
        label="Currently Working"
      />
    </div>
  </UFormField>
          <!-- Tech Stack -->
          <UFormField
            label="Tech Stack"
            class="md:col-span-2 w-full"
          >
            <UInput
              v-model="project.techStack"
              size="lg"
              class="w-full"
              icon="i-heroicons-command-line"
              placeholder="Nuxt 3, Tailwind CSS, MySQL"
            />
          </UFormField>

          <!-- Description -->
          <UFormField
            label="Project Description"
            class="md:col-span-2 w-full"
          >
            <UTextarea
              v-model="project.description"
              :rows="5"
              autoresize
              class="w-full"
              placeholder="Describe your project features, goals, technologies used, and achievements..."
            />
          </UFormField>

        </div>

      </UCard>

    </div>

    <!-- Add Project -->
    <UButton
      block
      color="gray"
      variant="soft"
      icon="i-heroicons-plus"
      class="py-5 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition"
      @click="store.addProject"
    >
      Add Project
    </UButton>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-4">

      <UButton
        color="white"
        size="lg"
        icon="i-heroicons-arrow-left"
        @click="store.activeTabIndex--"
      >
        Back
      </UButton>

      <UButton
        size="lg"
        trailing-icon="i-heroicons-arrow-right"
        @click="nextStep"
      >
        Continue
      </UButton>

    </div>

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
            
            <div class="flex flex-wrap gap-3 mt-4 min-h-[80px] p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300">
              <UBadge v-for="(skill, i) in store.skills" :key="i" size="lg" class="px-4 py-2 flex items-center gap-2">
                {{ skill }}
                <UIcon name="i-heroicons-x-mark" class="cursor-pointer hover:text-red-300" @click="store.skills.splice(i, 1)" />
              </UBadge>
              <p v-if="store.skills.length === 0" class="text-gray-400 text-sm italic w-full text-center">No skills added yet. Start typing above!</p>
            </div>

            <div class="flex justify-between mt-8 pt-6 border-t">
              <UButton color="white" size="lg" @click="store.activeTabIndex--">Back</UButton>
              <UButton color="primary" size="xl" class="px-12 font-bold shadow-lg" @click="generateResume">
                Generate Final Resume
              </UButton>
            </div>
          </div>
        </UCard>
      </template>

    </UTabs>
  </div>
</template>


