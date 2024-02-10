export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/hello");
}
