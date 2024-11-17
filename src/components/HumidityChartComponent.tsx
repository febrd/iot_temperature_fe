"use client";

import React from 'react';
import GaugeComponent from 'react-gauge-component';

interface HumidityGaugeProps {
  label: string;
  value: number;
  minValue?: number;  
  maxValue?: number;  
}

export const HumidityGaugeComponent = ({ label, value }: HumidityGaugeProps) => {
  return (
    <div className="text-center">
      <div style={{ width: '355px', height: '250px', margin: '0 auto' }}>
        <GaugeComponent
          type="radial"
          value={value}
          labels={{
            tickLabels: {
              type: "inner",
              ticks: [
                { value: 20 },
                { value: 40 },
                { value: 60 },
                { value: 80 },
                { value: 100 }
              ]
            }
          }}
          arc={{
            colorArray: ['#D90429', '#FFA500', '#5BE12C', '#D90429'],
            subArcs: [
              { 
                limit: 20,
                showTick: true,
                tooltip: { text: 'Too low humidity!' } 
              },
              { 
                limit: 40, 
                showTick: true,
                tooltip: { text: 'Low humidity!' } 
              },
              { 
                limit: 86, 
                showTick: true,
                tooltip: { text: 'Good humidity level' } 
              },
              { 
                limit: 100, 
                showTick: true,
                tooltip: { text: 'High humidity!' } 
              }
            ],
            padding: 0.02,
            width: 0.3
          }}
          pointer={{
            elastic: true,
            animationDelay: 0
          }}
        />
      </div>
      <p className="mt-2 text-lg font-medium">{label}: {value}%</p>
    </div>
  );
};
