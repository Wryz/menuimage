import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface SparklesIconProps {
  size?: number;
  color?: string;
}

export const SparklesIcon: React.FC<SparklesIconProps> = ({
  size = 24,
  color = '#FF6B35',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L13.5 7L18 8.5L13.5 10L12 15L10.5 10L6 8.5L10.5 7L12 2Z"
        fill={color}
      />
      <Path
        d="M19 10L19.75 12L21.5 12.75L19.75 13.5L19 16L18.25 13.5L16.5 12.75L18.25 12L19 10Z"
        fill={color}
      />
      <Path
        d="M19 19L19.75 21L21.5 21.75L19.75 22.5L19 25L18.25 22.5L16.5 21.75L18.25 21L19 19Z"
        fill={color}
      />
    </Svg>
  );
};

