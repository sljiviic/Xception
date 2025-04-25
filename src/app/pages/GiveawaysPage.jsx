// import LoginForm from "../../features/auth/components/LoginForm/LoginForm"
// import LoginModal from "../../features/auth/components/LoginModal/LoginModal"
import AuthModal from "../../features/auth/components/AuthModal/AuthModal"
import RegisterForm from "../../features/auth/components/RegisterForm/RegisterForm"

const GiveawaysPage = () => {
  return (
    <div>
      <p>Giveaways page</p>
      {/* <LoginForm /> */}
      {/* <RegisterForm /> */}
      <AuthModal 
        isOpen={true}
        onClose={() => {}}
        defaultView='login'
      />
      {/* <LoginModal /> */}
    </div>
  )
}

export default GiveawaysPage