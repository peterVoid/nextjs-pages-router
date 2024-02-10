import Head from "next/head";
import Image from "next/image";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <Head>
        <title>Page Not Found</title>
      </Head>
      <Image src="/404.png" alt="not found" width={300} height={300} />
      <h3 className="text-3xl font-bold">Page Not Found</h3>
    </div>
  );
};

export default NotFoundPage;
