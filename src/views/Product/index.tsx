import { ModelProduct } from "@/modelProduct";
import Image from "next/image";
import { useRouter } from "next/router";

const ProductViews = ({ data }: { data: ModelProduct }) => {
  const { push } = useRouter();
  return (
    <div className="flex flex-col gap-2">
      <img
        src={data.image}
        alt={data.name}
        style={{ width: "300px", height: "300px", objectFit: "cover" }}
      />
      <p className="font-bold text-lg">{data.name}</p>
      <button
        onClick={() => push(`/product/${data.id}`)}
        className="px-4 py-3     bg-red-900"
        style={{ border: "2px solid black" }}
      >
        Detail
      </button>
      <p>
        {data.price.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })}
      </p>
    </div>
  );
};

export default ProductViews;
