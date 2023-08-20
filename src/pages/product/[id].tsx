import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Spinner } from "@/components/Spinner";
import { getProduct } from "@/services/products";
import { Inter } from "next/font/google";
import { Item } from "@/types";
import styles from "./product.module.css";
import { useRouter } from "next/router";
import { CTAModal } from "@/components/CTAModal";

const inter = Inter({ subsets: ["latin"] });

const Product = () => {
  const { query, push } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    apiCall(query.id as string);
  }, [query.id]);

  return (
    <main className={inter.className}>
      <Layout>
        {isLoading && <Spinner />}
        <section className={styles.container}>
          <img src={data?.img} alt={data?.title} />
          <div className={styles.dataContainer}>
            <span onClick={() => push("/")}>Back to catalog</span>
            <h3>{data?.title}</h3>
            <p>${data?.price}</p>
            <h4 className={styles.description}>Description</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
              cupiditate. Fuga distinctio repudiandae, ipsa vel incidunt,
              accusamus atque optio reprehenderit magni nostrum est. Aspernatur
              numquam dignissimos officiis facere quos necessitatibus.
            </p>
            <button onClick={() => setOpen(true)}>CTA</button>
          </div>
        </section>
        {open && <CTAModal onClose={setOpen} />}
      </Layout>
    </main>
  );
};

export default Product;
