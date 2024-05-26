import React from "react";
import Search from "./search";
import Logo from "./logo";
import UserInformation from "./userInformation";

function Header() {
  return (
    <div className="w-full flex bg-primary p-4 items-center justify-center">
      <div className="w-11/12 grid grid-cols-12 justify-between items-center gap-4">
        <div className="col-span-6 md:col-span-2 lg:col-span-2">
          <Logo />
        </div>
        <div className="col-span-0 md:col-span-8 hidden md:inline-block">
          <Search />
        </div>
        <div className="col-span-6 md:col-span-2 lg:col-span-2">
          <UserInformation />
        </div>
      </div>
    </div>
  );
}

export default Header;
