import { ModelProduct } from "@/modelProduct";
import ProductViews from "@/views/Product";

const staticSide = ({ data }: { data: any }) => {
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

export default staticSide;

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/hello");
  const repo = await res.json();
  return {
    props: {
      data: repo.dec,
    },
    revalidate: 10,
  };
}
