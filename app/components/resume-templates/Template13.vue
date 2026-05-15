<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-white text-slate-900 overflow-hidden">
    <header class="bg-gray-800 text-white p-8 text-center">
      <h1 class="text-4xl font-bold">{{ resume.personalInfo.fullName || 'Your Name' }}</h1>
      <p class="text-xl mt-2">{{ resume.personalInfo.jobTitle || 'Professional Title' }}</p>
      <p class="text-sm mt-4">{{ resume.personalInfo.aboutMe }}</p>
    </header>
    <div class="p-8">
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4 border-b-2 border-gray-300 pb-2">Experience</h2>
        <div class="space-y-6">
          <div v-for="(item, i) in resume.experience" :key="i">
            <h3 class="text-lg font-semibold">{{ item.role }} at {{ item.company }}</h3>
            <p class="text-sm text-gray-600">{{ item.startDate }} - {{ item.isCurrent ? 'Present' : item.endDate }}</p>
            <p class="mt-2">{{ item.description }}</p>
          </div>
        </div>
      </section>
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4 border-b-2 border-gray-300 pb-2">Education</h2>
        <div class="space-y-4">
          <div v-for="(edu, i) in resume.education" :key="i">
            <h3 class="font-semibold">{{ edu.degree }}</h3>
            <p class="text-sm text-gray-600">{{ edu.institution }} | {{ edu.startDate }} - {{ edu.isCurrent ? 'Present' : edu.endDate }}</p>
            <p>{{ edu.description }}</p>
          </div>
        </div>
      </section>
      <section>
        <h2 class="text-2xl font-bold mb-4 border-b-2 border-gray-300 pb-2">Skills</h2>
        <div class="flex flex-wrap gap-4">
          <span v-for="(skill, i) in resume.skills" :key="i" class="bg-gray-200 px-4 py-2 rounded">{{ skill }}</span>
        </div>
      </section>
    </div>
  </div>
</template>