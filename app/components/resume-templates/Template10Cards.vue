<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-indigo-50 text-indigo-950 p-8">
    <div class="flex items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-3xl font-bold">{{ resume.personalInfo.fullName || 'Your Name' }}</h2>
        <p class="text-sm">{{ resume.personalInfo.jobTitle }}</p>
      </div>
      <img v-if="resume.personalInfo.profileImage" :src="resume.personalInfo.profileImage" class="w-16 h-16 rounded object-cover border" alt="Profile">
    </div>
    <div class="grid md:grid-cols-2 gap-6">
      <section class="rounded-xl border border-black/15 p-4">
        <h3 class="text-xs font-semibold uppercase tracking-[0.18em]">Profile</h3>
        <p class="mt-3 text-sm">{{ resume.personalInfo.aboutMe }}</p>
      </section>
      <section class="rounded-xl border border-black/15 p-4">
        <h3 class="text-xs font-semibold uppercase tracking-[0.18em]">Skills</h3>
        <ul class="mt-3 space-y-1 text-sm">
          <li v-for="(s, i) in resume.skills" :key="i">&lt;&gt; {{ s }}</li>
        </ul>
      </section>
      <section class="rounded-xl border border-black/15 p-4">
        <h3 class="text-xs font-semibold uppercase tracking-[0.18em]">Experience</h3>
        <ul class="mt-3 space-y-1 text-sm">
          <li v-for="(item, i) in resume.experience" :key="i">&lt;&gt; {{ item.role }}</li>
        </ul>
      </section>
      <section class="rounded-xl border border-black/15 p-4">
        <h3 class="text-xs font-semibold uppercase tracking-[0.18em]">Projects</h3>
        <ul class="mt-3 space-y-1 text-sm">
          <li v-for="(item, i) in resume.projects" :key="i">&lt;&gt; {{ item.name }}</li>
        </ul>
      </section>
    </div>
  </div>
</template>
