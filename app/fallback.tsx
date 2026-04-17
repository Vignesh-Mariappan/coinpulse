import DataTable from "@/components/DataTable";

const SKELETON_TRENDING_ROWS: TrendingCoin[] = Array.from(
  { length: 6 },
  (_, i) => ({
    item: {
      id: `trending-skeleton-${i}`,
      name: "",
      symbol: "",
      market_cap_rank: 0,
      thumb: "",
      large: "",
      data: {
        price: 0,
        price_change_percentage_24h: { usd: 0 },
      },
    },
  }),
);

const trendingSkeletonColumns: DataTableColumn<TrendingCoin>[] = [
  {
    header: "Name",
    cellClassName: "name-cell",
    cell: () => (
      <div className="name-link">
        <div className="name-image skeleton animate-pulse" aria-hidden />
        <div className="name-line skeleton animate-pulse" aria-hidden />
      </div>
    ),
  },
  {
    header: "24h Change",
    cellClassName: "name-cell",
    cell: () => (
      <div className="price-change">
        <div className="change-icon skeleton animate-pulse" aria-hidden />
        <div className="change-line skeleton animate-pulse" aria-hidden />
      </div>
    ),
  },
  {
    header: "Price",
    cellClassName: "price-cell",
    cell: () => (
      <div className="price-line skeleton animate-pulse" aria-hidden />
    ),
  },
];

export function CoinsOverviewFallback() {
  return (
    <div id="coin-overview-fallback">
      <div className="header">
        <div className="header-image skeleton animate-pulse" aria-hidden />
        <div className="info">
          <div className="header-line-sm skeleton animate-pulse" aria-hidden />
          <div className="header-line-lg skeleton animate-pulse" aria-hidden />
        </div>
      </div>
      <div className="chart">
        <div className="chart-skeleton skeleton animate-pulse" aria-hidden />
      </div>
    </div>
  );
}

export function TrendingCoinsFallback() {
  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <DataTable
        columns={trendingSkeletonColumns}
        data={SKELETON_TRENDING_ROWS}
        rowKey={(coin) => coin.item.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  );
}

const SKELETON_CATEGORY_ROWS: Category[] = Array.from(
  { length: 10 },
  (_, i) => ({
    name: `category-skeleton-${i}`,
    top_3_coins: ["", "", ""],
    market_cap_change_24h: 0,
    market_cap: 0,
    volume_24h: 0,
  }),
);

const categorySkeletonColumns: DataTableColumn<Category>[] = [
  {
    header: "Category",
    cellClassName: "category-cell",
    cell: () => (
      <div
        className="category-skeleton skeleton animate-pulse"
        aria-hidden
      />
    ),
  },
  {
    header: "Top Gainers",
    cellClassName: "top-gainers-cell",
    cell: () => (
      <>
        <div className="coin-skeleton skeleton animate-pulse" aria-hidden />
        <div className="coin-skeleton skeleton animate-pulse" aria-hidden />
        <div className="coin-skeleton skeleton animate-pulse" aria-hidden />
      </>
    ),
  },
  {
    header: "24h Change",
    cellClassName: "change-header-cell",
    cell: () => (
      <div className="price-change flex gap-1 items-center">
        <div className="change-icon skeleton animate-pulse" aria-hidden />
        <div
          className="value-skeleton-sm skeleton animate-pulse"
          aria-hidden
        />
      </div>
    ),
  },
  {
    header: "Market Cap",
    cellClassName: "market-cap-cell",
    cell: () => (
      <div
        className="value-skeleton-md skeleton animate-pulse"
        aria-hidden
      />
    ),
  },
  {
    header: "24h Volume",
    cellClassName: "volume-cell",
    cell: () => (
      <div
        className="value-skeleton-lg skeleton animate-pulse"
        aria-hidden
      />
    ),
  },
];

export function TopCategoriesFallback() {
  return (
    <div id="categories-fallback" className="custom-scrollbar">
      <h4>Top Categories</h4>
      <DataTable
        columns={categorySkeletonColumns}
        data={SKELETON_CATEGORY_ROWS}
        rowKey={(category, index) => category.name + index.toString()}
        tableClassName="mt-3!"
      />
    </div>
  );
}

const SKELETON_ALL_COINS_ROWS: CoinMarketData[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: `all-coins-skeleton-${i}`,
    symbol: "",
    name: "",
    image: "",
    current_price: 0,
    market_cap: 0,
    market_cap_rank: 0,
    fully_diluted_valuation: 0,
    total_volume: 0,
    high_24h: 0,
    low_24h: 0,
    price_change_24h: 0,
    price_change_percentage_24h: 0,
    market_cap_change_24h: 0,
    market_cap_change_percentage_24h: 0,
    circulating_supply: 0,
    total_supply: 0,
    max_supply: 0,
    ath: 0,
    ath_change_percentage: 0,
    ath_date: "",
    atl: 0,
    atl_change_percentage: 0,
    atl_date: "",
    last_updated: "",
  }),
);

const allCoinsSkeletonColumns: DataTableColumn<CoinMarketData>[] = [
  {
    header: "Rank",
    cellClassName: "rank-cell",
    cell: () => (
      <div className="rank-line skeleton animate-pulse" aria-hidden />
    ),
  },
  {
    header: "Token",
    cellClassName: "token-cell",
    cell: () => (
      <div className="flex items-center gap-2">
        <div className="name-image skeleton animate-pulse" aria-hidden />
        <div className="name-line skeleton animate-pulse" aria-hidden />
        <div className="symbol-line skeleton animate-pulse w-10!" aria-hidden />
      </div>
    ),
  },
  {
    header: "Price",
    cellClassName: "price-cell",
    cell: () => (
      <div className="price-line skeleton animate-pulse" aria-hidden />
    ),
  },
  {
    header: "24h Change",
    cellClassName: "change-header-cell",
    cell: () => (
      <div className="price-change">
        <div className="change-line skeleton animate-pulse" aria-hidden />
      </div>
    ),
  },
  {
    header: "Market Cap",
    cellClassName: "market-cap-cell",
    cell: () => (
      <div
        className="value-skeleton-md skeleton animate-pulse"
        aria-hidden
      />
    ),
  },
];

export function AllCoinsFallback() {
  return (
    <div id="all-coins-fallback" className="custom-scrollbar">
      <h4>All Coins</h4>
      <DataTable
        columns={allCoinsSkeletonColumns}
        data={SKELETON_ALL_COINS_ROWS}
        rowKey={(coin) => coin.id}
        tableClassName="mt-3!"
      />
    </div>
  );
}
