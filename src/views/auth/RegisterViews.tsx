import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterViews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const [error, setError] = useState("");
  const handleRegister = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        email: e.currentTarget.email.value,
        fullname: e.currentTarget.fullname.value,
        password: e.currentTarget.password.value,
      };
      const pe = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (pe.status === 200) {
        push("/auth/login");
        e.target.reset();
      } else {
        setError(
          pe.status === 400 ? "Email Already Exist" : "Something went wrong"
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-[100vh] flex-col">
      <h1 className="text-3xl font-semibold">Register</h1>
      <p>{error ? error : ""}</p>
      <div className="p-3">
        <form
          onSubmit={handleRegister}
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
            <label>Fullname</label>
            <input
              id="fullname"
              type="text"
              placeholder="Fullname"
              style={{ backgroundColor: "#f0f0f0", padding: "5px" }}
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
      </div>
      <p>
        Sudah punya akun? login{" "}
        <Link href={"/auth/login"} style={{ color: "blue" }}>
          disini
        </Link>
      </p>
    </div>
  );
};

export default RegisterViews;
