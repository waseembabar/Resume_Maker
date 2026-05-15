<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-white text-slate-900 overflow-hidden">
    <div class="grid md:grid-cols-2">
      <div class="p-8 bg-gray-100">
        <img v-if="resume.personalInfo.profileImage" :src="resume.personalInfo.profileImage" class="w-32 h-32 rounded-full object-cover mb-4 mx-auto" alt="Profile">
        <h2 class="text-2xl font-bold text-center mb-4">{{ resume.personalInfo.fullName || 'Your Name' }}</h2>
        <p class="text-center text-gray-600 mb-6">{{ resume.personalInfo.jobTitle || 'Professional Title' }}</p>
        <div class="space-y-4">
          <div>
            <h3 class="font-semibold text-gray-800">Contact</h3>
            <p class="text-sm">{{ resume.personalInfo.email }}</p>
            <p class="text-sm">{{ resume.personalInfo.phone }}</p>
            <p class="text-sm">{{ resume.personalInfo.location }}</p>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800">Skills</h3>
            <ul class="text-sm space-y-1">
              <li v-for="(s, i) in resume.skills" :key="i">• {{ s }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="p-8">
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-2">About</h3>
          <p>{{ resume.personalInfo.aboutMe }}</p>
        </div>
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-2">Experience</h3>
          <div class="space-y-4">
            <div v-for="(item, i) in resume.experience" :key="i">
              <h4 class="font-semibold">{{ item.role }}</h4>
              <p class="text-sm text-gray-600">{{ item.company }} | {{ item.startDate }} - {{ item.isCurrent ? 'Present' : item.endDate }}</p>
              <p class="text-sm mt-1">{{ item.description }}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-2">Education</h3>
          <div class="space-y-4">
            <div v-for="(edu, i) in resume.education" :key="i">
              <h4 class="font-semibold">{{ edu.degree }}</h4>
              <p class="text-sm text-gray-600">{{ edu.institution }} | {{ edu.startDate }} - {{ edu.isCurrent ? 'Present' : edu.endDate }}</p>
              <p class="text-sm mt-1">{{ edu.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>