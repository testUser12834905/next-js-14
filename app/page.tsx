import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";

type Props = {};

const mockCall = async (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(123);
    }, 1500);
  });
};

const Home = async (props: Props) => {
  let res;
  res = await mockCall();

  return (
    <div className="text-center mt-20 h-max">
      <h1
        style={{ fontFamily: "star-wars" }}
        className="text-yellow-400 font-bold text-8xl md:text-9xl tracking-widest"
      >
        STar waRS
      </h1>
      <Link href="/login">
        <Button className="mt-10">Log in</Button>
      </Link>

      {res}
    </div>
  );
};

export default Home;
