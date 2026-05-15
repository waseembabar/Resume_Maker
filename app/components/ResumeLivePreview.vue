<script setup lang="ts">
import Template1SplitPaneLeft from './resume-templates/Template1SplitPaneLeft.vue'
import Template2SplitPaneRight from './resume-templates/Template2SplitPaneRight.vue'
import Template3SwissA from './resume-templates/Template3SwissA.vue'
import Template4SwissB from './resume-templates/Template4SwissB.vue'
import Template5AsymmetricA from './resume-templates/Template5AsymmetricA.vue'
import Template6AsymmetricB from './resume-templates/Template6AsymmetricB.vue'
import Template7ExecutiveTA from './resume-templates/Template7ExecutiveTA.vue'
import Template8ExecutiveTB from './resume-templates/Template8ExecutiveTB.vue'
import Template9Timeline from './resume-templates/Template9Timeline.vue'
import Template10Cards from './resume-templates/Template10Cards.vue'
import Template11 from './resume-templates/Template11.vue'
import Template12 from './resume-templates/Template12.vue'
import Template13 from './resume-templates/Template13.vue'
import Template14 from './resume-templates/Template14.vue'
import Template15 from './resume-templates/Template15.vue'
import Template16 from './resume-templates/Template16.vue'
import Template17 from './resume-templates/Template17.vue'
import Template18 from './resume-templates/Template18.vue'
import Template19 from './resume-templates/Template19.vue'
import Template20 from './resume-templates/Template20.vue'

const props = defineProps<{
  templateId: string
  resume: {
    personalInfo: Record<string, any>
    experience: any[]
    education: any[]
    projects: any[]
    skills: string[]
  }
}>()

const componentMap: Record<string, any> = {
  'template-1': Template1SplitPaneLeft,
  'template-2': Template2SplitPaneRight,
  'template-3': Template3SwissA,
  'template-4': Template4SwissB,
  'template-5': Template5AsymmetricA,
  'template-6': Template6AsymmetricB,
  'template-7': Template7ExecutiveTA,
  'template-8': Template8ExecutiveTB,
  'template-9': Template9Timeline,
  'template-10': Template10Cards,
  'template-11': Template11,
  'template-12': Template12,
  'template-13': Template13,
  'template-14': Template14,
  'template-15': Template15,
  'template-16': Template16,
  'template-17': Template17,
  'template-18': Template18,
  'template-19': Template19,
  'template-20': Template20
}

const currentTemplateComponent = computed(() => componentMap[props.templateId] || Template1SplitPaneLeft)
</script>

<template>
  <component :is="currentTemplateComponent" :resume="resume" />
</template>
