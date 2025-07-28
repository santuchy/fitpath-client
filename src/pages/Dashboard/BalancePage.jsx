import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { AuthContext } from './../../context/AuthContext';

const BalancePage = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({
    totalBalance: 0,
    lastSix: [],
    newsletterCount: 0,
    paidMembers: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:3000/chart-stats",
      {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    }).then((res) => setData(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold mb-4">Balance Overview</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-green-100 p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Total Balance</h3>
          <p className="text-2xl text-green-700">${data.totalBalance.toFixed(2)}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Newsletter Subscribers</h3>
          <p className="text-2xl text-blue-700">{data.newsletterCount}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Paid Members</h3>
          <p className="text-2xl text-purple-700">{data.paidMembers}</p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mt-8 mb-4">Recent Transactions</h3>
        <ul className="space-y-2">
          {data.lastSix.map((t, i) => (
            <li key={i} className="bg-gray-50 p-3 rounded shadow">
              <span className="font-medium">{t.memberName || "Unknown"}</span> paid{" "}
              <span className="text-green-600 font-semibold">${t.amount}</span> on{" "}
              <span className="text-gray-500 text-sm">
                {new Date(t.date).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Subscribers vs Members</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: "Subscribers", value: data.newsletterCount },
              { name: "Paid Members", value: data.paidMembers },
            ]}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalancePage;
