import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

interface MenuIconProps {
  size?: number;
  color?: string;
}

export const MenuIcon: React.FC<MenuIconProps> = ({
  size = 24,
  color = '#FF6B35',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 12H21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M3 6H21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M3 18H21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Circle cx={7} cy={6} r={1.5} fill={color} />
      <Circle cx={7} cy={12} r={1.5} fill={color} />
      <Circle cx={7} cy={18} r={1.5} fill={color} />
    </Svg>
  );
};

