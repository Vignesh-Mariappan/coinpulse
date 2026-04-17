import React, { Suspense } from "react";
import { AllCoinsFallback } from "../fallback";
import AllCoins from "../../components/coins/AllCoins";

const Page = async ({ searchParams }: Pick<NextPageProps, "searchParams">) => {
  return (
    <main className="main-container">
      <section className="w-full mt-7 space-y-4">
        <Suspense fallback={<AllCoinsFallback />}>
          <AllCoins searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
};

export default Page;
