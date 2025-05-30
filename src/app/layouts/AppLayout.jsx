import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import classes from './AppLayout.module.css'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import { AuthModal } from '@/features/auth'

const AppLayout = () => {
  return (
    <div className={classes.wrapper}>
      <Header />
      <main className={classes.main}>
        <Toaster
          position="top-right"
          offset={{ top: "85px" }}
          toastOptions={{
            className: 'custom-toast'
          }}
        />
        <Outlet />
        <AuthModal />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout