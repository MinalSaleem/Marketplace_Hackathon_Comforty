import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { BsCartDash } from "react-icons/bs";
import { Product } from "@/components/(pages)/type";
import { client } from "@/sanity/lib/client";

export default async function Featuredproducts() {
  const products: Product[] =
    await client.fetch(`*[_type == "products" && "featured" in tags]{
      _id,
      title,
      price,
      "imageUrl":image.asset->url,
    }[0..3]`);

  console.log(products);

  return (
    <div className="">
      <div className="flex flex-row lg:py-14 lg:mx-[120px] mx-2">
        <p className="font-bold text-[32px] ">Featured Products</p>
      </div>

      <div className="mb-32 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9 mx-4 xl:gap-10">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white sm:bg-slate-500 w-[280px] sm:w-[312px] h-[377px] overflow-hidden hover:scale-105 hover:z-10 transition-transform duration-150"
          >
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={300}
              height={300}
              className="w-full h-[312px] object-cover "
            />
            <div className="p-0 flex flex-row justify-between mt-3 xl:px-7 ">
              <span>
                <h3 className="text-lg hover:text-[#029FAE] text-black font-normal">
                  {product.title}
                </h3>
                <p className="text-black text-xl font-bold">${product.price}</p>
              </span>
              <span className="text-gray-500">
                <Link href={`/products/${product._id}`}>
                  <Button
                    variant="outline"
                    className="hover:bg-[#029FAE] text-black hover:text-white border border-slate-300 bg-slate-300 hover:border rounded-xl "
                  >
                    <BsCartDash size={22} />
                  </Button>
                </Link>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
