// src/components/ComplaintList.jsx
const ComplaintList = ({ complaints }) => {
  if (!complaints.length) return <p className="text-center text-gray-400">No complaints yet.</p>;

  return (
    <div className="mt-6 space-y-4">
      {complaints.map((c, index) => (
        <div key={index} className="border p-4 rounded shadow-sm bg-white">
          <h3 className="font-bold text-lg mb-1">{c.title}</h3>
          <p className="text-sm text-gray-700 mb-2">{c.description}</p>
          <p className="text-sm text-blue-600">Type: {c.type} | Severity: {c.severity}</p>
          <p className="text-xs text-gray-500 mt-1">Filed at: {new Date(c.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;