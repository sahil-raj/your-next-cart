"use client";

import ProductCard from "@/components/ProductCard";
import { HStack, Stack } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";
import { useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const getData = async ({
  pageParam = 1,
}: {
  pageParam: number;
}): Promise<ProductsResponse> => {
  const { data } = await axios.get(
    `https://dummyjson.com/products?limit=5&skip=${(pageParam - 1) * 5}`
  );
  return data;
};

const InfiniteScroll = ({}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: getData,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const totalFetched = allPages.length * 5;
        return totalFetched < lastPage.total ? allPages.length + 1 : undefined;
      },
    });

  const observer = useRef<IntersectionObserver>();
  const lastItemRef = useCallback(
    (node: Element) => {
      if (isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return (
    <>
      {" "}
      <div>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <p>Error loading products</p>
        ) : (
          <div>
            {data?.pages.map((page, pageIndex) => (
              <div key={pageIndex}>
                {page.products.map((product, index) => (
                  <div
                    key={product.id}
                    ref={
                      index === page.products.length - 1 ? lastItemRef : null
                    }
                  >
                    <ProductCard
                      productId={product.id}
                      key={product.id}
                      title={product.title}
                      description={product.description}
                      type="add"
                    ></ProductCard>
                  </div>
                ))}
              </div>
            ))}
            {isFetchingNextPage && (
              <HStack className="w-[80vw] my-12 ml-[10vw]" gap="5">
                <SkeletonCircle size="12" />
                <Stack flex="1">
                  <Skeleton height="10" />
                  <Skeleton height="10" width="80%" />
                </Stack>
              </HStack>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default InfiniteScroll;
