import { defineStore } from 'pinia'

export interface User {
    id: number
    name: string
    email: string
    phone?: string
    address?: string
    city?: string
    wilaya?: string
    is_admin: boolean
}

interface AuthState {
    isLoading: boolean
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        isLoading: false,
    }),

    getters: {
        // Use nuxt-auth composable for auth state
        user(): User | null {
            if (import.meta.client) {
                const { data } = useAuth()
                return data.value as User | null
            }
            return null
        },

        token(): string | null {
            if (import.meta.client) {
                const { token } = useAuth()
                return token.value
            }
            return null
        },

        isAuthenticated(): boolean {
            if (import.meta.client) {
                const { status } = useAuth()
                return status.value === 'authenticated'
            }
            return false
        },

        isAdmin(): boolean {
            return this.user?.is_admin ?? false
        },
    },

    actions: {
        async register(data: { name: string; email: string; password: string; password_confirmation: string; phone?: string }) {
            this.isLoading = true

            try {
                const { signUp } = useAuth()
                await signUp(data, { callbackUrl: '/' })
                return { success: true }
            } catch (error: any) {
                return {
                    success: false,
                    error: error.data?.message || 'Registration failed'
                }
            } finally {
                this.isLoading = false
            }
        },

        async login(email: string, password: string) {
            this.isLoading = true

            try {
                const { signIn } = useAuth()
                await signIn({ email, password }, { callbackUrl: '/' })
                return { success: true }
            } catch (error: any) {
                return {
                    success: false,
                    error: error.data?.message || 'Login failed'
                }
            } finally {
                this.isLoading = false
            }
        },

        async logout() {
            try {
                const { signOut } = useAuth()
                await signOut({ callbackUrl: '/' })
            } catch (e) {
                // Ignore logout errors
            }
        },

        async fetchUser() {
            try {
                const { getSession } = useAuth()
                await getSession()
            } catch (e) {
                // Session fetch failed
            }
        },

        async updateProfile(data: Partial<User>) {
            const config = useRuntimeConfig()
            const { token } = useAuth()

            if (!token.value) return { success: false, error: 'Not authenticated' }

            try {
                const response = await $fetch<{ user: User }>(`${config.public.apiBase}/user/profile`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token.value}`,
                    },
                    body: data,
                })

                // Refresh session to get updated user data
                const { getSession } = useAuth()
                await getSession()

                return { success: true }
            } catch (error: any) {
                return {
                    success: false,
                    error: error.data?.message || 'Update failed'
                }
            }
        },
    },
})
