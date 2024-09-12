import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";

function Header() {
  const { isSignedIn, user } = useUser();

  return (
    <div className="p-0 px-3 flex justify-between shadow-md items-center">
      <div className="flex justify-between items-center">
        <img
          loading="lazy"
          src="../images/logo.jpg"
          alt=""
          width={80}
          height={80}
        />
        <p className="flex items-center text-2xl font-bold animate-slidein">
          EASE
        </p>
      </div>

      {isSignedIn ? (
        <div className=" gap-2 flex items-center ">
          <Link to={"/dashboard"}>
            <Button variant="outline" hover:bg-sky-700>
              Dashboard
            </Button>
          </Link>
          <UserButton></UserButton>
        </div>
      ) : (
        <Link to={"/auth/signIn"}>
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
