<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-white text-slate-900 overflow-hidden p-8">
    <div class="text-center mb-8">
      <img v-if="resume.personalInfo.profileImage" :src="resume.personalInfo.profileImage" class="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-gray-200" alt="Profile">
      <h1 class="text-5xl font-bold text-gray-800">{{ resume.personalInfo.fullName || 'Your Name' }}</h1>
      <p class="text-xl text-gray-600 mt-2">{{ resume.personalInfo.jobTitle || 'Professional Title' }}</p>
      <p class="text-sm mt-4 text-gray-700">{{ resume.personalInfo.aboutMe }}</p>
    </div>
    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Experience</h2>
        <div class="space-y-4">
          <div v-for="(item, i) in resume.experience" :key="i" class="bg-gray-50 p-4 rounded-lg">
            <h3 class="font-semibold">{{ item.role }}</h3>
            <p class="text-sm text-gray-600">{{ item.company }} | {{ item.startDate }} - {{ item.isCurrent ? 'Present' : item.endDate }}</p>
            <p class="text-sm mt-2">{{ item.description }}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Education</h2>
        <div class="space-y-4">
          <div v-for="(edu, i) in resume.education" :key="i" class="bg-gray-50 p-4 rounded-lg">
            <h3 class="font-semibold">{{ edu.degree }}</h3>
            <p class="text-sm text-gray-600">{{ edu.institution }} | {{ edu.startDate }} - {{ edu.isCurrent ? 'Present' : edu.endDate }}</p>
            <p class="text-sm mt-2">{{ edu.description }}</p>
          </div>
        </div>
        <h2 class="text-2xl font-bold mb-4 mt-8 text-gray-800">Skills</h2>
        <div class="flex flex-wrap gap-2">
          <span v-for="(skill, i) in resume.skills" :key="i" class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{{ skill }}</span>
        </div>
      </div>
    </div>
  </div>
</template>