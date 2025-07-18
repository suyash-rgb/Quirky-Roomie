// src/components/Listings/DashboardSidebar.jsx

import { useEffect, useState } from "react";
import { getLeaderboard, getFlatStats } from "../../services/api";
import { useAuth } from "../../context/useAuth";

const DashboardSidebar = ({ trending }) => {
  const { authToken } = useAuth();
  const flatCode = localStorage.getItem("flatCode");

  const [leaderboard, setLeaderboard] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    console.log("[Sidebar] Mounting dashboard with flatCode:", flatCode)
    const fetchSidebarData = async () => {
      try {
        const [leadRes, statsRes] = await Promise.all([
          getLeaderboard(authToken),
          flatCode ? getFlatStats(flatCode, authToken) : Promise.resolve({ data: {} })
        ]);

        setLeaderboard(leadRes.data.leaderboard || []);
        setStats(statsRes.data || {});
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    };

    fetchSidebarData();
  }, [authToken, flatCode]);

  return (
    <aside className="space-y-8">
      {/* 🏆 Problem of the Week */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="font-chewy text-2xl text-yellow-500 mb-3">Problem of the Week</h3>
        {trending?.[0] ? (
          <p className="text-gray-800">“{trending[0].title}” with {trending[0].votes} upvotes</p>
        ) : (
          <p className="text-gray-500">No trending issues yet.</p>
        )}
      </div>

      {/* 🧑‍🚀 Leaderboard */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="font-chewy text-2xl text-teal-500 mb-3">Leaderboard</h3>
        {leaderboard.length > 0 ? (
          <ol className="list-decimal list-inside space-y-1 font-nunito">
            {leaderboard.map((u) => (
              <li key={u._id} className="flex justify-between">
                <span>{u.name}</span>
                <span className="font-semibold">{u.karma} ⭐</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-500">No contributors yet.</p>
        )}
      </div>

      {/* 🏘️ Flat Stats */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="font-chewy text-2xl text-pink-500 mb-3">Flat Stats</h3>
        <ul className="space-y-2 text-gray-700 font-nunito">
          <li>Total complaints: <strong>{stats.totalComplaints ?? '—'}</strong></li>
          <li>Resolved: <strong>{stats.resolvedComplaints ?? '—'}</strong></li>
          <li>Top category: <strong>{stats.commonComplaintTitles?.[0]?._id ?? '—'}</strong></li>
        </ul>
      </div>
    </aside>
  );
};

export default DashboardSidebar;