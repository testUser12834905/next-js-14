import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type props = { children: React.ReactNode };

const Layout = ({ children }: props) => {
  const cookieStore = cookies();
  if (cookieStore.has("isLoggedIn")) {
    redirect("/movies");
  }

  return <>{children}</>;
};

export default Layout;
