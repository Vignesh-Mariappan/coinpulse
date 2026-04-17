import React from "react";
import { fetcher } from "../../lib/coingecko.actions";
import DataTable from "../DataTable";
import Image from "next/image";
import { cn, formatCurrency } from "../../lib/utils";
import CoinsPagination from "./CoinsPagination";

const AllCoins = async ({
  searchParams,
}: Pick<NextPageProps, "searchParams">) => {
  const resolved = await searchParams;
  const raw = resolved.page;
  const pageStr = Array.isArray(raw) ? raw[0] : raw;
  const parsed = pageStr != null ? parseInt(String(pageStr), 10) : NaN;
  const currentPage = Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;

  let coins: CoinMarketData[];
  // for pagination, three props to be passed:
  // 1. currentPage
  // 2. totalPages
  // 3. hasMorePages
  const estimatedTotalPages =
    currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100;
  const perPage = 10;

  try {
    coins = await fetcher<CoinMarketData[]>("coins/markets", {
      vs_currency: "usd",
      page: currentPage,
      per_page: perPage,
    });
  } catch {
    return <div>Error fetching coins</div>;
  }

  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: "Rank",
      cellClassName: "rank-cell",
      cell: (coin) => `#${coin.market_cap_rank}`,
    },
    {
      header: "Token",
      cellClassName: "token-cell",
      cell: (coin) => (
        <div className="flex items-center gap-2">
          <Image src={coin.image} alt={coin.name} width={28} height={28} />
          <p>{coin.name}</p>
          <p>({coin.symbol.toUpperCase()})</p>
        </div>
      ),
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin) => {
        return formatCurrency(coin.current_price);
      },
    },
    {
      header: "24h Change",
      cellClassName: "change-header-cell",
      cell: (coin) => {
        const priceChange = coin?.price_change_percentage_24h?.toFixed(2) ?? 0;
        const isTrendingUp = +priceChange > 0;

        return (
          <div
            className={cn(
              "price-change",
              isTrendingUp ? "text-green-500" : "text-red-500",
            )}
          >
            <p>{Math.abs(+priceChange)}%</p>
          </div>
        );
      },
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: (coin) => {
        const marketCap = coin?.market_cap?.toFixed(2) ?? 0;
        return formatCurrency(+marketCap);
      },
    },
  ];

  const hasMorePages = coins.length === perPage;

  return (
    <div id="coins-page" className="custom-scrollbar">
      <h4>All Coins</h4>
      <DataTable
        columns={columns}
        data={coins}
        rowKey={(coin) => coin.id}
        tableClassName="coins-table"
      />

      <CoinsPagination
        currentPage={currentPage}
        totalPages={estimatedTotalPages}
        hasMorePages={hasMorePages}
      />
    </div>
  );
};

export default AllCoins;
