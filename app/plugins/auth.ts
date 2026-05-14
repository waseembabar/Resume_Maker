// app/plugins/auth.ts
export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore()
  
  // Fetch user data on app initialization to restore session after refresh
  await auth.fetchUser()
})