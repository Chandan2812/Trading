import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import moment from "moment";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const LeadsGraph = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/popup-lead-graph`)
      .then((res) => {
        const formatted = res.data.map((item: any) => ({
          date: item._id,
          leads: item.count,
        }));
        setGraphData(formatted);
      })
      .catch((err) => console.error("Graph data error:", err));
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-10">
      <h3 className="text-lg font-semibold text-white mb-4">
        Leads Over Time (Daily)
      </h3>

      {/* Scrollable Wrapper */}
      <div className="overflow-x-auto no-scrollbar">
        <div className="max-w-[200px] md:max-w-[800px]">
          <LineChart
            data={graphData}
            width={Math.max(graphData.length * 50, 1000)} // each date gets 50px width
            height={300}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis
              dataKey="date"
              stroke="#ccc"
              tickFormatter={(date) => moment(date).format("DD MMM")}
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis stroke="#ccc" />
            <Tooltip
              labelFormatter={(label) =>
                moment(label).format("dddd, MMMM Do YYYY")
              }
            />
            <Line
              type="monotone"
              dataKey="leads"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default LeadsGraph;
