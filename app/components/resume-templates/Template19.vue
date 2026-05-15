<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-white text-slate-900 overflow-hidden">
    <header class="bg-black text-white p-8">
      <h1 class="text-5xl font-bold">{{ resume.personalInfo.fullName || 'Your Name' }}</h1>
      <p class="text-2xl mt-2">{{ resume.personalInfo.jobTitle || 'Professional Title' }}</p>
      <p class="text-sm mt-4">{{ resume.personalInfo.aboutMe }}</p>
    </header>
    <div class="p-8">
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-3xl font-bold mb-6 uppercase tracking-wide">Experience</h2>
          <div class="space-y-6">
            <div v-for="(item, i) in resume.experience" :key="i" class="border-l-4 border-black pl-6">
              <h3 class="text-xl font-bold">{{ item.role }}</h3>
              <p class="text-lg">{{ item.company }}</p>
              <p class="text-sm text-gray-600">{{ item.startDate }} - {{ item.isCurrent ? 'Present' : item.endDate }}</p>
              <p class="mt-2">{{ item.description }}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 class="text-3xl font-bold mb-6 uppercase tracking-wide">Education</h2>
          <div class="space-y-4">
            <div v-for="(edu, i) in resume.education" :key="i">
              <h3 class="text-xl font-bold">{{ edu.degree }}</h3>
              <p class="text-lg">{{ edu.institution }}</p>
              <p class="text-sm text-gray-600">{{ edu.startDate }} - {{ edu.isCurrent ? 'Present' : edu.endDate }}</p>
              <p class="mt-1">{{ edu.description }}</p>
            </div>
          </div>
          <h2 class="text-3xl font-bold mb-6 mt-8 uppercase tracking-wide">Skills</h2>
          <div class="flex flex-wrap gap-3">
            <span v-for="(skill, i) in resume.skills" :key="i" class="bg-black text-white px-4 py-2 font-bold">{{ skill }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>