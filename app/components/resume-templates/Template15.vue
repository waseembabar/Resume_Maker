<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-white text-slate-900 overflow-hidden relative">
    <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 relative">
      <div class="absolute inset-0 bg-black opacity-20"></div>
      <div class="relative z-10">
        <h1 class="text-4xl font-bold">{{ resume.personalInfo.fullName || 'Your Name' }}</h1>
        <p class="text-xl mt-2">{{ resume.personalInfo.jobTitle || 'Professional Title' }}</p>
        <p class="text-sm mt-4">{{ resume.personalInfo.aboutMe }}</p>
      </div>
    </div>
    <div class="p-8 -mt-8 relative z-20 bg-white rounded-t-3xl">
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-2xl font-bold mb-4 text-purple-600">Experience</h2>
          <div class="space-y-4">
            <div v-for="(item, i) in resume.experience" :key="i" class="bg-purple-50 p-4 rounded-lg">
              <h3 class="font-semibold">{{ item.role }}</h3>
              <p class="text-sm text-gray-600">{{ item.company }}</p>
              <p class="text-sm">{{ item.startDate }} - {{ item.isCurrent ? 'Present' : item.endDate }}</p>
              <p class="mt-2 text-sm">{{ item.description }}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 class="text-2xl font-bold mb-4 text-pink-600">Education</h2>
          <div class="space-y-4">
            <div v-for="(edu, i) in resume.education" :key="i" class="bg-pink-50 p-4 rounded-lg">
              <h3 class="font-semibold">{{ edu.degree }}</h3>
              <p class="text-sm text-gray-600">{{ edu.institution }}</p>
              <p class="text-sm">{{ edu.startDate }} - {{ edu.isCurrent ? 'Present' : edu.endDate }}</p>
              <p class="mt-2 text-sm">{{ edu.description }}</p>
            </div>
          </div>
          <h2 class="text-2xl font-bold mb-4 mt-8 text-green-600">Skills</h2>
          <div class="flex flex-wrap gap-2">
            <span v-for="(skill, i) in resume.skills" :key="i" class="bg-green-100 text-green-800 px-3 py-1 rounded-full">{{ skill }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>