import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

const Navbar = ({}) => {
  return (
    <div className="fixed flex w-[90%] h-24 bg-transparent bg-opacity-50 justify-between align-middle items-center z-50 backdrop-blur-2xl mx-auto rounded-full top-5 left-[5%] shadow-xl p-8 cursor-pointer">
      <Link href="/">
        <h1 className=" cursor-pointer main-heading text-5xl text-black ml-7 mix-blend-difference">
          THE CART by sahil
        </h1>
      </Link>
      <div className="flex row">
        <div className="mr-7">
          <Link href={"/cart"}>
            <FaShoppingCart size={48} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
