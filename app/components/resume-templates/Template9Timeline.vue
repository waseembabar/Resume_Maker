<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-amber-50 text-amber-950 p-8">
    <h2 class="text-3xl font-serif font-bold">{{ resume.personalInfo.fullName || 'Your Name' }}</h2>
    <p class="text-sm">{{ resume.personalInfo.jobTitle }}</p>
    <h3 class="text-xs font-bold uppercase tracking-[0.2em] mt-8">Experience Timeline</h3>
    <div class="mt-6 border-l-2 border-black/20 pl-6 space-y-6">
      <article v-for="(item, i) in resume.experience" :key="i" class="relative text-sm">
        <div class="absolute -left-[30px] top-1 w-3 h-3 rounded-full bg-black/50" />
        <p class="font-semibold">{{ item.role }} - {{ item.company }}</p>
        <p class="opacity-70">{{ item.startDate }} to {{ item.isCurrent ? 'Present' : item.endDate }}</p>
        <p>{{ item.description }}</p>
      </article>
    </div>
  </div>
</template>
