<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-white text-slate-900 overflow-hidden">
    <div class="grid md:grid-cols-12">
      <aside class="md:col-span-4 p-6 bg-slate-100">
        <img v-if="resume.personalInfo.profileImage" :src="resume.personalInfo.profileImage" class="w-20 h-20 rounded-full object-cover mb-4 border" alt="Profile">
        <h3 class="text-xs font-bold uppercase tracking-[0.2em]">Contact</h3>
        <p class="text-sm mt-3">{{ resume.personalInfo.email }}</p>
        <p class="text-sm">{{ resume.personalInfo.phone }}</p>
        <p class="text-sm">{{ resume.personalInfo.location }}</p>
        <h3 class="text-xs font-bold uppercase tracking-[0.2em] mt-8">Skills</h3>
        <ul class="mt-3 text-sm space-y-1">
          <li v-for="(s, i) in resume.skills" :key="i">o {{ s }}</li>
        </ul>
      </aside>
      <main class="md:col-span-8 p-7">
        <h2 class="text-3xl font-serif font-bold">{{ resume.personalInfo.fullName || 'Your Name' }}</h2>
        <p class="text-sm opacity-80">{{ resume.personalInfo.jobTitle || 'Professional Title' }}</p>
        <p class="text-sm mt-5 leading-relaxed">{{ resume.personalInfo.aboutMe }}</p>
        <h3 class="text-xs font-bold uppercase tracking-[0.2em] mt-8">Experience</h3>
        <div class="mt-3 space-y-4 text-sm">
          <article v-for="(item, i) in resume.experience" :key="i">
            <p class="font-semibold">{{ item.role }} / {{ item.company }}</p>
            <p class="opacity-70">{{ item.startDate }} - {{ item.isCurrent ? 'Present' : item.endDate }}</p>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </main>
    </div>
  </div>
</template>
