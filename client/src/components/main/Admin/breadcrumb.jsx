import { Outlet, useLocation } from "react-router-dom";
import { AccountContext } from "../../../contexts/AccountProvider";
import { useContext } from "react";
import { Breadcrumbs, ThemeProvider } from "@material-tailwind/react";

const AdminBreadcrumb = ({ children }) => {
  const location = useLocation();

  let currentLink = "/admin";
  let i = 0;
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "admin")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;
      let esCrumb = "";
      switch (crumb) {
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
          <a href={currentLink} className="text-xs md:text-sm whitespace-nowrap">
            <span>{esCrumb}</span>
          </a>
        </>
      );
    });

  const [user, setUser] = useContext(AccountContext);

  const theme = {
    breadcrumbs: {
      defaultProps: {
        className: "",
        fullWidth: false,
        separator: "/",
      },
      styles: {
        base: {
          root: {
            initial: {
              width: "w-max",
            },
            fullWidth: { display: "block", width: "!w-full" },
          },
        },
      },
    },
  };

  if (user?.isAdmin) {
    return (
      <div className="min-h-[80vh]">
        <ThemeProvider value={theme}>
          <Breadcrumbs fullWidth className="!w-full">
            <a href="/admin">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            {crumbs}
          </Breadcrumbs>
        </ThemeProvider>
        <Outlet />
      </div>
    );
  } else {
    return <p>Acceso no autorizado.</p>;
  }
};

export default AdminBreadcrumb;
