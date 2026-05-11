<script setup lang="ts">
defineProps<{ resume: any }>()
</script>

<template>
  <div class="rounded-2xl border bg-white text-neutral-900 p-10">
    <h2 class="text-4xl font-black">{{ resume.personalInfo.fullName || 'Your Name' }}</h2>
    <p class="text-sm mt-1">{{ resume.personalInfo.jobTitle }}</p>
    <div class="grid md:grid-cols-6 gap-12 mt-10">
      <section class="md:col-span-2">
        <h3 class="text-[11px] font-bold uppercase tracking-[0.24em]">Skills</h3>
        <ul class="mt-4 text-sm space-y-2">
          <li v-for="(s, i) in resume.skills" :key="i">- {{ s }}</li>
        </ul>
      </section>
      <section class="md:col-span-4">
        <h3 class="text-[11px] font-bold uppercase tracking-[0.24em]">Experience</h3>
        <div class="mt-4 divide-y divide-black/15">
          <article v-for="(item, i) in resume.experience" :key="i" class="py-4">
            <p class="text-lg font-black">{{ item.role }}</p>
            <p class="uppercase text-[11px] tracking-[0.14em] opacity-70">{{ item.company }}</p>
            <p class="text-sm mt-2">{{ item.description }}</p>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>
