import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TrendingDown, TrendingUp } from "lucide-react";
import { TrendingCoinsFallback } from "@/app/fallback";
import { fetcher } from "../../lib/coingecko.actions";
import DataTable from "../DataTable";
import { cn, formatCurrency } from "../../lib/utils";

const trendingColumns: DataTableColumn<TrendingCoin>[] = [
  {
    header: "Name",
    cellClassName: "name-cell",
    cell: (coin) => {
      const item = coin.item;

      return (
        <Link href={`/coin/${item.id}`}>
          <Image src={item.large} alt={item.name} width={36} height={36} />
          <p>{item.name}</p>
        </Link>
      );
    },
  },
  {
    header: "24h Change",
    cellClassName: "change-cell",
    cell: (coin) => {
      const item = coin.item;
      const priceChange =
        item.data.price_change_percentage_24h.usd.toFixed(2) ?? 0;
      const isTrendingUp = +priceChange > 0;

      return (
        <div
          className={cn(
            "price-change",
            isTrendingUp ? "text-green-500" : "text-red-500",
          )}
        >
          <p>
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}
          </p>
          <p>{Math.abs(+priceChange)}%</p>
        </div>
      );
    },
  },
  {
    header: "Price",
    cellClassName: "price-cell",
    cell: (coin) => {
      const item = coin.item;
      const price = item.data.price.toFixed(2) ?? 0;
      return formatCurrency(+price);
    },
  },
];

const TrendingCoins = async () => {
  let trendingCoins: { coins: TrendingCoin[] };
  try {
    trendingCoins = await fetcher<{ coins: TrendingCoin[] }>("search/trending");
  } catch {
    return <TrendingCoinsFallback />;
  }

  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>
      <DataTable
        columns={trendingColumns}
        data={trendingCoins?.coins.slice(0, 6) || []}
        rowKey={(coin) => coin.item.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  );
};

export default TrendingCoins;
