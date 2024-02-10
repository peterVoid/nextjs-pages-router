import LoginView from "@/views/auth/Login";
import Link from "next/link";
import { useRouter } from "next/router";

const LoginPages = () => {
  const { push } = useRouter();
  return <LoginView />;
};

export default LoginPages;
