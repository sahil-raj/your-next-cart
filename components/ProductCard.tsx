import { Card } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const addToCart = ({ productId }: { productId: number }): void => {
  if (localStorage.getItem("cart")) {
    const cart: number[] = JSON.parse(localStorage.getItem("cart") as string);

    if (!cart.includes(productId)) {
      cart.push(productId);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  } else {
    localStorage.setItem("cart", JSON.stringify([productId]));
  }
};

const removeFromCart = ({ productId }: { productId: number }): void => {
  let cart: number[] = JSON.parse(localStorage.getItem("cart") as string);
  cart = cart.filter((x) => x != productId);
  localStorage.setItem("cart", JSON.stringify(cart));
};

const ProductCard = ({
  title,
  description,
  productId,
  type,
  onRemove,
}: {
  title: string;
  description: string;
  productId: number;
  type: "add" | "remove";
  onRemove?: (productId: number) => void;
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
        <Button
          onClick={() => {
            if (type == "add") {
              addToCart({ productId });
            } else {
              removeFromCart({ productId });
              onRemove && onRemove(productId); // call the callback when removed
            }
          }}
        >
          {type}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
