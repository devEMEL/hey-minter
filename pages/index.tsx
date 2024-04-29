// This is the main page of the app

// Import the AddProductModal and ProductList components
import AddProductModal from "@/components/AddProductModal";
import Layout from "@/components/Layout";
import ProductList from "@/components/ProductList";
import Head from "next/head";

// Export the Home component
export default function Home() {
  return (
    <div>
      <Head>
        <title>NewzPay</title>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
      </Head>
      <AddProductModal />
      <ProductList />
    </div>
  );
}
