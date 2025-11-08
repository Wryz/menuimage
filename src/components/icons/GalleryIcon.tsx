import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

interface GalleryIconProps {
  size?: number;
  color?: string;
}

export const GalleryIcon: React.FC<GalleryIconProps> = ({
  size = 24,
  color = '#FF6B35',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={3}
        width={18}
        height={18}
        rx={2}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 16L8 11C8.55228 10.4477 9.44772 10.4477 10 11L15 16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 15L16 13C16.5523 12.4477 17.4477 12.4477 18 13L21 16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 9.5C9 10.3284 8.32843 11 7.5 11C6.67157 11 6 10.3284 6 9.5C6 8.67157 6.67157 8 7.5 8C8.32843 8 9 8.67157 9 9.5Z"
        fill={color}
      />
    </Svg>
  );
};

