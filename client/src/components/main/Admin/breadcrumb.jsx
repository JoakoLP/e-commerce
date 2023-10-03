import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Outlet, useLocation } from "react-router-dom";
import { AccountContext } from "../../../contexts/AccountProvider";
import { useContext } from "react";

const AdminBreadcrumb = ({ children }) => {
  const location = useLocation();

  let currentLink = "";
  let i = 0;
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;
      let esCrumb = "";
      // console.log(currentLink);
      switch (crumb) {
        case "admin":
          esCrumb = "Admin";
          break;
        case "userList":
          esCrumb = "Listado de Usuarios";
          break;
        case "category":
          esCrumb = "Editar Categorías";
          break;
        case "categories":
          esCrumb = "Categorías";
          break;
        case "subCategories":
          esCrumb = "Sub Categorías";
          break;
        case "products":
          esCrumb = "Productos";
          break;
        case "editlist":
          esCrumb = "Listado de Productos";
          break;
        case "add-product":
          esCrumb = "Agregar Producto";
          break;
        // case "":
        //   esCrumb = "";
        //   break;

        default:
          esCrumb = crumb.charAt(0).toUpperCase() + crumb.slice(1);
          break;
      }
      return (
        <>
          <Breadcrumb.Item icon={i == 0 ? HiHome : ""} className="h-6" href={currentLink} key={i++}>
            <p>{esCrumb}</p>
          </Breadcrumb.Item>
        </>
      );
    });

  const [user, setUser] = useContext(AccountContext);
  // console.log(user.isAdmin);
  if (user?.isAdmin) {
    return (
      <div className="min-h-[80vh]">
        <Breadcrumb aria-label="Default breadcrumb example" className="px-2 py-1.5">
          {crumbs}
        </Breadcrumb>
        <Outlet />
      </div>
    );
  } else {
    return <p>Acceso no autorizado.</p>;
  }
};

export default AdminBreadcrumb;
