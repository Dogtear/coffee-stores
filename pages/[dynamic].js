import { useRouter } from "next/router";
import Head from "next/head";

const DynamicRoute = () => {
  const router = useRouter();

  const dynamicRouterPass = router.query.dynamic;
  return (
    <div>
      <Head>
        <title>dynamicRouterPass</title>
      </Head>
      <h1>this is dynamic route : {dynamicRouterPass}</h1>
    </div>
  );
};

export default DynamicRoute;
