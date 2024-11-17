"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { saveFormatter } from '@/app/utils/saveFormatter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface SaveButtonProps {
  data: Array<{
    id: number;
    timestamp: string;
    temperature: number;
    humidity: number;
  }>;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ data }) => {
  
  // Helper function to download data as CSV
  const downloadCSV = () => {
    const csvHeader = ["timestamp,temperature,humidity"];
    const currentDate = new Date();

    // Add data rows
    const csvRows = data.map(row => 
      `"${saveFormatter(row.timestamp)}",${row.temperature},${row.humidity}`
    );

    // Combine header and data rows
    const csvContent = [csvHeader.join("\n"), csvRows.join("\n")].join("\n");

    // Create CSV Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    // Create link and download
    const link = document.createElement("a");
    link.href = url;
    link.download = `Backup_${currentDate.toLocaleDateString()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper function to download data as PDF
  const downloadPDF = async () => {
    const currentDate = new Date().toLocaleDateString();
    const doc = new jsPDF("landscape");

    // Add title
    doc.text(`Backup Data (${currentDate})`, 10, 10);

    // Prepare table columns and rows
    const tableColumns = ["Timestamp", "Temperature", "Humidity"];
    const tableRows = data.map((row) => [
      //row.id,
      saveFormatter(row.timestamp),
      row.temperature,
      row.humidity,
    ]);

    // Generate table in PDF
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 20,
    });

    // Save PDF
    doc.save(`Backup_${currentDate}.pdf`);
  };

  return (
    <div className="flex self-end">
      <Button
        onClick={downloadCSV}
        className="rounded-r-none bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Download
      </Button>
      <DropdownMenu align="right">
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="rounded-l-none border-0 border-l outline-0 ring-0 px-2 bg-primary text-primary-foreground hover:bg-primary/90 dark:hover:bg-white/10"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-popover text-popover-foreground mt-1" side="bottom" align="end">
          <DropdownMenuItem
            onClick={downloadPDF}
            className="hover:bg-accent hover:text-accent-foreground"
          >
            Download as PDF
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={downloadCSV}
            className="hover:bg-accent hover:text-accent-foreground"
          >
            Download as CSV
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
