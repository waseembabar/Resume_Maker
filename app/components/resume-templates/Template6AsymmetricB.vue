<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-zinc-900 text-zinc-100 p-8">
    <div class="grid md:grid-cols-12 gap-8">
      <section class="md:col-span-5 order-2 md:order-1">
        <h3 class="text-xs font-bold uppercase tracking-[0.15em]">Experience</h3>
        <ul class="mt-4 space-y-3 text-sm">
          <li v-for="(item, i) in resume.experience" :key="i">o {{ item.role }} / {{ item.company }}</li>
        </ul>
      </section>
      <section class="md:col-span-7 order-1 md:order-2 border-l border-white/25 md:pl-8">
        <h2 class="text-3xl font-bold">{{ resume.personalInfo.fullName || 'Your Name' }}</h2>
        <p class="text-sm opacity-80">{{ resume.personalInfo.jobTitle }}</p>
        <p class="text-sm mt-4 leading-relaxed">{{ resume.personalInfo.aboutMe }}</p>
        <h3 class="text-xs font-bold uppercase tracking-[0.15em] mt-8">Education</h3>
        <ul class="mt-3 text-sm space-y-2">
          <li v-for="(item, i) in resume.education" :key="i">o {{ item.institution }}</li>
        </ul>
      </section>
    </div>
  </div>
</template>
