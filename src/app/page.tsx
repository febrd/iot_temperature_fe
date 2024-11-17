"use client";

import { AreaChartComponent } from "@/components/AreaChartComponent";
import { TemperatureChartComponent } from "@/components/TemperatureChartComponent";
import { HumidityGaugeComponent } from "@/components/HumidityChartComponent"; // Adjusted import
import { useQuery } from '@tanstack/react-query';
import { getDataToday, getGaugeData } from '@/app/utils/api';
import { SaveButton } from "@/components/SaveButton";
import Loading from "@/components/Loading";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component

export default function Home() {
  const { data: sensorData, isLoading: loadingSensorData } = useQuery({
    queryKey: ['sensorData'],
    queryFn: getDataToday,
    refetchInterval: 5000,
  });

  const { data: gaugeData, isLoading: loadingGaugeData } = useQuery({
    queryKey: ['gaugeData'], 
    queryFn: getGaugeData, 
    refetchInterval: 5000, 
  });

  const isLoading = loadingSensorData || loadingGaugeData;

  return (
    <div className="mt-10 mb-8 flex flex-col">
      
      <h1 className="text-3xl font-medium text-center mt-8">
        Data From <span className="text-sky-600">Latest</span>
      </h1>

      <div className="w-full max-lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 pt-12">
        {isLoading ? (
          <>
            <Skeleton className="w-full h-[200px] rounded-lg" /> {/* Skeleton for Temperature */}
            <Skeleton className="w-full h-[200px] rounded-lg" /> {/* Skeleton for Humidity */}
          </>
        ) : (
          <>
            <TemperatureChartComponent
              label="Temperature"
              value={gaugeData?.temperature}
              minValue={0}
              maxValue={100}
            />
            <HumidityGaugeComponent
              label="Humidity"
              value={gaugeData?.humidity}
              minValue={0}
              maxValue={100}
            />
          </>
        )}
      </div>
      
      <div className="w-full max-lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 pt-12">
        <div className="rounded-lg w-full h-[410px]">
          {isLoading ? <Loading /> :
            <AreaChartComponent label="Temperature" dataKey="temperature" chartData={sensorData} />
          }
        </div>
        <div className="rounded-lg w-full h-[410px]">
          {isLoading ? <Loading /> :
            <AreaChartComponent label="Humidity" dataKey="humidity" chartData={sensorData} />
          }
        </div>
      </div>
      {!isLoading && <SaveButton data={sensorData} />}
    
    </div>
  );
}
