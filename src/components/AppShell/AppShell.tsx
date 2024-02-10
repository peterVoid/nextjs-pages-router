import Footer from "@/components/Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
type Props = {
  children: React.ReactNode;
};

const popins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const AppShell = ({ children }: Props) => {
  const { pathname } = useRouter();

  const check = ["/auth/register", "/auth/login", "/404"];

  return (
    <main className={popins.className}>
      {!check.includes(pathname) && <Navbar />}
      {children}
      <Footer />
    </main>
  );
};

export default AppShell;
