<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-slate-950 text-slate-100 overflow-hidden">
    <div class="grid md:grid-cols-12">
      <main class="md:col-span-8 p-7">
        <h2 class="text-3xl font-bold">{{ resume.personalInfo.fullName || 'Your Name' }}</h2>
        <p class="text-sm opacity-80">{{ resume.personalInfo.jobTitle || 'Professional Title' }}</p>
        <h3 class="text-xs font-semibold uppercase tracking-[0.15em] mt-7">Experience</h3>
        <div class="mt-4 space-y-4 text-sm">
          <article v-for="(item, i) in resume.experience" :key="i" class="border-l-2 border-white/40 pl-4">
            <p class="font-semibold">{{ item.role }}</p>
            <p class="opacity-80">{{ item.company }} | {{ item.location }}</p>
            <p class="opacity-80">{{ item.description }}</p>
          </article>
        </div>
      </main>
      <aside class="md:col-span-4 p-6 bg-white/10">
        <img v-if="resume.personalInfo.profileImage" :src="resume.personalInfo.profileImage" class="w-20 h-20 rounded-full object-cover mb-4 border border-white/40" alt="Profile">
        <h3 class="text-xs font-semibold uppercase tracking-[0.15em]">Profile</h3>
        <p class="text-sm mt-3">{{ resume.personalInfo.aboutMe }}</p>
        <h3 class="text-xs font-semibold uppercase tracking-[0.15em] mt-8">Skills</h3>
        <ul class="mt-3 text-sm space-y-1">
          <li v-for="(s, i) in resume.skills" :key="i">&lt;&gt; {{ s }}</li>
        </ul>
      </aside>
    </div>
  </div>
</template>
