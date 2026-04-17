import React from "react";
import { fetcher } from "../../lib/coingecko.actions";
import DataTable from "../DataTable";
import Image from "next/image";
import { cn, formatCurrency } from "../../lib/utils";
import { TrendingDown } from "lucide-react";
import { TrendingUp } from "lucide-react";

const TopCategories = async () => {
  let categories: Category[];
  try {
    categories = await fetcher<Category[]>("coins/categories");
  } catch {
    return <div>Error fetching categories</div>;
  }

  const columns: DataTableColumn<Category>[] = [
    {
      header: "Category",
      cellClassName: "category-cell",
      cell: (category) => category.name,
    },
    {
      header: "Top Gainers",
      cellClassName: "top-gainers-cell",
      cell: (category) =>
        category.top_3_coins.map((coin) => (
          <Image key={coin} src={coin} alt={coin} width={28} height={28} />
        )),
    },
    {
      header: "24h Change",
      cellClassName: "change-header-cell",
      cell: (category) => {
        const isTrendingUp = category.market_cap_change_24h > 0;
        const marketCapChange =
          category?.market_cap_change_24h?.toFixed(2) ?? 0;

        return (
          <div
            className={cn(
              "price-change flex gap-1 items-center",
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
            <p>{Math.abs(+marketCapChange)}%</p>
          </div>
        );
      },
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: (category) => {
        const marketCap = category?.market_cap?.toFixed(2) ?? 0;
        return formatCurrency(+marketCap);
      },
    },
    {
      header: "24h Volume",
      cellClassName: "volume-cell",
      cell: (category) => {
        const volume = category?.volume_24h?.toFixed(2) ?? 0;
        return formatCurrency(+volume);
      },
    },
  ];

  return (
    <div id="categories" className="custom-scrollbar">
      <h4>Top Categories</h4>
      <DataTable
        columns={columns}
        data={categories?.slice(0, 10)}
        rowKey={(category, index) => category.name + index.toString()}
        tableClassName="mt-3!"
      />
    </div>
  );
};

export default TopCategories;
