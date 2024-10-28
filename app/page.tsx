// import ProductCard from "@/components/ProductCard";
import InfiniteScroll from "./InfiniteScroll";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <div className=" pt-[25vh]">
      <h1 className="main-heading text-center text-4xl">Product List</h1>
      <Suspense fallback={<Loading />}>
        <InfiniteScroll></InfiniteScroll>
      </Suspense>
    </div>
  );
}
