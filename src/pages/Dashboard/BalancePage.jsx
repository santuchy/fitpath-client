import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { AuthContext } from './../../context/AuthContext';
import Loading from './../Loading/Loading';

const BalancePage = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({
    totalBalance: 0,
    lastSix: [],
    newsletterCount: 0,
    paidMembers: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:3000/chart-stats", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    }).then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Balance Overview</h2>

      {/* Card Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-green-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
          <h3 className="text-xl font-semibold text-gray-700">Total Balance</h3>
          <p className="text-3xl text-green-600 font-semibold">${data.totalBalance.toFixed(2)}</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
          <h3 className="text-xl font-semibold text-gray-700">Newsletter Subscribers</h3>
          <p className="text-3xl text-blue-600 font-semibold">{data.newsletterCount}</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
          <h3 className="text-xl font-semibold text-gray-700">Paid Members</h3>
          <p className="text-3xl text-purple-600 font-semibold">{data.paidMembers}</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Recent Transactions</h3>
        <ul className="space-y-4">
          {data.lastSix.map((t, i) => (
            <li key={i} className="bg-gray-100 p-4 rounded-md shadow-sm hover:shadow-lg transition duration-300">
              <div className="flex justify-between">
                <span className="font-medium text-gray-800">{t.memberName || "Unknown"}</span>
                <span className="text-sm text-gray-500">{new Date(t.date).toLocaleDateString()}</span>
              </div>
              <p className="text-lg font-semibold text-green-600">Paid: ${t.amount}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Subscribers vs Members Chart */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Subscribers vs Members</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: "Subscribers", value: data.newsletterCount },
              { name: "Paid Members", value: data.paidMembers },
            ]}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" barSize={50} radius={5} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalancePage;
