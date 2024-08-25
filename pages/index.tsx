
import AddCollectionModal from "@/components/AddCollectionModal";
import Head from "next/head";

// Export the Home component
export default function Home() {
  return (
    <div>
      <Head>
        <title>Hey Minter</title>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
      </Head>
      <AddCollectionModal />
      {/* <ProductList /> */}
    </div>
  );
}
