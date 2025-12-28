import React from 'react';

interface IranFlagProps {
  size?: number;
  className?: string;
}

/**
 * پرچم شیر و خورشید ایران - Lion and Sun flag of Iran
 * Uses the actual flag image from /flag_iran.png
 */
const IranFlag: React.FC<IranFlagProps> = ({ size = 64, className = '' }) => {
  // Calculate aspect ratio (3:2 is standard flag ratio)
  const aspectRatio = 3 / 2;
  const width = size * aspectRatio;
  const height = size;

  return (
    <img
      src="/flag_iran.png"
      alt="پرچم شیر و خورشید ایران - Lion and Sun flag of Iran"
      width={width}
      height={height}
      className={className}
      style={{
        display: 'inline-block',
        maxWidth: '100%',
        height: 'auto',
        objectFit: 'contain',
      }}
    />
  );
};

export default IranFlag;
