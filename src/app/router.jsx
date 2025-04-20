import { createBrowserRouter } from 'react-router-dom'

import AppLayout from '@/app/layouts/AppLayout.jsx'
import HomePage from '@/app/pages/HomePage/HomePage.jsx'
import GiveawaysPage from '@/app/pages/GiveawaysPage.jsx'
import NotFoundPage from '@/app/pages/NotFoundPage.jsx'
import BonusesPage from '@/app/pages/BonusesPage.jsx'
import LeaderboardPage from '@/app/pages/LeaderboardPage.jsx'
import ProfilePage from '@/app/pages/ProfilePage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
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
        element: <ProfilePage />
      },
    ],
  }
])

export default router