import Image from "next/image";

const ViewsDetailProduct = ({ data }: { data: any }) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <Image
        src={data.image}
        alt="a"
        width={300}
        height={300}
        style={{
          objectFit: "cover",
          marginTop: "20px",
        }}
      />
      <p className="font-bold text-lg">{data.name}</p>
      <p>
        {data.price.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })}
      </p>
    </div>
  );
};

export default ViewsDetailProduct;
