/* MergedDashboardTable.tsx */
export const MergedDashboardTable = () => (
  <section className="bg-black text-white py-10 px-4">
    {/* <h2 className="text-xl sm:text-2xl font-bold text-[#71ced0] mb-6">
      DASHBOARD
    </h2> */}

    <div className="overflow-x-auto">
      {/* min-w-[640px] keeps columns readable; adjust if needed */}
      <table className="min-w-[640px] w-full text-sm border border-[#71ced0]">
        <thead className="bg-[#0e2021]/60">
          <tr>
            {["Category", "Metric", "Value"].map((h) => (
              <th
                key={h}
                className="border border-[#71ced0] font-semibold p-3 text-left"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* ───────────── 1. CFT Dashboard ───────────── */}
          <tr>
            <td className="border border-[#71ced0] p-3">CFT Dashboard</td>
            <td className="border border-[#71ced0] p-3">Accounts Linked</td>
            <td className="border border-[#71ced0] p-3">32 Ad Accounts</td>
          </tr>

          {/* ───────────── 2. Trading & Revenue Overview ───────────── */}
          <tr>
            <td
              className="border border-[#71ced0] p-3"
              rowSpan={4}
              style={{ verticalAlign: "top" }}
            >
              Trading &<br />
              Revenue Overview
            </td>
            <td className="border border-[#71ced0] p-3">Total Revenue</td>
            <td className="border border-[#71ced0] p-3">₹ 5,13,50,56,231</td>
          </tr>
          <tr>
            <td className="border border-[#71ced0] p-3">Total Trade Volume</td>
            <td className="border border-[#71ced0] p-3">₹ 19,13,50,56,231</td>
          </tr>
          <tr>
            <td className="border border-[#71ced0] p-3">Ad Spend</td>
            <td className="border border-[#71ced0] p-3">₹ 10,51,26,231</td>
          </tr>
          <tr>
            <td className="border border-[#71ced0] p-3">New Customers</td>
            <td className="border border-[#71ced0] p-3">12</td>
          </tr>

          {/* ───────────── 3. Advertising & Conversion Metrics ───────────── */}
          <tr>
            <td
              className="border border-[#71ced0] p-3"
              rowSpan={5}
              style={{ verticalAlign: "top" }}
            >
              Advertising &<br />
              Conversion Metrics
            </td>
            <td className="border border-[#71ced0] p-3">
              Average Cost per Conversion
            </td>
            <td className="border border-[#71ced0] p-3">₹ 15,056</td>
          </tr>
          <tr>
            <td className="border border-[#71ced0] p-3">
              Average Cost per Message
            </td>
            <td className="border border-[#71ced0] p-3">₹ 20,124</td>
          </tr>
          <tr>
            <td className="border border-[#71ced0] p-3">
              Cost per Order (CPO)
            </td>
            <td className="border border-[#71ced0] p-3">₹ 25,018</td>
          </tr>
          <tr>
            <td className="border border-[#71ced0] p-3">
              Message-to-Response Ratio (Me/Re)
            </td>
            <td className="border border-[#71ced0] p-3">15%</td>
          </tr>
          <tr>
            <td className="border border-[#71ced0] p-3">
              Return on Ad Spend (ROAS)
            </td>
            <td className="border border-[#71ced0] p-3">25%</td>
          </tr>

          {/* ───────────── 4. Current Focus ───────────── */}
          <tr>
            <td className="border border-[#71ced0] p-3">Current Focus</td>
            <td className="border border-[#71ced0] p-3">Objective</td>
            <td className="border border-[#71ced0] p-3">
              Messaging Efficiency
            </td>
          </tr>

          {/* ───────────── 5. Goal ───────────── */}
          <tr>
            <td className="border border-[#71ced0] p-3">Goal</td>
            <td colSpan={2} className="border border-[#71ced0] p-3 text-left">
              Better lead quality and lower message costs for improved trading
              conversions
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
);
