<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'view-all'): void
}>()

const templates = [
  { id: 'template-1', label: 'Split-Pane (Left)' },
  { id: 'template-2', label: 'Split-Pane (Right)' },
  { id: 'template-3', label: 'Minimalist Grid (Swiss A)' },
  { id: 'template-4', label: 'Minimalist Grid (Swiss B)' },
  { id: 'template-5', label: 'Asymmetric Creative A' },
  { id: 'template-6', label: 'Asymmetric Creative B' },
  { id: 'template-7', label: 'Executive T-Shape A' },
  { id: 'template-8', label: 'Executive T-Shape B' },
  { id: 'template-9', label: 'Editorial Timeline' },
  { id: 'template-10', label: 'Modular Cards' }
]

const selectedTemplate = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="mb-4">
    <label class="block text-sm font-semibold mb-2">Choose Template</label>
    <div class="flex gap-2">
      <select
        v-model="selectedTemplate"
        class="w-80 rounded-lg border border-gray-300 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
      >
        <option
          v-for="item in templates"
          :key="item.id"
          :value="item.id"
        >
          {{ item.label }}
        </option>
      </select>
     
      <UButton color="neutral"  @click="emit('view-all')"> View all Template</UButton>
    </div>
  </div>
</template>
