"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import {
  PERIOD_BUTTONS,
  PERIOD_CONFIG,
  getChartConfig,
  getCandlestickConfig,
} from "../../constants";
import {
  IChartApi,
  ISeriesApi,
  createChart,
  CandlestickSeries,
} from "lightweight-charts";
import { fetcher } from "../../lib/coingecko.actions";
import { convertOHLCData } from "../../lib/utils";

const CandleStickChart = ({
  data,
  coinId,
  children,
  height = 360,
  initialPeriod = "daily",
}: CandlestickChartProps) => {
  const [period, setPeriod] = useState<Period>(initialPeriod);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const [ohlcData, setOhlcData] = useState<OHLCData[]>(data || []);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    const showTime = ["daily", "weekly", "monthly"].includes(period);

    // create the chart
    const chart = createChart(container, {
      ...getChartConfig(height, showTime),
      width: container.clientWidth,
    });

    // add the candle series
    const candleSeries = chart.addSeries(
      CandlestickSeries,
      getCandlestickConfig(),
    );

    // set the data to the candle series
    candleSeries.setData(convertOHLCData(ohlcData));

    // to fit the chart to the container
    chart.timeScale().fitContent();

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;

    // to resize the chart when the container is resized
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length) {
        chart.applyOptions({
          width: entries[0].contentRect.width,
        });
      }
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
    };
  }, [height, ohlcData, period]);

  // update the chart when the period changes
  useEffect(() => {
    if (chartRef.current && candleSeriesRef.current) {
      // convert the data to seconds
      const convertedToSeconds: OHLCData[] = ohlcData.map((d) => [
        d[0] / 1000,
        d[1], // open
        d[2], // high
        d[3], // low
        d[4], // close
      ]);
      // convert the data to the format expected by the chart
      const convertedData = convertOHLCData(convertedToSeconds);
      // set the data to the candle series
      candleSeriesRef.current.setData(convertedData);
      // fit the chart to the container
      chartRef.current.timeScale().fitContent();
    }
  }, [ohlcData, period]);

  const fetchOHLCData = async (newPeriod: Period) => {
    try {
      const config = PERIOD_CONFIG[newPeriod];
      const response = await fetcher<OHLCData[]>(`coins/${coinId}/ohlc`, {
        vs_currency: "usd",
        precision: "full",
        days: config.days,
      });

      setOhlcData(response ?? []);
    } catch (error) {
      console.error("Error fetching OHLC data ", error);
    }
  };

  const handlePeriodChange = async (newPeriod: Period) => {
    if (newPeriod === period) return;

    // update period state and fetch the new data in a transition
    startTransition(async () => {
      setPeriod(newPeriod);
      await fetchOHLCData(newPeriod);
    });
  };

  return (
    <div id="candlestick-chart">
      <div className="chart-header">
        <div className="flex-1">{children}</div>
      </div>

      <div className="button-group">
        <span className="text-sm text-gray-500 font-medium mx-2">Period</span>
        {PERIOD_BUTTONS.map((button) => (
          <button
            disabled={isPending}
            key={button.value}
            className={
              button.value === period ? "config-button-active" : "config-button"
            }
            onClick={() => handlePeriodChange(button.value)}
          >
            {button.label}
          </button>
        ))}
      </div>

      <div ref={chartContainerRef} className="chart" style={{ height }} />
    </div>
  );
};

export default CandleStickChart;
