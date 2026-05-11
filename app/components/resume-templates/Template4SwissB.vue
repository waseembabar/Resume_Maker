<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-neutral-50 text-neutral-900 p-10">
    <div class="flex items-start justify-between gap-6">
      <div>
        <h2 class="text-3xl font-mono font-semibold">{{ resume.personalInfo.fullName || 'Your Name' }}</h2>
        <p class="text-sm mt-1">{{ resume.personalInfo.jobTitle }}</p>
      </div>
      <img v-if="resume.personalInfo.profileImage" :src="resume.personalInfo.profileImage" class="w-16 h-16 rounded object-cover border" alt="Profile">
    </div>
    <section class="mt-10">
      <h3 class="text-[11px] font-semibold uppercase tracking-[0.25em]">Profile</h3>
      <p class="text-sm mt-5 max-w-3xl leading-loose">{{ resume.personalInfo.aboutMe }}</p>
    </section>
    <div class="grid md:grid-cols-12 gap-8 mt-10">
      <section class="md:col-span-7 border-t border-black/15 pt-4">
        <h3 class="text-[11px] font-semibold uppercase tracking-[0.25em]">Experience</h3>
        <ul class="mt-4 text-sm space-y-3">
          <li v-for="(item, i) in resume.experience" :key="i">&gt; <strong>{{ item.role }}</strong> at {{ item.company }}</li>
        </ul>
      </section>
      <section class="md:col-span-5 border-t border-black/15 pt-4">
        <h3 class="text-[11px] font-semibold uppercase tracking-[0.25em]">Education</h3>
        <ul class="mt-4 text-sm space-y-3">
          <li v-for="(item, i) in resume.education" :key="i">&gt; {{ item.institution }}</li>
        </ul>
      </section>
    </div>
  </div>
</template>
