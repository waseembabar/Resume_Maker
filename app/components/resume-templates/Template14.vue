<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-white text-slate-900 overflow-hidden p-8">
    <div class="text-center mb-8">
      <img v-if="resume.personalInfo.profileImage" :src="resume.personalInfo.profileImage" class="w-28 h-28 rounded-full object-cover mx-auto mb-4" alt="Profile">
      <h1 class="text-3xl font-bold">{{ resume.personalInfo.fullName || 'Your Name' }}</h1>
      <p class="text-lg text-gray-600">{{ resume.personalInfo.jobTitle || 'Professional Title' }}</p>
      <p class="text-sm mt-2">{{ resume.personalInfo.aboutMe }}</p>
    </div>
    <div class="relative">
      <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-500"></div>
      <div class="space-y-8">
        <div v-for="(item, i) in resume.experience" :key="i" class="relative pl-12">
          <div class="absolute left-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">{{ i + 1 }}</div>
          <h3 class="text-lg font-semibold">{{ item.role }}</h3>
          <p class="text-sm text-gray-600">{{ item.company }} | {{ item.startDate }} - {{ item.isCurrent ? 'Present' : item.endDate }}</p>
          <p class="mt-2">{{ item.description }}</p>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Education</h2>
      <div class="space-y-4">
        <div v-for="(edu, i) in resume.education" :key="i" class="border-l-4 border-green-500 pl-4">
          <h3 class="font-semibold">{{ edu.degree }}</h3>
          <p class="text-sm text-gray-600">{{ edu.institution }} | {{ edu.startDate }} - {{ edu.isCurrent ? 'Present' : edu.endDate }}</p>
          <p>{{ edu.description }}</p>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Skills</h2>
      <div class="grid grid-cols-3 gap-2">
        <span v-for="(skill, i) in resume.skills" :key="i" class="text-center bg-gray-100 p-2 rounded">{{ skill }}</span>
      </div>
    </div>
  </div>
</template>