"use client";

import { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { HStack, Stack } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";
import axios from "axios";

const getItem = async (item: number) => {
  const { data } = await axios.get(`https://dummyjson.com/products/${item}`);
  return data;
};

const Cart = () => {
  const [productsData, setProductsData] = useState<number[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") as string);
    if (cart) setProductsData(cart);
  }, []);

  const products: number[] = useQueries({
    queries: productsData.map((item) => ({
      queryKey: ["post", item],
      queryFn: () => getItem(item),
      staleTime: Infinity,
    })),
  });

  console.log(products[0]);

  return (
    <div>
      <h1 className="pt-[25vh] main-heading text-center text-4xl">
        Products in Cart
      </h1>
      {products.map((product) =>
        product.isLoading ? (
          <HStack className="w-[80vw] my-12 ml-[10vw]" gap="5" key={product}>
            <SkeletonCircle size="12" />
            <Stack flex="1">
              <Skeleton height="10" />
              <Skeleton height="10" width="80%" />
            </Stack>
          </HStack>
        ) : (
          <ProductCard
            productId={product.data.id}
            key={product.data.id}
            title={product.data.title}
            description={product.data.description}
            type="remove"
          ></ProductCard>
        )
      )}
    </div>
  );
};

export default Cart;
