import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/useAuth';
import { motion } from 'framer-motion';
import DashboardSidebar from "../components/Listings/DashboardSidebar";
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import Footer from "../components/Footer";

import {
  getComplaints,
  voteComplaint,
  resolveComplaint,
  getLeaderboard,
  getFlatStats
} from '../services/api';


const Listings = () => {
  const { authToken } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [trending, setTrending] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [stats, setStats] = useState({});
  const flatCode = localStorage.getItem('flatCode');

  useEffect(() => {
    fetchAll();
  }, [authToken]);

  const fetchAll = async () => {
    try {
      const [complaintsRes, leadRes, statsRes] = await Promise.all([
        getComplaints(authToken),
        getLeaderboard(authToken),
        flatCode ? getFlatStats(flatCode, authToken) : Promise.resolve({ data: {} })
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
      await voteComplaint(id, type, authToken);
      toast.success("Vote registered!");
      fetchAll();
    } catch (err) {
      console.error('Vote error:', err);
      toast.error(err.response?.data?.message || "Voting failed.");
    }
  };

  const handleResolve = async (id) => {
    try {
      await resolveComplaint(id, authToken);
      toast.success("Complaint resolved!");
      fetchAll();
    } catch (err) {
      console.error('Resolve error:', err);
      toast.error(err.response?.data?.message || "Resolution failed.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Main content should grow and fill available space */}
     <main className="flex-grow py-10 px-4">

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
                    <ArrowUpIcon className="w-5 h-5" />
                    <span>{c.votes}</span>
                  </button>
                  <button
                    onClick={() => handleVote(c._id, 'downvote')}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                  >
                    <ArrowDownIcon className="w-5 h-5" />
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

        <DashboardSidebar leaderboard={leaderboard} /> 
      </div>
      </main>

      <Footer />
    </div>
    
  );
};

export default Listings;
