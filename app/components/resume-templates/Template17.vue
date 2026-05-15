<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-white text-slate-900 overflow-hidden p-8">
    <div class="text-center mb-8">
      <img v-if="resume.personalInfo.profileImage" :src="resume.personalInfo.profileImage" class="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-blue-200" alt="Profile">
      <h1 class="text-3xl font-bold">{{ resume.personalInfo.fullName || 'Your Name' }}</h1>
      <p class="text-lg text-blue-600">{{ resume.personalInfo.jobTitle || 'Professional Title' }}</p>
      <p class="text-sm mt-2">{{ resume.personalInfo.aboutMe }}</p>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      <div class="md:col-span-2">
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h2 class="text-xl font-bold mb-4">Experience</h2>
          <div class="space-y-4">
            <div v-for="(item, i) in resume.experience" :key="i" class="bg-white p-4 rounded shadow-sm">
              <h3 class="font-semibold">{{ item.role }}</h3>
              <p class="text-sm text-gray-600">{{ item.company }}</p>
              <p class="text-sm">{{ item.startDate }} - {{ item.isCurrent ? 'Present' : item.endDate }}</p>
              <p class="mt-2 text-sm">{{ item.description }}</p>
            </div>
          </div>
        </div>
        <div class="bg-green-50 p-6 rounded-lg">
          <h2 class="text-xl font-bold mb-4">Education</h2>
          <div class="space-y-4">
            <div v-for="(edu, i) in resume.education" :key="i" class="bg-white p-4 rounded shadow-sm">
              <h3 class="font-semibold">{{ edu.degree }}</h3>
              <p class="text-sm text-gray-600">{{ edu.institution }}</p>
              <p class="text-sm">{{ edu.startDate }} - {{ edu.isCurrent ? 'Present' : edu.endDate }}</p>
              <p class="mt-2 text-sm">{{ edu.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="bg-yellow-50 p-6 rounded-lg mb-6">
          <h2 class="text-xl font-bold mb-4">Skills</h2>
          <div class="space-y-2">
            <span v-for="(skill, i) in resume.skills" :key="i" class="block bg-yellow-200 text-yellow-800 px-3 py-1 rounded text-sm">{{ skill }}</span>
          </div>
        </div>
        <div class="bg-purple-50 p-6 rounded-lg">
          <h2 class="text-xl font-bold mb-4">Contact</h2>
          <p class="text-sm">{{ resume.personalInfo.email }}</p>
          <p class="text-sm">{{ resume.personalInfo.phone }}</p>
          <p class="text-sm">{{ resume.personalInfo.location }}</p>
        </div>
      </div>
    </div>
  </div>
</template>