import React, { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { motion } from 'framer-motion';

import {
  getComplaints,
  voteComplaint,
  logComplaint,
  getLeaderboard,
  getFlatStats
} from '../services/api';

const Listings = () => {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [trending, setTrending] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [stats, setStats] = useState({});
  const flatCode = localStorage.getItem('flatCode');

  useEffect(() => {
    fetchAll();
  }, [token]);

  const fetchAll = async () => {
    try {
      const [complaintsRes, leadRes, statsRes] = await Promise.all([
        getComplaints(token),
        getLeaderboard(token),
        getFlatStats(flatCode, token)
      ]);

      setComplaints(complaintsRes.data);
      setLeaderboard(leadRes.data.leaderboard);
      setStats(statsRes.data);

      setTrending(
        complaintsRes.data
          .slice()
          .sort((a, b) => b.votes - a.votes)
          .filter(c => !c.resolved)
          .slice(0, 1)
      );
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  const handleVote = async (id, type) => {
    try {
      await voteComplaint(id, type, token);
      fetchAll();
    } catch (err) {
      console.error('Vote error:', err);
    }
  };

  const handleResolve = async (id) => {
    try {
      await logComplaint({ id }, token);
      fetchAll();
    } catch (err) {
      console.error('Resolve error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <h1 className="text-4xl font-chewy text-purple-600 mb-4">Flat Complaints</h1>

          {complaints.length === 0 && (
            <p className="text-center text-gray-500">No active complaints. All clear! 🎉</p>
          )}

          {complaints.map(c => (
            <motion.div
              key={c._id}
              className="p-6 bg-white rounded-xl shadow-lg flex flex-col"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start">
                <h2 className="font-semibold text-xl">{c.title}</h2>
                <span className="text-sm text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="mt-2 text-gray-700 flex-grow">{c.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleVote(c._id, 'upvote')}
                    className="flex items-center space-x-1 text-green-600 hover:text-green-800"
                  >
                    👍<span>{c.votes}</span>
                  </button>
                  <button
                    onClick={() => handleVote(c._id, 'downvote')}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                  >
                    👎
                  </button>
                </div>
                {!c.resolved ? (
                  <button
                    onClick={() => handleResolve(c._id)}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Mark Resolved
                  </button>
                ) : (
                  <span className="text-sm text-green-600 font-semibold">Resolved ✅</span>
                )}
              </div>
            </motion.div>
          ))}
        </section>

        <aside className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-chewy text-2xl text-yellow-500 mb-3">Problem of the Week</h3>
            {trending[0] ? (
              <p className="text-gray-800">“{trending[0].title}” with {trending[0].votes} upvotes</p>
            ) : (
              <p className="text-gray-500">No trending issues yet.</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-chewy text-2xl text-teal-500 mb-3">Leaderboard</h3>
            <ol className="list-decimal list-inside space-y-1 font-nunito">
              {leaderboard.map((u) => (
                <li key={u._id} className="flex justify-between">
                  <span>{u.name}</span>
                  <span className="font-semibold">{u.karma} ⭐</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-chewy text-2xl text-pink-500 mb-3">Flat Stats</h3>
            <ul className="space-y-2 text-gray-700 font-nunito">
              <li>Total complaints: <strong>{stats.totalComplaints}</strong></li>
              <li>Resolved: <strong>{stats.resolvedComplaints}</strong></li>
              <li>Top category: <strong>{stats.commonComplaintTitles?.[0]?._id || '—'}</strong></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Listings;
