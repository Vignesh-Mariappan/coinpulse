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
