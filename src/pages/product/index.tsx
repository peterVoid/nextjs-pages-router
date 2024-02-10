import { ModelProduct } from "@/modelProduct";
import ProductViews from "@/views/Product";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return (
    <>
      <h1 className="text-center text-3xl font-semibold mt-2">List Cars</h1>
      {!data && <div>Loading...</div>}
      <div className="flex items-center gap-5 mt-8 justify-center flex-wrap ">
        {data?.dec.map((item: ModelProduct) => (
          <div key={item.id}>
            <ProductViews data={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductPage;
