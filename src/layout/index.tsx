import { Outlet } from "react-router-dom";
import Header from "./components/header";

function Layout() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header />
      <div className="w-11/12 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
