import { createBrowserRouter, redirect } from "react-router";
import RootLayout from "./layouts/RootLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Facilities from "./pages/Facilities";
import Gallery from "./pages/Gallery";
import Visit from "./pages/Visit";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";

function requireAuth() {
  if (localStorage.getItem("admin_auth") !== "true") {
    throw redirect("/admin/login");
  }
  return null;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "facilities", Component: Facilities },
      { path: "gallery", Component: Gallery },
      { path: "visit", Component: Visit },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/admin/login",
    Component: Login,
  },
  {
    path: "/admin",
    loader: requireAuth,
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
    ],
  },
]);
