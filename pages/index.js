import Head from "next/head";
import Image from "next/image";

// import CoffeeData from "../data/coffee-store.json";
import { fetchCoffeeStores } from "../lib/coffee-stores-http";

import { useCallback } from "react";

import Banner from "../components/Banner";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";

export async function getStaticProps(context) {
  // fetch(
  //   "https://api.foursquare.com/v3/places/search?ll=43.85728352435997,-79.2105165524424",
  //   {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: "fsq3Z+6Vd3gIYTuYd02D4dLeXFy7azgQfiY2sQdVCtydB9Y=",
  //     },
  //   }
  // )
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((err) => console.log(err));

  const storeData = await fetchCoffeeStores();
  // console.log(storeData)

  return {
    props: { CoffeeData: storeData }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const onClickHandler = () => {
    console.log("this is handle oneclick");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="Discover nearby Shops"
          handleOnclick={onClickHandler}
        />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} />
        </div>
        {props.CoffeeData.length > 0 && (
          <h2 className={styles.heading2}>Toronto Stores</h2>
        )}
        <div className={styles.cardLayout}>
          {props.CoffeeData.map((coffeeStore) => (
            <Card
              className={styles.card}
              key={coffeeStore.fsq_id}
              name={coffeeStore.name}
              imgUrl={coffeeStore.imgUrl}
              href={`/coffee-store/${coffeeStore.fsq_id}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
