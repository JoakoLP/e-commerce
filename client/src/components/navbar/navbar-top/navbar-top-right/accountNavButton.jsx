import { useContext } from "react";
import { AccountContext } from "../../../../contexts/AccountProvider";
import { Link } from "react-router-dom";

const AccountNavButton = ({ setMenuMobileIsOpen }) => {
  const [user, setUser] = useContext(AccountContext);

  const SERVER_URL = "https://e-commerce-api.joaquintakara.com";
  // const SERVER_URL = "http://localhost:8080";

  const defaultUser = `${SERVER_URL}/public/default/user-avatar.png`;

  return (
    <Link
      to={"/account"}
      onClick={() => {
        setMenuMobileIsOpen(false);
      }}
    >
      <div className="flex items-center justify-center space-x-2 flex-nowrap">
        <img src={user?.avatar ? user?.avatar : defaultUser} alt="" className="object-cover border rounded-full aspect-square h-11 border-cyan-700" />
        <p>{user ? user?.username : "Cuenta"}</p>
      </div>
    </Link>
  );
};

export default AccountNavButton;
