import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Product } from "./type";
import { client } from "@/sanity/lib/client";

export default async function DetailComp() {
  const products: Product[] =
    await client.fetch(`*[_type == "products" && "featured" in tags]{
      _id,
      title,
      price,
      "imageUrl":image.asset->url,
    }[0..4]`);

  console.log(products);

  return (
    <div>
      <div className="flex flex-row ml-8 lg:mx-[20px] lg:pb-9 lg:pt-5 justify-between">
        <p className="font-bold text-[28px] tracking-wide">FEATURED PRODUCTS</p>
        <span>
          <Link href={"/products"}>
            <Button className="border-b-2 border-black">View all</Button>
          </Link>
        </span>
      </div>

      <div className="mb-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-9 mx-2 xl:mx-2 xl:gap-8 ">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white w-[230px] h-[306px] overflow-hidden xl:px-3"
          >
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={300}
              height={300}
              className="w-full h-[263px] object-cover"
            />
            <div className="p-0 flex flex-row justify-between mt-3">
              <h3 className="text-lg hover:text-[#029FAE] text-black font-normal">
                {product.title}
              </h3>
              <p className="text-black text-xl font-bold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
