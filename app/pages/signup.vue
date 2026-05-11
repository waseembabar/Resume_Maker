<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Sign up',
  description: 'Create an account to get started'
})

const toast = useToast()
const loading = ref(false)

const fields = [{
  name: 'name',
  type: 'text' as const,
  label: 'Name',
  placeholder: 'Enter your name',
  icon: 'i-heroicons-user'
}, {
  name: 'email',
  type: 'text' as const,
  label: 'Email',
  placeholder: 'Enter your email',
  icon: 'i-heroicons-envelope'
}, {
  name: 'password',
  label: 'Password',
  type: 'password' as const,
  placeholder: 'Enter your password',
  icon: 'i-heroicons-lock-closed'
}]

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: payload.data
    })

    toast.add({
      title: 'Success!',
      description: 'Account created. Redirecting to login...',
      color: 'green',
      icon: 'i-heroicons-check-circle'
    })

    // Short delay so user can see the success message
    setTimeout(async () => {
      await navigateTo('/login')
    }, 1500)

  } catch (err: any) {
    toast.add({
      title: 'Registration Error',
      description: err.data?.statusMessage || 'Something went wrong with the database connection.',
      color: 'red',
      icon: 'i-heroicons-exclamation-circle'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UAuthForm
    :fields="fields"
    :schema="schema" 
    title="Create an account"
    align="top"
    icon="i-heroicons-user-plus"
    :loading="loading"
    :submit="{ label: 'Create account' }"
    @submit="onSubmit"
  >
    <template #description>
      Already have an account? 
      <ULink
        to="/login"
        class="text-primary font-medium"
      >Login</ULink>.
    </template>

    <template #footer>
      By signing up, you agree to our 
      <ULink
        to="/"
        class="text-primary font-medium"
      >Terms of Service</ULink>.
    </template>
  </UAuthForm>
</template>