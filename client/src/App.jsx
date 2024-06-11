import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Scanner from "./pages/Scanner";
import Info from "./pages/Info";
import Allergens from "./pages/Allergens";
import "./style.scss";

// Layout for every subpage
const Layout = () => {
  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    // Outlet - different subpages
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Scanner />
      },
      {
        path: "/allergens",
        element: <Allergens />
      },
      {
        path: "/info",
        element: <Info />
      },
    ]
  },
]);

function App() {
  return (
    <>
      <div className="app">
        <div className="container">
          <RouterProvider router={router} />
        </div>
      </div>
    </>
  );
}

export default App;
