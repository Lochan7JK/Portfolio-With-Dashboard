import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function AnalyticsTab() {

  const [analytics, setAnalytics] = useState({
    totalVisitors: 0,
    uniqueVisitors: 0,
    contacts: 0,
    dailyVisitors: [],
  });

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/analytics"
        );

        setAnalytics(res.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchAnalytics();

  }, []);

  return (

    <div className="space-y-8">

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-[#222] p-6 rounded-xl">
          <h3 className="text-gray-400">
            Total Visitors
          </h3>

          <p className="text-3xl font-bold text-[#00ADB5]">
            {analytics.totalVisitors}
          </p>
        </div>

        <div className="bg-[#222] p-6 rounded-xl">
          <h3 className="text-gray-400">
            Unique Visitors
          </h3>

          <p className="text-3xl font-bold text-[#00ADB5]">
            {analytics.uniqueVisitors}
          </p>
        </div>

        <div className="bg-[#222] p-6 rounded-xl">
          <h3 className="text-gray-400">
            Contacts
          </h3>

          <p className="text-3xl font-bold text-[#00ADB5]">
            {analytics.contacts}
          </p>
        </div>

      </div>

      {/* CHART */}
      <div className="bg-[#222] p-6 rounded-xl">

        <h2 className="text-xl font-semibold mb-4">
          Daily Visitors
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={analytics.dailyVisitors}>

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#00ADB5"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AnalyticsTab;