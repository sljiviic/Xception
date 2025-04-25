import { useAuthStore } from '../stores/useAuthStore'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// Hook for accessing user data and authentication state
// requireAuth - Redirect to login if not authenticated
// redirectPath - Custom redirect path (default: '/login')
export const useUser = (requireAuth = false, redirectPath) => {
  const {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    initializeAuth,
  } = useAuthStore((state) => ({
    user: state.user,
    accessToken: state.accessToken,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    initializeAuth: state.initializeAuth,
  }))

  const navigate = useNavigate();
  const location = useLocation();

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Handle authentication requirements
  useEffect(() => {
    if (requireAuth && !isAuthenticated && !isLoading) {
      navigate(redirectPath || '/login', {
        replace: true,
        state: { from: location.pathname },
      });
    }
  }, [
    requireAuth,
    redirectPath,
    isAuthenticated,
    isLoading,
    navigate,
    location.pathname,
  ]);

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
  };
};
