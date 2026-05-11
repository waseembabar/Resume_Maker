// stores/auth.ts
export const useAuthStore = defineStore('auth', () => {
  const user = ref(null) as Ref<{ name: string, email: string } | null>

  const isLoggedIn = computed(() => !!user.value)

  function setUser(userData: any) {
    user.value = userData
  }

  function logout() {
    user.value = null
    navigateTo('/login')
  }

  return { user, isLoggedIn, setUser, logout }
})