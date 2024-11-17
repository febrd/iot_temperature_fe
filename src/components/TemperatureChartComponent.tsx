"use client";

import React from 'react';
import GaugeComponent from 'react-gauge-component';

interface TemperatureChartProps {
  label: string;
  value: number;
  minValue?: number;
  maxValue?: number;
}

export const TemperatureChartComponent = ({ label, value, minValue = 0, maxValue = 100 }: TemperatureChartProps) => {
  const scaledValue = value > maxValue ? maxValue : value; // Membatasi suhu pada skala 100
  const formatValue = (val: number) => `${val}ºC`;

  return (
    <div className="text-center">
      <GaugeComponent
        type="semicircle"
        arc={{
          width: 0.2,
          padding: 0.005,
          cornerRadius: 1,
          subArcs: [
            {
              limit: 19, // 0-19ºC
              color: '#0A74DA', // Biru Es (Too Low Temperature)
              showTick: true,
              tooltip: { text: 'Too low temperature!' },
            },
            {
              limit: 35, // 20-35ºC
              color: '#5BE12C', // Hijau (Normal Panas)
              showTick: true,
              tooltip: { text: 'Normal temperature' },
            },
            {
              limit: 60, // 36-60ºC
              color: '#F5CD19', // Kuning (Sedikit Tinggi)
              showTick: true,
              tooltip: { text: 'Slightly high temperature' },
            },
            {
              limit: 80, // 61-80ºC
              color: '#EA4228', // Oranye (Tinggi)
              showTick: true,
              tooltip: { text: 'High temperature' },
            },
            {
              color: '#D90429', // Merah (Terlalu Tinggi)
              tooltip: { text: 'Too high temperature!' },
            }
          ]
        }}
        pointer={{
          color: '#345243',
          length: 0.80,
          width: 15,
        }}
        labels={{
          valueLabel: { formatTextValue: formatValue },
          tickLabels: {
            type: 'outer',
            defaultTickValueConfig: {
              formatTextValue: formatValue,
              style: { fontSize: 10 }
            },
            ticks: [
              { value: 19 }, // End of Too Low Temperature
              { value: 35 }, // End of Normal Temperature
              { value: 60 }, // End of Slightly High Temperature
              { value: 80 }, // End of High Temperature
            ],
          }
        }}
        value={scaledValue}
        minValue={minValue}
        maxValue={maxValue}
      />
      <p className="mt-2 text-lg font-medium">{label}: {formatValue(value)}</p>
    </div>
  );
};
