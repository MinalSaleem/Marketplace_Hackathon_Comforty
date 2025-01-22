"use client";
import React from "react";
import Image from "next/image";
import { BsCartDash } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { useCart } from "./CardContext";
import { useState } from "react";

interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  inventory: number;
}

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailsProps) {
  const { dispatch } = useCart();
  const [inventory, setinventory] = useState(product.inventory); 
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    if (quantity < inventory) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1); 
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= inventory) {
      dispatchProductToCart(quantity);
      setinventory((previnventory) => previnventory - quantity);
    } else {
      alert("Invalid quantity or out of inventory!");
    }
  };

  const dispatchProductToCart = (quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          _id: product._id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1, 
        },
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row my-[60px] ">
      <div className="w-[90%] md:w-[350px] lg:w-[600px] h-[400px] md:h-[400px] lg:h-[600px] flex items-center justify-center mx-auto mt-5 lg:mt-0">
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={280}
          height={280}
          className="w-[300px] md:w-[350px] lg:w-[560px] h-[300px] md:h-[400px] lg:h-[560px]"
        />
      </div>

      <div className="w-full lg:w-[500px] h-auto lg:h-[600px] px-4 lg:py-5 py-0 ml-0 mr-0 lg:ml-3 lg:mr-20 divide-slate-300 divide-y-2">
        <div className="space-y-4 mb-9">
          <h1 className="text-[32px] md:text-[48px] font-bold">
            {product.title}
          </h1>
          <Button
            variant="outline"
            className="bg-[#029FAE] text-white rounded-full"
          >
            ${product.price} USD
          </Button>
        </div>
        <div className="space-y-4 pt-4">
          <p className="text-[12px] md:text-[14px] text-[#4F4F4F]">
            {product.description || "No description available."}
          </p>
          <p>
            Inventory: <span className="text-[#4F4F4F]">{inventory}</span>
          </p>

          <div className="flex items-center space-x-2 mb-4 border border-[#029FAE] rounded-md px-2 w-40 divide-x-2 divide-[#029FAE]">
            <button
              className={`font-bold text-xl px-2 ${quantity <= 1 ? "cursor-not-allowed opacity-50" : ""}`}
              onClick={decrementQuantity} 
              disabled={quantity <= 1} 
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              min="1"
              max={inventory}
              onChange={(e) =>
                setQuantity(
                  Math.max(1, Math.min(inventory, Number(e.target.value)))
                )
              } 
              className="mx-2 text-center border border-[#029FAE] focus focus:outline outline-[#029FAE] rounded-none"
            />
            <button
              className={`font-bold text-xl px-2  ${quantity >= inventory ? "cursor-not-allowed opacity-50" : ""}`}
              onClick={incrementQuantity} 
              disabled={quantity >= inventory}
            >
              +
            </button>
          </div>

          <Button
            variant="outline"
            onClick={handleAddToCart}
            className="bg-[#029FAE] text-white hover:bg-[#F0F2F3] hover:text-[#029FAE] hover:border hover:border-[#029FAE]"
          >
            <BsCartDash size={22} /> <span>Add to Cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
}