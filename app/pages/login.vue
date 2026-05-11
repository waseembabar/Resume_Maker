<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '#ui/types'
const auth = useAuthStore()

definePageMeta({ layout: 'auth' })

const toast = useToast()
const loading = ref(false)

const fields = [
  { name: 'email', type: 'email', label: 'Email', placeholder: 'you@example.com', icon: 'i-heroicons-envelope' },
  { name: 'password', type: 'password', label: 'Password', placeholder: '••••••••', icon: 'i-heroicons-lock-closed' }
]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be 8+ characters')
})

async function onSubmit(payload: FormSubmitEvent<z.output<typeof schema>>) {
  loading.value = true
  try {
    const data = await $fetch('/api/auth/login', {
      method: 'POST',
      body: payload.data
    })
    toast.add({ title: 'Success', description: 'Welcome back!', color: 'green' })
    auth.setUser(data)
    navigateTo('/')
  } catch (err: any) {
    toast.add({ title: 'Error', description: err.data?.message || 'Login failed', color: 'red' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black px-4">
    <UCard class="w-full max-w-md border-t-4 border-primary">
      <template #header>
        <div class="text-center">
          <UIcon name="i-heroicons-pencil-square" class="w-10 h-10 text-primary mx-auto mb-2" />
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Resume Maker</h1>
          <p class="text-sm text-gray-500">Sign in to manage your professional profile</p>
        </div>
      </template>

      <UAuthForm
        :fields="fields"
        :schema="schema"
        :loading="loading"
        @submit="onSubmit"
        align="bottom"
        title=""
      >
        <template #description>
          New here? <ULink to="/signup" class="text-primary hover:underline">Create an account</ULink>
        </template>
        
        <template #password-hint>
          <ULink to="/forgot" class="text-xs text-primary">Forgot password?</ULink>
        </template>
      </UAuthForm>

      <template #footer>
        <div class="flex items-center justify-center gap-2 text-xs text-gray-400">
          <UIcon name="i-heroicons-shield-check" />
          Secure Enterprise Authentication
        </div>
      </template>
    </UCard>
  </div>
</template>