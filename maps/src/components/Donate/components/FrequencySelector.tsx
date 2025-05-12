import React from 'react';

interface FrequencyOption {
  id: string;
  label: string;
}

interface FrequencySelectorProps {
  options: FrequencyOption[];
  selectedFrequency: string;
  onChange: (frequency: string) => void;
}

const FrequencySelector: React.FC<FrequencySelectorProps> = ({
  options,
  selectedFrequency,
  onChange
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Donation Frequency</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Choose how often you'd like to donate
      </p>
      
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option.id}
            type="button"
            className={`btn ${selectedFrequency === option.id ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FrequencySelector;