// src/components/ComplaintTypeSelector.jsx
const TYPES = ["Noise", "Cleanliness", "Bills", "Pets", "Other"];

const ComplaintTypeSelector = ({ selectedType, setSelectedType }) => (
  <div className="flex gap-2 flex-wrap">
    {TYPES.map((type) => (
      <button
        key={type}
        type="button"
        onClick={() => setSelectedType(type)}
        className={`px-3 py-1 rounded ${
          selectedType === type ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        {type}
      </button>
    ))}
  </div>
);

export default ComplaintTypeSelector;