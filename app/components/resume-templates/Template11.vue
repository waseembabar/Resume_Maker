<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-white text-slate-900 overflow-hidden">
    <div class="grid md:grid-cols-3">
      <aside class="md:col-span-1 p-6 bg-gradient-to-b from-blue-50 to-blue-100">
        <img v-if="resume.personalInfo.profileImage" :src="resume.personalInfo.profileImage" class="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-200" alt="Profile">
        <h3 class="text-sm font-bold uppercase tracking-[0.2em] text-blue-800">Contact</h3>
        <p class="text-sm mt-2">{{ resume.personalInfo.email }}</p>
        <p class="text-sm">{{ resume.personalInfo.phone }}</p>
        <p class="text-sm">{{ resume.personalInfo.location }}</p>
        <h3 class="text-sm font-bold uppercase tracking-[0.2em] mt-6 text-blue-800">Skills</h3>
        <ul class="mt-2 text-sm space-y-1">
          <li v-for="(s, i) in resume.skills" :key="i">• {{ s }}</li>
        </ul>
      </aside>
      <main class="md:col-span-2 p-8">
        <h2 class="text-4xl font-bold text-gray-800">{{ resume.personalInfo.fullName || 'Your Name' }}</h2>
        <p class="text-lg text-blue-600 mt-1">{{ resume.personalInfo.jobTitle || 'Professional Title' }}</p>
        <p class="text-sm mt-4 leading-relaxed text-gray-700">{{ resume.personalInfo.aboutMe }}</p>
        <h3 class="text-lg font-bold uppercase tracking-[0.2em] mt-8 text-gray-800">Experience</h3>
        <div class="mt-4 space-y-6">
          <article v-for="(item, i) in resume.experience" :key="i" class="border-l-4 border-blue-500 pl-4">
            <p class="font-semibold text-lg">{{ item.role }} / {{ item.company }}</p>
            <p class="text-sm text-gray-500">{{ item.startDate }} - {{ item.isCurrent ? 'Present' : item.endDate }}</p>
            <p class="mt-2 text-sm">{{ item.description }}</p>
          </article>
        </div>
        <h3 class="text-lg font-bold uppercase tracking-[0.2em] mt-8 text-gray-800">Education</h3>
        <div class="mt-4 space-y-4">
          <article v-for="(edu, i) in resume.education" :key="i">
            <p class="font-semibold">{{ edu.degree }} - {{ edu.institution }}</p>
            <p class="text-sm text-gray-500">{{ edu.startDate }} - {{ edu.isCurrent ? 'Present' : edu.endDate }}</p>
            <p class="text-sm">{{ edu.description }}</p>
          </article>
        </div>
      </main>
    </div>
  </div>
</template>