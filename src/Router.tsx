import { createBrowserRouter } from "react-router";
// Pages
import Home from "./pages/Home";
import Tank from "./pages/Tank"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path:"/tank",
    element: <Tank/>
  }
]);

export default router