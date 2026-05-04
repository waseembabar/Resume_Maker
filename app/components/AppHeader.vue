<template>
  <UHeader :links="[]">
    <!-- Your existing templates for #left and #right -->
    
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink> 
    </template>

    <template #right>
      <UButton
        label="login"
        color="primary"
        trailing-icon="i-lucide-arrow-right" 
        to="/login"
      />
    </template>
  </UHeader>
</template>


