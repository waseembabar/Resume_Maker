<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-white text-gray-900 p-8">
    <section class="pb-8 border-b border-black/20">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="text-3xl font-serif font-bold">{{ resume.personalInfo.fullName || 'Your Name' }}</h2>
          <p class="text-sm">{{ resume.personalInfo.jobTitle }}</p>
        </div>
        <img v-if="resume.personalInfo.profileImage" :src="resume.personalInfo.profileImage" class="w-16 h-16 rounded-full object-cover border" alt="Profile">
      </div>
      <p class="text-sm mt-4 leading-relaxed">{{ resume.personalInfo.aboutMe }}</p>
    </section>
    <div class="grid md:grid-cols-2 gap-8 pt-8">
      <section>
        <h3 class="text-xs font-semibold uppercase tracking-[0.17em]">Experience</h3>
        <ul class="mt-3 text-sm space-y-2">
          <li v-for="(item, i) in resume.experience" :key="i">- {{ item.role }} - {{ item.company }}</li>
        </ul>
      </section>
      <section>
        <h3 class="text-xs font-semibold uppercase tracking-[0.17em]">Skills & Education</h3>
        <ul class="mt-3 text-sm space-y-2">
          <li v-for="(s, i) in resume.skills" :key="`s-${i}`">- {{ s }}</li>
          <li v-for="(item, i) in resume.education" :key="`e-${i}`">- {{ item.institution }}</li>
        </ul>
      </section>
    </div>
  </div>
</template>
