'use client'

import { AreaChartComponent } from '@/components/AreaChartComponent'
import { useSearchParams } from 'next/navigation';
import { formatId } from '@/app/utils/formatDate';
import { useQuery } from '@tanstack/react-query';
import { SaveButton } from "@/components/SaveButton";
import { getDataByRange } from '../utils/api';

import Loading from '@/components/Loading';

export default function DateRangePage() {
    const dates = useSearchParams();
    const startDate = dates.get('start');
    const endDate = dates.get('end');
    const mode = dates.get('mode');
    const singleDate = dates.get('date');

    const queryConfig = mode === 'single' && singleDate
        ? { mode: 'single', date: singleDate }
        : { start: startDate || undefined, end: endDate || undefined };

    const { data, isLoading } = useQuery({
        queryKey: ['dataRange', queryConfig],
        queryFn: () => getDataByRange(queryConfig),
        refetchInterval: 5000,
    });

    return (
        <div className="mt-10 mb-8 flex flex-col">
            <h1 className="text-3xl font-medium text-center mt-8">
                {mode === 'single' && singleDate 
                    ? `Data for ${formatId(singleDate)}`
                    : `Data From ${formatId(startDate)} - ${formatId(endDate)}`}
            </h1>
            <div className="w-full max-lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 pt-12">
                <div className="bg-primary-content border dark:border-none dark:bg-base-200 text-black rounded-lg w-full h-[410px]">
                    {isLoading ? <Loading /> :
                        <AreaChartComponent label="Temperature" dataKey="temperature" chartData={data} />
                    }
                </div>
                <div className="bg-primary-content border dark:border-none dark:bg-base-200 text-black rounded-lg w-full h-[410px]">
                    {isLoading ? <Loading /> :
                        <AreaChartComponent label="Humidity" dataKey="humidity" chartData={data} />
                    }
                </div>
            </div>
            {!isLoading && <SaveButton data={data} />}
        </div>
    );
}
