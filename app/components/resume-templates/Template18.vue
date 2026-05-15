<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-white text-slate-900 overflow-hidden p-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-light">{{ resume.personalInfo.fullName || 'Your Name' }}</h1>
      <p class="text-lg text-gray-600 mt-2">{{ resume.personalInfo.jobTitle || 'Professional Title' }}</p>
      <p class="text-sm mt-4">{{ resume.personalInfo.aboutMe }}</p>
    </div>
    <div class="space-y-8">
      <section>
        <h2 class="text-2xl font-light mb-4 border-b border-gray-300 pb-2">Experience</h2>
        <div class="space-y-6">
          <div v-for="(item, i) in resume.experience" :key="i">
            <h3 class="text-lg font-medium">{{ item.role }}</h3>
            <p class="text-sm text-gray-600">{{ item.company }} | {{ item.startDate }} - {{ item.isCurrent ? 'Present' : item.endDate }}</p>
            <p class="mt-2 text-sm">{{ item.description }}</p>
          </div>
        </div>
      </section>
      <section>
        <h2 class="text-2xl font-light mb-4 border-b border-gray-300 pb-2">Education</h2>
        <div class="space-y-4">
          <div v-for="(edu, i) in resume.education" :key="i">
            <h3 class="font-medium">{{ edu.degree }}</h3>
            <p class="text-sm text-gray-600">{{ edu.institution }} | {{ edu.startDate }} - {{ edu.isCurrent ? 'Present' : edu.endDate }}</p>
            <p class="text-sm mt-1">{{ edu.description }}</p>
          </div>
        </div>
      </section>
      <section>
        <h2 class="text-2xl font-light mb-4 border-b border-gray-300 pb-2">Skills</h2>
        <div class="flex flex-wrap gap-4">
          <span v-for="(skill, i) in resume.skills" :key="i" class="text-sm bg-gray-100 px-3 py-1 rounded">{{ skill }}</span>
        </div>
      </section>
    </div>
  </div>
</template>