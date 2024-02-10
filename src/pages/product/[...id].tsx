import ViewsDetailProduct from "@/views/Product/ViewsDetailProduct";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const PropsProduct = () => {
  const { query } = useRouter();
  const { data, error, isLoading } = useSWR(
    `http://localhost:3000/api/hello/${query.id}`,
    fetcher
  );

  return (
    <div>
      <Head>
        <title>Detail Product</title>
      </Head>
      <h1 className="text-3xl font-bold text-center mt-2">Detail </h1>
      {data && <ViewsDetailProduct data={data.dec} />}
    </div>
  );
};
export default PropsProduct;
