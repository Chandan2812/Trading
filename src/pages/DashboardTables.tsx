export const MergedDashboardTable = () => (
  <section className="bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white py-16 px-4 transition-colors duration-500">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
        <span className="text-[var(--primary-color)]">CFT</span> Dashboard
        Summary
      </h2>

      <div className="overflow-x-auto border border-[var(--primary-color)] rounded-xl">
        <table className="min-w-[640px] w-full text-sm">
          <thead className="bg-[var(--primary-color)] text-black dark:text-white">
            <tr>
              {["Category", "Metric", "Value"].map((h) => (
                <th key={h} className="p-4 font-semibold text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--primary-color)]">
            {/* Group 1: CFT Dashboard */}
            <tr className="bg-gray-50 dark:bg-neutral-900">
              <td className="p-4 font-medium">CFT Dashboard</td>
              <td className="p-4">Accounts Linked</td>
              <td className="p-4">32 Ad Accounts</td>
            </tr>

            {/* Group 2: Trading & Revenue */}
            <tr className="bg-gray-100 dark:bg-neutral-800">
              <td className="p-4 font-medium" rowSpan={4}>
                Trading & Revenue Overview
              </td>
              <td className="p-4">Total Revenue</td>
              <td className="p-4">₹ 5,13,50,56,231</td>
            </tr>
            <tr className="bg-gray-100 dark:bg-neutral-800">
              <td className="p-4">Total Trade Volume</td>
              <td className="p-4">₹ 19,13,50,56,231</td>
            </tr>
            <tr className="bg-gray-100 dark:bg-neutral-800">
              <td className="p-4">Ad Spend</td>
              <td className="p-4">₹ 10,51,26,231</td>
            </tr>
            <tr className="bg-gray-100 dark:bg-neutral-800">
              <td className="p-4">New Customers</td>
              <td className="p-4">12</td>
            </tr>

            {/* Group 3: Advertising Metrics */}
            <tr className="bg-gray-50 dark:bg-neutral-900">
              <td className="p-4 font-medium" rowSpan={5}>
                Advertising & Conversion Metrics
              </td>
              <td className="p-4">Average Cost per Conversion</td>
              <td className="p-4">₹ 15,056</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-neutral-900">
              <td className="p-4">Average Cost per Message</td>
              <td className="p-4">₹ 20,124</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-neutral-900">
              <td className="p-4">Cost per Order (CPO)</td>
              <td className="p-4">₹ 25,018</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-neutral-900">
              <td className="p-4">Message-to-Response Ratio (Me/Re)</td>
              <td className="p-4">15%</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-neutral-900">
              <td className="p-4">Return on Ad Spend (ROAS)</td>
              <td className="p-4">25%</td>
            </tr>

            {/* Group 4: Current Focus */}
            <tr className="bg-gray-100 dark:bg-neutral-800">
              <td className="p-4 font-medium">Current Focus</td>
              <td className="p-4">Objective</td>
              <td className="p-4">Messaging Efficiency</td>
            </tr>

            {/* Group 5: Goal */}
            <tr className="bg-gray-100 dark:bg-neutral-800">
              <td className="p-4 font-medium">Goal</td>
              <td colSpan={2} className="p-4 text-left">
                Better lead quality and lower message costs for improved trading
                conversions
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
);
