"use client";

import { Card } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const ProductCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Card.Root className="mt-12 rounded-xl ml-[10vw]" width="80vw">
      <Card.Body gap="2">
        <Avatar
          src="https://picsum.photos/200/300"
          name="Nue Camp"
          size="lg"
          shape="rounded"
        />
        <Card.Title mt="2">{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button onClick={() => alert()}>Add to cart</Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
