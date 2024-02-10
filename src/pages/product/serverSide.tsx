import { ModelProduct } from "@/modelProduct";
import ProductViews from "@/views/Product";

const serverSide = ({ data }: { data: any }) => {
  return (
    <>
      <h1 className="text-center text-3xl font-semibold mt-2">List Cars</h1>
      {!data && <div>Loading...</div>}
      <div className="flex items-center gap-5 mt-8 justify-center flex-wrap ">
        {data.map((item: ModelProduct) => (
          <div key={item.id}>
            <ProductViews data={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default serverSide;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/hello");
  const ret: any = await res.json();
  return {
    props: {
      data: ret.dec,
    },
  };
}
