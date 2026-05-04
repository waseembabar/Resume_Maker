<script setup lang="ts">
const route = useRoute()

 
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
      <TemplateMenu />
    </template>

    

    <template #right>
      <!-- <UColorModeButton /> -->

      <UButton
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        to="/login" 
      />
    

      
 

      
    </template>

    
  </UHeader>
</template>
