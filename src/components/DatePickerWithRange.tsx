"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchDataInChunks = async (startDate: string, endDate: string) => {
    let offset = 0;
    const limit = 10000;
    let hasMoreData = true;

    while (hasMoreData) {
      setIsLoading(true);
      const response = await fetch(
        `/date?start=${startDate}&end=${endDate}&limit=${limit}&offset=${offset}`
      );

      if (!response.ok) {
        console.error("Error fetching data");
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Fetched data chunk:", data);


      if (data.length < limit) {
        hasMoreData = false;
      }

      offset += limit;
    }

    setIsLoading(false);
  };

  const handleSave = () => {
    if (date) {
      if (date.from && date.to) {
        const fromDate = format(date.from, "yyyy-MM-dd");
        const toDate = format(date.to, "yyyy-MM-dd");
        console.log("Fetching data for range:", fromDate, toDate);

        fetchDataInChunks(fromDate, toDate);

        const url = `/date?start=${fromDate}&end=${toDate}`;
        console.log("Redirecting to URL (range mode):", url);
        router.push(url);
      } else if (date.from) {
        const singleDate = format(date.from, "yyyy-MM-dd");
        console.log("Fetching data for single date:", singleDate);

        fetchDataInChunks(singleDate, singleDate);

        const url = `/date?mode=single&date=${singleDate}`;
        console.log("Redirecting to URL (single mode):", url);
        router.push(url);
      }

      setIsOpen(false);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
          {date && (date.from || date.to) && (
            <div className="p-3 border-t">
              <Button className="w-full" onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Loading..." : "Save"}
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
