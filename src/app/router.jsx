import { createBrowserRouter, redirect } from 'react-router-dom'
import { useAuthStore } from '@/features/auth'

import AppLayout from '@/app/layouts/AppLayout'
import HomePage from '@/app/pages/HomePage/HomePage'
import GiveawaysPage from '@/app/pages/GiveawaysPage/GiveawaysPage'
import NotFoundPage from '@/app/pages/NotFoundPage/NotFoundPage'
import BonusesPage from '@/app/pages/BonusesPage/BonusesPage'
import LeaderboardPage from '@/app/pages/LeaderboardPage/LeaderboardPage'
import ProfilePage from '@/app/pages/ProfilePage/ProfilePage'
import TermsAndConditions from '@/app/pages/TermsAndConditions/TermsAndConditions'
import PrivacyPolicy from '@/app/pages/PrivacyPolicy/PrivacyPolicy'
import Faq from '@/app/pages/Faq/Faq'
import AuthorizePage from '@/app/pages/AuthorizePage/AuthorizePage'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    loader: async () => {
      if (!useAuthStore.getState().isAuthenticated) {
        await useAuthStore.getState().initializeAuth()
      }
      return null
    },
    hydrateFallbackElement: <LoadingSpinner size='medium' />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'giveaways',
        element: <GiveawaysPage />
      },
      {
        path: 'bonuses',
        element: <BonusesPage />
      },
      {
        path: 'leaderboard',
        element: <LeaderboardPage />
      },
      {
        path: 'profile',
        element: <ProfilePage />,
        loader: async () => {
          if (!useAuthStore.getState().isAuthenticated) throw redirect('/authorize?from=/profile')
          return null
        },
      },
      {
        path: 'privacy-policy',
        element: <PrivacyPolicy />
      },
      {
        path: 'faq',
        element: <Faq />
      },
      {
        path: 'terms-and-conditions',
        element: <TermsAndConditions />
      }
    ],
  },
  {
    path: '/authorize',
    element: <AuthorizePage />,
    errorElement: <NotFoundPage />,
  }
], {
  future: {
    v7_partialHydration: true,
  },
})

export default router