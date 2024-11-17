"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const chartConfig = {
  desktop: {
    label: "Humidity",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface ChartProps {
  label: string;
  dataKey: string;
  chartData: any; 
}

export function AreaChartComponent({ label, dataKey, chartData }: ChartProps) {
  const [timeRange, setTimeRange] = React.useState("90d");

  const formattedData = Array.isArray(chartData)
    ? chartData
        .filter(
          (item) =>
            item.timestamp !== null &&
            item.temperature !== null &&
            item.humidity !== null
        )
        .map((item) => ({
          timestamp: item.timestamp ?? "", 
          temperature: parseFloat(item.temperature ?? "0"), 
          humidity: parseFloat(item.humidity ?? "0"), 
        }))
    : []; 
  if (!Array.isArray(chartData)) {
    console.error("Expected chartData to be an array, but got:", chartData);
  }

  const filteredData = formattedData?.filter((item) => {
    const date = new Date(item.timestamp);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
        <CardTitle style={{ textAlign: 'center' }}>{label} Chart</CardTitle>
          <CardDescription>
          </CardDescription>
        </div>
    
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:pr-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("id", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                });
              }}
            />
            <YAxis type="number" domain={[0, "dataMax + 10"]} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("id", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    });
                  }}
                  indicator="line"
                  nameKey={label}
                />
              }
            />
            <Area
              dataKey={dataKey}
              type="natural"
              fill="url(#fillColor)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
