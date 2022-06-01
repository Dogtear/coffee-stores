import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import coffeeStoreData from "../../data/coffee-store.json";
import { fetchCoffeeStores } from "../../lib/coffee-stores-http";

import styles from "../../styles/coffee-store.module.css";

export const getStaticProps = async (staticProps) => {
  const params = staticProps.params;

  const fetchCoffeeStoreResult = await fetchCoffeeStores(
    "https://api.foursquare.com/v3/places/search?ll=-8.818170671067918,115.21708816032742&query=coffee%20shop&limit=6"
  );

  return {
    props: {
      coffeeStore: fetchCoffeeStoreResult.results.find(
        (coffeeStore) => coffeeStore.fsq_id.toString() === params.id
      ),
    },
  };
};

export async function getStaticPaths() {
  const fetchCoffeeStoreResult = await fetchCoffeeStores(
    "https://api.foursquare.com/v3/places/search?ll=-8.818170671067918,115.21708816032742&query=coffee%20shop&limit=6"
  );

  const coffeIdArr = fetchCoffeeStoreResult.results.map((store) => ({
    params: { id: store.fsq_id.toString() },
  }));
  return {
    paths: coffeIdArr,
    // fallback: false,

    // use for caching data that happen to have but not loaded in getStaticPath
    // paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();

  console.log(props.coffeeStore);
  const routerId = router.query.id;

  if (router.isFallback) {
    return <div className="test">Loading....</div>;
  }
  // const { address, name, neighbourhood, imgUrl } = props.coffeeStore;
  const { name, location, imgUrl } = props.coffeeStore;

  const handleUpvoteButton = () => {
    console.log("test");
  };

  const imageContent = () => {
    const imgContent = (
      <Image
        className={styles.storeImg}
        alt={name}
        src={imgUrl}
        width={600}
        height={360}
      />
    );

    const defaultImage = (
      <Image
        className={styles.storeImg}
        alt={name}
        src="https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
        width={600}
        height={360}
      />
    );

    return props.image ? imageContent : defaultImage;
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>Back To Home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          {imageContent()}
        </div>
        <div className={`glass ${styles.col2}`}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icon/places.svg" width={24} height={24} />
            <p className={styles.text}>{location.address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icon/nearMe.svg" width={24} height={24} />
            <p className={styles.text}>{location.cross_street}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icon/star.svg" width={24} height={24} />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote
          </button>
        </div>
      </div>
    </div>
  );
};
export default CoffeeStore;
