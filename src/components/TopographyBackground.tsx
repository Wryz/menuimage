import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Defs, Pattern, Rect, G} from 'react-native-svg';
import TopographySvgComponent from '../../assets/topography.svg';

interface TopographyBackgroundProps {
  opacity?: number;
  color?: string;
}

export const TopographyBackground: React.FC<TopographyBackgroundProps> = ({
  opacity = 0.2,
  color = '#E85A2A',
}) => {
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <Svg width="100%" height="100%" style={styles.background}>
        <Defs>
          <Pattern
            id="topographyPattern"
            x={0}
            y={0}
            width={600}
            height={600}
            patternUnits="userSpaceOnUse">
            <G opacity={opacity} fill={color}>
              <TopographySvgComponent width={600} height={600} />
            </G>
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#topographyPattern)" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
});

