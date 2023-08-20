import Layout from "@/components/Layout";
import { Spinner } from "@/components/Spinner";
import { getProduct } from "@/services/products";
import { Inter } from "next/font/google";
import { Item } from "@/types";
import styles from "./product.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const Product = () => {
  const { query } = useRouter();
  const [data, setData] = useState<Item>();
  const [isLoading, setIsLoading] = useState(false);

  const apiCall = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await getProduct(id);
      setData(res[0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    apiCall(query.id as string);
  }, [query.id]);

  console.log(data);
  return (
    <Layout>
      <main className={inter.className}>
        {isLoading && <Spinner />}
        <section className={styles.container}>
          <img src={data?.img} alt={data?.title} className={styles.image} />
          <div>
            <h3>{data?.title}</h3>
            <p>${data?.price}</p>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Product;
