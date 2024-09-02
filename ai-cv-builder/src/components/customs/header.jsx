import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useUser, UserButton } from "@clerk/clerk-react"

function Header() {
    const { isSignedIn, user} = useUser()

  return (
    <div className="p-2 px-3 flex justify-between shadow-md">
      <img src="../images/logo.jpg" alt="" width={80} height={80} />

      {isSignedIn ? 
        <div className=" gap-2 flex items-center ">
          <Link to={'/dasboard'}>
            <Button variant = 'outline' hover:bg-sky-700  >Dashboard</Button>
          </Link>
            <UserButton></UserButton>
        </div> :
                <Link to={"/auth/signIn"}>
                <Button>Get Started</Button>
            </Link>
    
      }
    </div>
  )
}

export default Header
