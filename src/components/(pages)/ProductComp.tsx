import React from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import ProductInput from "./ProductInput";
import { Product } from "@/components/(pages)/type";

export default async function ProductComp() {
  const products: Product[] =
    await client.fetch(`*[_type == "products" && "instagram" in tags]{
        _id,
        title,
        price,
        "imageUrl":image.asset->url,
      }[0..5]`);

  console.log(products);

  return (
    <div className="bg-[#1E28320D]">
      <ProductInput />
      <div className="flex flex-row justify-center  lg:py-9">
        <p className="font-semibold text-[32px]">
          Follow products and discounts on Instagram
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2 mt-[40px] mx-2 xl:mx-9 lg:mx-9 md:mx-9 sm:mx-9">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white w-[186px] h-[186px] overflow-hidden xl:"
          >
            <Image
              src={product.imageUrl}
              alt="Picture"
              width={300}
              height={300}
              className="w-full h-[184px] object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
