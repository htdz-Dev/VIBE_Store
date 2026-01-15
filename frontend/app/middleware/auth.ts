export default defineNuxtRouteMiddleware((to) => {
    const { status } = useAuth()

    // If user is not authenticated and tries to access protected routes
    const protectedRoutes = ['/account', '/orders', '/checkout']

    if (protectedRoutes.some(route => to.path.startsWith(route))) {
        if (status.value !== 'authenticated') {
            return navigateTo(`/login?redirect=${to.fullPath}`)
        }
    }

    // Redirect authenticated users away from auth pages
    const authRoutes = ['/login', '/register']

    if (authRoutes.includes(to.path)) {
        if (status.value === 'authenticated') {
            return navigateTo('/')
        }
    }
})
