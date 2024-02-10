import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();
  return (
    <nav className="bg-gray-800 w-[90vw] m-auto h-[30px] flex justify-between items-center rounded-br-[10px] rounded-bl-[10px] py-[30px] px-11">
      <div className="text-white font-bold text-2xl">Navbar</div>
      <div className="flex items-center gap-4">
        <img
          src={data?.user?.image || ""}
          alt="Profile"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
        <p className="text-white font-semibold">{data?.user?.email}</p>
        {data ? (
          <button
            className="text-white bg-black p-3 rounded-xl"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="text-white bg-black p-3 rounded-xl"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
