import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BsX } from "react-icons/bs";
import { Products } from "@/types";
import { FiltersModal } from "@/components/FiltersModal";
import Select from "@/components/Select";
import { getAllProducts } from "@/services/products";
import { Spinner } from "@/components/Spinner";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Products | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [filters, setFilters] = useState<Record<string, any> | null>(null);

  const apiCall = async () => {
    setIsLoading(true);
    try {
      const url = `/api/products?page=${page}&perPage=${perPage}&${new URLSearchParams(
        {
          ...filters,
        }
      ).toString()}`;
      const res = await getAllProducts(url);
      setData(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page, perPage]);

  const handleSelect = (e: string) => {
    setPerPage(Number(e));
  };

  const deleteFilter = (name: string) => {
    let newFilters = {};
    for (let key in filters) {
      if (key !== name) {
        (newFilters as Record<string, any>)[key] = filters[key];
      }
    }
    setFilters(newFilters);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <Layout>
          <div className={styles.filters}>
            <button onClick={() => setOpen(!open)}>Filters</button>
          </div>

          <div className={styles.badgeContainer}>
            {filters &&
              Object.keys(filters).map((filter) => (
                <div className={styles.badge} key={filter}>
                  <div>
                    <span>{filter}</span>: <span>{filters[filter]}</span>
                  </div>
                  <span
                    className={styles.badgeBTN}
                    onClick={() => deleteFilter(filter)}
                  >
                    <BsX />
                  </span>
                </div>
              ))}
          </div>

          {isLoading ? (
            <Spinner />
          ) : (
            <section className={styles.grid}>
              {data &&
                data?.items?.map((item: any) => (
                  <Card
                    key={item?._id}
                    title={item?.title}
                    price={item?.price}
                    image={item?.img}
                    id={item?._id}
                  />
                ))}
            </section>
          )}
          <div className={styles.pagination}>
            <div className={styles.selectContainer}>
              <Select
                onChange={(e) => handleSelect(e)}
                value={perPage}
                data={[
                  { label: "5", value: 5 },
                  { label: "10", value: 10 },
                ]}
              />
              {"  "}
              <span>Total Items: {data?.total}</span>
            </div>
            <div className={styles.pagesContainer}>
              <button
                onClick={() => {
                  data && data?.prev_page ? setPage(page - 1) : 1;
                }}
              >
                <AiOutlineArrowLeft />
              </button>
              <span>
                {page} of {data?.total_pages}
              </span>
              <button
                onClick={() => {
                  data && data?.next_page ? setPage(page + 1) : page;
                }}
              >
                <AiOutlineArrowRight />
              </button>
            </div>
          </div>
          {open && (
            <FiltersModal
              onClose={setOpen}
              filters={filters}
              setFilters={setFilters}
            />
          )}
        </Layout>
      </main>
    </>
  );
}
