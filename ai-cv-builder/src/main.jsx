import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import SignInPage from './components/Auth/index.jsx'
import HomePage from './AppLayouts/home/homePage.jsx'
import DashboardPage from './AppLayouts/dashboard/dashboardPage.jsx'
import { ClerkProvider, } from '@clerk/clerk-react'
import EditResume from './AppLayouts/dashboard/Resume/[resumeID]/edit/editResume.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const router = createBrowserRouter ([
    {
      element: <App/>,
      children:[
        {
          path: '/dashboard',
          element: <DashboardPage/>
        },
        {
          path:'/dashboard/resume/:resumeId/edit',
          element: <EditResume/>
        }
      ]
    },
    {
      path: '/home',
      element: <HomePage/>
    },

    {
      path:'/auth/signIn',
      element: <SignInPage/>
    },
    {
      
    }

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router = {router}/>
    </ClerkProvider>
  </StrictMode>,
)
