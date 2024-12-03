import Image from "next/image";
import BannerPic from "@/assets/banner.jpg"
import products from "@/products";
import { OrderPlacerBar, OrderSpinner } from "./components/OrderContext";
import { LoginButton, LogoutButton } from "./components/Buttons";
import { auth } from "@/auth";
import { Suspense } from "react";
import Link from "next/link";

async function AccountButton() {
  const session = await auth()
  if (!session) return (<LoginButton/>)
  
  const user = session?.user
  return (
    <div className="flex gap-3 items-center">
      <LogoutButton />
      <Link href={"/account"}>
        <Image src={user?.image ?? ""} width={100} height={100} alt="Profile" className="h-8 w-8 rounded-full mr-4" />
      </Link>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed flex justify-between h-24 pb-8 px-2 items-center top-0 right-0 left-0 z-10 bg-gradient-to-b from-black/90 from-12%">
        <div className="text-lg font-bold py-1 px-2 mx-2 text-white">{process.env.NEXT_PUBLIC_APP_NAME}</div>
        <Suspense>
          <AccountButton />
        </Suspense>
      </div>
      <div className="relative">
        <div className="from-black/90 from-40% to-black/30 bg-gradient-to-t w-full h-full absolute flex flex-col justify-center items-center">
          <div className="text-white font-extrabold text-4xl text-center mt-32 px-4">CAR CLEANING PRODUCTS BY {process.env.NEXT_PUBLIC_APP_NAME}</div>
          <div className="text-white italic text-center mt-4">Let your car to shine as sun </div>
        </div>
        <Image src={BannerPic} className="w-full h-[400px] object-cover" alt={"Banner Pic"} />
      </div>

      <div className="text-2xl py-12 px-6 self-center font-extrabold dark:text-white">OUR PRODUCTS</div>

      <div className="container self-center p-8 flex flex-col md:flex-row justify-center items-center gap-8 md:items-stretch">
        {products.map((v, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 w-[360px] md:w-[400px] flex flex-col rounded-2xl overflow-clip">
            <Image src={v.image} alt={"Polish"} width={500} height={500} className="h-[360px] md:h-[400px] object-cover bg-white "/>
            <div className="flex flex-col pb-6 pt-2 px-8 items-start flex-1">
              <div className="text-neutral-800 dark:text-neutral-300 italic text-sm text-center py-2 px-1 self-center flex-1">&ldquo;{v.subtitle}&rdquo;</div>
              <div className="text-2xl font-semibold mt-2 dark:text-white">{v.title}</div>
              <div className="text-sm py-0.5 px-4 my-1 rounded-md bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200">&#8377; {v.price}/-</div>
              <OrderSpinner orderId={v._id} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center bottom-0 left-0 right-0 sticky">
        <OrderPlacerBar/>
      </div>
    </div>
  );
}
