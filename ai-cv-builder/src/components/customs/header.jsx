import { Button } from "@/components/ui/button"

function Header() {
  return (
    <div className="p-3 px-3 flex justify-between shadow-md">
      <img src="../images/logo.jpg" alt="" width={80} height={80} />
      <Button>Get Started</Button>
    </div>
  )
}

export default Header
