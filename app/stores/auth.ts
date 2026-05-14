// stores/auth.ts
export const useAuthStore = defineStore('auth', () => {
  const user = ref(null) as Ref<{ id?: number, name: string, email: string, status?: string } | null>

const loading = ref(false)

  
  const isLoggedIn = computed(() => !!user.value)

  function setUser(userData: any) {
    user.value = userData
  }

  async function fetchUser() {
    try {
      // Set to true when starting
      loading.value = true 
      const data = await $fetch('/api/auth/user')
      user.value = data
      return data
    } catch (error) {
      user.value = null
      return null
    } finally {
      // Set to false when finished
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    navigateTo('/login')
  }

  return { user, isLoggedIn, setUser, fetchUser, logout }
})