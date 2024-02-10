import { signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();
  const [error, setError] = useState("");
  const callbackUrl: any = query?.callbackUrl || "/";
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl,
      });
      if (!data?.error) {
        push(callbackUrl);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError("Not valid");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-[100vh] flex-col">
      <Head>
        <title>Login</title>
      </Head>
      <h1 className="text-3xl font-semibold">Login</h1>
      <p>{error ? error : ""}</p>
      <div className="p-3">
        <form
          onSubmit={handleLogin}
          style={{
            border: "1px solid black",
            padding: "10px",
            borderRadius: "5px",
            width: "300px",
            maxWidth: "500px",
          }}
        >
          <div className="flex flex-col gap-3">
            <label>Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              style={{ backgroundColor: "#f0f0f0", padding: "5px" }}
              id="email"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label>Password</label>
            <input
              id="password"
              type="password"
              style={{ backgroundColor: "#f0f0f0", padding: "5px" }}
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white w-full px-3 py-2 rounded-lg pt-5 mt-10"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <button
          onClick={() =>
            signIn("google", {
              callbackUrl,
              redirect: false,
            })
          }
        >
          Sign In With Google
        </button>
      </div>
      <p>
        Belum punya akun?{" "}
        <Link href={"/auth/register"} style={{ color: "blue" }}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginView;
