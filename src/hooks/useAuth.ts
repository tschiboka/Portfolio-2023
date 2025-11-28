import { useAppContext } from '../context/AppContext'

export const useAuth = () => {
    const { user, isAuthenticated, isAuthLoading, authError } = useAppContext()
    
    return {
        user,
        isAuthenticated,
        isLoading: isAuthLoading,
        error: authError,
        isLoggedIn: isAuthenticated,
        isAdmin: user?.isAdmin || false,
        userName: user?.userName
    }
}
