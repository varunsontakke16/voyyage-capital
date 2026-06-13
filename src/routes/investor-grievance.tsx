import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getGrievanceData } from "@/lib/analytics-terminal/grievance-fns";
import type { MonthlyComplaintRow, MonthlyTrendRow, AnnualTrendRow } from "@/lib/analytics-terminal/grievance-store";
import { ArrowLeft, Loader2, Info } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/investor-grievance")({
  head: () => ({
    meta: [
      { title: "Investor Grievance — Voyyage" },
      { name: "description", content: "SEBI Annexure B Investor Grievance data and complaint trends for Voyyage Capital. Real-time updated." },
      { property: "og:title", content: "Investor Grievance — Voyyage" },
      { property: "og:description", content: "SEBI Annexure B Investor Grievance data and complaint trends." },
    ],
  }),
  component: InvestorGrievancePage,
});

function calculateComplaintTotal(rows: MonthlyComplaintRow[], field: keyof Omit<MonthlyComplaintRow, "category">): string {
  let hasNumber = false;
  let sum = 0;
  for (const r of rows) {
    const val = String(r[field]).trim().toUpperCase();
    const parsed = Number(val);
    if (!isNaN(parsed) && val !== "" && val !== "NIL") {
      hasNumber = true;
      sum += parsed;
    }
  }
  return hasNumber ? String(sum) : "NIL";
}

function calculateTrendTotal(rows: Array<MonthlyTrendRow | AnnualTrendRow>, field: keyof Omit<MonthlyTrendRow | AnnualTrendRow, "month" | "year">): string {
  let hasNumber = false;
  let sum = 0;
  for (const r of rows) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const val = String((r as any)[field]).trim().toUpperCase();
    const parsed = Number(val);
    if (!isNaN(parsed) && val !== "" && val !== "NIL") {
      hasNumber = true;
      sum += parsed;
    }
  }
  return hasNumber ? String(sum) : "0";
}

function InvestorGrievancePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["grievanceData"],
    queryFn: () => getGrievanceData(),
    refetchInterval: 5000, // Refetch every 5s for real-time updates
  });

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Nav />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-[var(--snow)] to-white pt-36 pb-20 border-b border-[var(--gold)]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[var(--gold)] transition-colors mb-6 font-medium group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>
          <div className="eyebrow mb-4">SEBI Compliance</div>
          <h1 className="font-display font-light text-[#1A1A1A] text-4xl sm:text-5xl md:text-6xl tracking-tight max-w-4xl leading-tight">
            Investor Grievance
          </h1>
          <p className="mt-4 text-xs text-gray-500 max-w-2xl font-sans">
            Investor Charter – Annexure B (As per Circular No. SEBI/HO/IMD/IMD-II CIS/P/CIR/2021/0685 dated December 13, 2021)
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--gold)]" />
          </div>
        ) : error || !data ? (
          <div className="text-center py-20 text-red-500 text-sm">
            Could not load grievance data. Please check your connection.
          </div>
        ) : (
          <div className="space-y-16">
            
            {/* Table 1 */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-gray-100 pb-2">
                <h2 className="text-lg font-semibold text-[var(--navy)]">
                  Complaint Data to be Displayed by Research Analyst
                </h2>
                <span className="text-xs text-gray-500 font-mono">
                  Data for the month ending: {data.monthEnding}
                </span>
              </div>
              
              <div className="border rounded-lg overflow-hidden bg-white">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/70">
                      <TableHead className="w-12 text-center text-xs">Sr. No.</TableHead>
                      <TableHead className="text-xs">Received From</TableHead>
                      <TableHead className="text-center text-xs">Pending at End of Last Month</TableHead>
                      <TableHead className="text-center text-xs">Received</TableHead>
                      <TableHead className="text-center text-xs">Resolved*</TableHead>
                      <TableHead className="text-center text-xs">Total Pending#</TableHead>
                      <TableHead className="text-center text-xs">Pending Complaints &gt; 3 Months</TableHead>
                      <TableHead className="text-center text-xs">Average Resolution Time^ (Days)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.monthlyComplaints.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-center text-xs text-gray-500">{idx + 1}</TableCell>
                        <TableCell className="text-xs font-medium text-gray-700">{row.category}</TableCell>
                        <TableCell className="text-center text-xs">{row.pendingLastMonth}</TableCell>
                        <TableCell className="text-center text-xs">{row.received}</TableCell>
                        <TableCell className="text-center text-xs">{row.resolved}</TableCell>
                        <TableCell className="text-center text-xs">{row.totalPending}</TableCell>
                        <TableCell className="text-center text-xs">{row.pendingOver3Months}</TableCell>
                        <TableCell className="text-center text-xs">{row.avgResolutionTime}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-gray-50 font-semibold border-t">
                      <TableCell></TableCell>
                      <TableCell className="text-xs text-gray-900">Grand Total</TableCell>
                      <TableCell className="text-center text-xs">
                        {calculateComplaintTotal(data.monthlyComplaints, "pendingLastMonth")}
                      </TableCell>
                      <TableCell className="text-center text-xs">
                        {calculateComplaintTotal(data.monthlyComplaints, "received")}
                      </TableCell>
                      <TableCell className="text-center text-xs">
                        {calculateComplaintTotal(data.monthlyComplaints, "resolved")}
                      </TableCell>
                      <TableCell className="text-center text-xs">
                        {calculateComplaintTotal(data.monthlyComplaints, "totalPending")}
                      </TableCell>
                      <TableCell className="text-center text-xs">
                        {calculateComplaintTotal(data.monthlyComplaints, "pendingOver3Months")}
                      </TableCell>
                      <TableCell className="text-center text-xs">
                        {calculateComplaintTotal(data.monthlyComplaints, "avgResolutionTime")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="text-[10px] text-gray-500 space-y-1.5 leading-relaxed pt-1 pl-1">
                <p>* Includes complaints from previous months resolved during the current month.</p>
                <p># Includes complaints pending as of the last day of the month.</p>
                <p>^ Average Resolution Time is the sum total of time taken to resolve each complaint in days during the current month divided by the total number of complaints resolved during the current month.</p>
              </div>
            </div>

            {/* Table 2 */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[var(--navy)] border-b border-gray-100 pb-2">
                Trend of Monthly Disposal of Complaints
              </h2>
              
              <div className="border rounded-lg overflow-hidden bg-white">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/70">
                      <TableHead className="w-12 text-center text-xs">Sr. No.</TableHead>
                      <TableHead className="text-xs">Month</TableHead>
                      <TableHead className="text-center text-xs">Carried Forward from Previous Month</TableHead>
                      <TableHead className="text-center text-xs">Received</TableHead>
                      <TableHead className="text-center text-xs">Resolved*</TableHead>
                      <TableHead className="text-center text-xs">Pending#</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.monthlyTrends.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-center text-xs text-gray-500">{idx + 1}</TableCell>
                        <TableCell className="text-xs font-medium text-gray-700">{row.month}</TableCell>
                        <TableCell className="text-center text-xs">{row.carriedForward}</TableCell>
                        <TableCell className="text-center text-xs">{row.received}</TableCell>
                        <TableCell className="text-center text-xs">{row.resolved}</TableCell>
                        <TableCell className="text-center text-xs">{row.pending}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-gray-50 font-semibold border-t">
                      <TableCell></TableCell>
                      <TableCell className="text-xs text-gray-900">Grand Total</TableCell>
                      <TableCell className="text-center text-xs">
                        {calculateTrendTotal(data.monthlyTrends, "carriedForward")}
                      </TableCell>
                      <TableCell className="text-center text-xs">
                        {calculateTrendTotal(data.monthlyTrends, "received")}
                      </TableCell>
                      <TableCell className="text-center text-xs">
                        {calculateTrendTotal(data.monthlyTrends, "resolved")}
                      </TableCell>
                      <TableCell className="text-center text-xs">
                        {calculateTrendTotal(data.monthlyTrends, "pending")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="text-[10px] text-gray-500 space-y-1.5 leading-relaxed pt-1 pl-1">
                <p>* Inclusive of complaints of previous months resolved in the current month.</p>
                <p># Inclusive of complaints pending as on the last day of the month.</p>
              </div>
            </div>

            {/* Table 3 */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[var(--navy)] border-b border-gray-100 pb-2">
                Trend of Annual Disposal of Complaints
              </h2>
              
              <div className="border rounded-lg overflow-hidden bg-white">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/70">
                      <TableHead className="w-12 text-center text-xs">Sr. No.</TableHead>
                      <TableHead className="text-xs">Year</TableHead>
                      <TableHead className="text-center text-xs">Carried Forward from Previous Year</TableHead>
                      <TableHead className="text-center text-xs">Received</TableHead>
                      <TableHead className="text-center text-xs">Resolved*</TableHead>
                      <TableHead className="text-center text-xs">Pending#</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.annualTrends.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-center text-xs text-gray-500">{idx + 1}</TableCell>
                        <TableCell className="text-xs font-medium text-gray-700">{row.year}</TableCell>
                        <TableCell className="text-center text-xs">{row.carriedForward}</TableCell>
                        <TableCell className="text-center text-xs">{row.received}</TableCell>
                        <TableCell className="text-center text-xs">{row.resolved}</TableCell>
                        <TableCell className="text-center text-xs">{row.pending}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-gray-50 font-semibold border-t">
                      <TableCell></TableCell>
                      <TableCell className="text-xs text-gray-900">Grand Total</TableCell>
                      <TableCell className="text-center text-xs">
                        {calculateTrendTotal(data.annualTrends, "carriedForward")}
                      </TableCell>
                      <TableCell className="text-center text-xs">
                        {calculateTrendTotal(data.annualTrends, "received")}
                      </TableCell>
                      <TableCell className="text-center text-xs">
                        {calculateTrendTotal(data.annualTrends, "resolved")}
                      </TableCell>
                      <TableCell className="text-center text-xs">
                        {calculateTrendTotal(data.annualTrends, "pending")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="text-[10px] text-gray-500 space-y-1.5 leading-relaxed pt-1 pl-1">
                <p>* Inclusive of complaints of previous years resolved in the current year.</p>
                <p># Inclusive of complaints pending as on the last day of the year.</p>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
