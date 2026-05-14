<script setup lang="ts">
const auth = useAuthStore()

const items = [
  [{
    label: auth.user?.name || 'User',
    slot: 'account',
    disabled: true
  }],
  [{
    label: 'Logout',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: () => auth.logout()
  }]
]
</script>

<template>

   {{ auth.loading ? 'Loading...' : '' }}
  <UHeader :toggle="false">
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink> 
    </template>

    <template #right>
      <!-- Show this if NOT logged in -->
      
      <UButton
        v-if="!auth.isLoggedIn"
        label="Login"
        color="primary"
        trailing-icon="i-lucide-arrow-right" 
        to="/login"
      />

      <!-- Show this if Logged In -->
      <div v-else class="flex items-center gap-3">
        <UButton
          label="My Resumes"
          color="primary"
          variant="soft"
          to="/resumes"
          size="sm"
        />

        <UDropdown :items="items" :popper="{ placement: 'bottom-end' }">
          <UAvatar
            :alt="auth.user?.name"
            size="sm"
          />
          
          <template #account="{ item }">
            <div class="text-left">
              <p>Signed in as</p>
              <p class="truncate font-medium text-gray-900 dark:text-white">
                {{ auth.user?.email }}
              </p>
            </div>
          </template>
        </UDropdown>
      </div>
    </template>
  </UHeader>
</template>