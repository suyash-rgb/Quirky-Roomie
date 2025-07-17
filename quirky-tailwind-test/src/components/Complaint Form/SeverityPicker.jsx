// src/components/SeverityPicker.jsx
const SEVERITY_LEVELS = [
  { label: "Mild", emoji: "😌" },
  { label: "Annoying", emoji: "😤" },
  { label: "Major", emoji: "😠" },
  { label: "Nuclear", emoji: "💣" },
];

const SeverityPicker = ({ severity, setSeverity }) => (
  <div className="flex gap-2 flex-wrap mt-2">
    {SEVERITY_LEVELS.map(({ label, emoji }) => (
      <button
        key={label}
        type="button"
        onClick={() => setSeverity(label)}
        className={`px-3 py-1 rounded border ${
          severity === label ? "bg-red-600 text-white" : "bg-gray-100"
        }`}
      >
        {emoji} {label}
      </button>
    ))}
  </div>
);

export default SeverityPicker;