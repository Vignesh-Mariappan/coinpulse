import { CoinsOverviewFallback } from "@/app/fallback";
import { fetcher } from "../../lib/coingecko.actions";
import { formatCurrency } from "../../lib/utils";
import Image from "next/image";
import CandleStickChart from "./CandleStickChart";

const CoinOverview = async () => {
  let coin: CoinDetailsData;
  let coinOHLCData: OHLCData[];
  try {
    const results = await Promise.all([
      fetcher<CoinDetailsData>("coins/bitcoin", {
        dex_pair_format: "symbol",
      }),
      fetcher<OHLCData[]>(`coins/bitcoin/ohlc`, {
        vs_currency: "usd",
        precision: "full",
        days: "1",
      }),
    ]);
    coin = results[0];
    coinOHLCData = results[1];
  } catch {
    console.log("Error fetching coin overview");
    return <CoinsOverviewFallback />;
  }

  return (
    <div id="coin-overview">
      <CandleStickChart
        data={coinOHLCData}
        coinId={"bitcoin"}
        initialPeriod="daily"
      >
        <div className="header">
          <Image
            src={coin.image.large}
            alt={coin.name}
            width={56}
            height={56}
          />
          <div className="info">
            <p>
              {coin.name} / {coin.symbol.toUpperCase()}
            </p>
            <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
          </div>
        </div>
      </CandleStickChart>
    </div>
  );
};

export default CoinOverview;
