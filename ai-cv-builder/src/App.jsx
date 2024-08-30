import { Navigate, Outlet } from 'react-router-dom'
import './App.css'
import { useUser} from '@clerk/clerk-react'
import header from './components/customs/header'

function App() {
  const { isSignedIn, user, isLoaded } = useUser()
  if (!isSignedIn && isLoaded) {
    return < Navigate to={'/auth/signIn'} />
  }


  return (
    <>
      <header/>
      <Outlet/>
    </>
    
  )
}

export default App
