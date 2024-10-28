import { Suspense } from "react";
import Loading from "./loading";

const cart = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <h1>Hello</h1>
      </Suspense>
    </>
  );
};

export default cart;
