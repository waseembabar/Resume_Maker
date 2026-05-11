<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-stone-100 text-stone-900 p-8">
    <h2 class="text-4xl font-serif italic font-semibold md:ml-10">{{ resume.personalInfo.fullName || 'Your Name' }}</h2>
    <p class="text-sm md:ml-10">{{ resume.personalInfo.jobTitle }}</p>
    <div class="grid md:grid-cols-12 gap-6 mt-8">
      <section class="md:col-span-8 md:translate-y-4">
        <h3 class="text-xs font-semibold uppercase tracking-[0.12em]">Projects</h3>
        <div class="mt-4 space-y-3 text-sm">
          <article v-for="(item, i) in resume.projects" :key="i" class="pl-4 border-l-4 border-black/30">
            <p class="font-bold">{{ item.name }}</p>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </section>
      <aside class="md:col-span-4 md:-translate-y-6">
        <img v-if="resume.personalInfo.profileImage" :src="resume.personalInfo.profileImage" class="w-16 h-16 rounded-full object-cover border mb-4" alt="Profile">
        <h3 class="text-xs font-semibold uppercase tracking-[0.12em]">Skills</h3>
        <ul class="mt-4 text-sm space-y-2">
          <li v-for="(s, i) in resume.skills" :key="i">&lt;&gt; {{ s }}</li>
        </ul>
      </aside>
    </div>
  </div>
</template>
