<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-slate-100 text-slate-900 p-10">
    <section class="bg-black/5 rounded-xl p-6">
      <h2 class="text-3xl font-bold">{{ resume.personalInfo.fullName || 'Your Name' }}</h2>
      <p class="text-sm">{{ resume.personalInfo.jobTitle }}</p>
      <p class="text-sm mt-3">{{ resume.personalInfo.aboutMe }}</p>
    </section>
    <div class="grid md:grid-cols-2 gap-10 mt-8">
      <section>
        <h3 class="text-xs font-bold uppercase tracking-[0.17em]">Projects</h3>
        <ul class="mt-4 space-y-3 text-sm">
          <li v-for="(item, i) in resume.projects" :key="i">&gt; {{ item.name }}</li>
        </ul>
      </section>
      <section>
        <h3 class="text-xs font-bold uppercase tracking-[0.17em]">Experience</h3>
        <ul class="mt-4 space-y-3 text-sm">
          <li v-for="(item, i) in resume.experience" :key="i">&gt; {{ item.role }}</li>
        </ul>
      </section>
    </div>
  </div>
</template>
