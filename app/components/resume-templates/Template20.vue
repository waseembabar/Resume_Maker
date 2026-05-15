<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-gradient-to-br from-yellow-100 to-pink-100 text-slate-900 overflow-hidden p-8">
    <div class="text-center mb-8">
      <img v-if="resume.personalInfo.profileImage" :src="resume.personalInfo.profileImage" class="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg" alt="Profile">
      <h1 class="text-4xl font-bold text-purple-800">{{ resume.personalInfo.fullName || 'Your Name' }}</h1>
      <p class="text-xl text-pink-600 mt-2">{{ resume.personalInfo.jobTitle || 'Professional Title' }}</p>
      <p class="text-sm mt-4 text-gray-700">{{ resume.personalInfo.aboutMe }}</p>
    </div>
    <div class="grid md:grid-cols-2 gap-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-blue-600">Experience</h2>
        <div class="space-y-4">
          <div v-for="(item, i) in resume.experience" :key="i" class="bg-blue-50 p-4 rounded">
            <h3 class="font-semibold text-blue-800">{{ item.role }}</h3>
            <p class="text-sm text-gray-600">{{ item.company }}</p>
            <p class="text-sm">{{ item.startDate }} - {{ item.isCurrent ? 'Present' : item.endDate }}</p>
            <p class="mt-2 text-sm">{{ item.description }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-green-600">Education</h2>
        <div class="space-y-4">
          <div v-for="(edu, i) in resume.education" :key="i" class="bg-green-50 p-4 rounded">
            <h3 class="font-semibold text-green-800">{{ edu.degree }}</h3>
            <p class="text-sm text-gray-600">{{ edu.institution }}</p>
            <p class="text-sm">{{ edu.startDate }} - {{ edu.isCurrent ? 'Present' : edu.endDate }}</p>
            <p class="mt-2 text-sm">{{ edu.description }}</p>
          </div>
        </div>
        <h2 class="text-2xl font-bold mb-4 mt-6 text-orange-600">Skills</h2>
        <div class="flex flex-wrap gap-2">
          <span v-for="(skill, i) in resume.skills" :key="i" class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">{{ skill }}</span>
        </div>
      </div>
    </div>
  </div>
</template>