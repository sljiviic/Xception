import { Outlet } from 'react-router-dom'
import classes from './AppLayout.module.css'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'

const AppLayout = () => {
  return (
    <div className={classes.wrapper}>
      <Header />
      <main className={classes.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout