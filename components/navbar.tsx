import MobileSidebar from "./sidebar/mobileSidebar";
import NavbarRoute from "./navbarRoute";

const Navbar = () => {
  return (
    <nav className="flex h-full items-center justify-between px-3 border-b-2 bg-white drop-shadow-md ">
      <MobileSidebar />
      <NavbarRoute />
    </nav>
  );
};

export default Navbar;
