import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

export const Briefcase = ({ width, height, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 29 29" fill="none">
      <G id="Icon/Outline/briefcase">
        <Path
          id="Icon"
          d="M24.7572 16.1767C21.5703 17.4668 18.0867 18.1772 14.4372 18.1772C10.7877 18.1772 7.30411 17.4668 4.11719 16.1767M19.0239 7.85717V5.56384C19.0239 4.29727 17.9971 3.27051 16.7305 3.27051H12.1439C10.8773 3.27051 9.85052 4.29727 9.85052 5.56384V7.85717M14.4372 14.7372H14.4487M6.41052 23.9105H22.4639C23.7304 23.9105 24.7572 22.8837 24.7572 21.6172V10.1505C24.7572 8.88393 23.7304 7.85717 22.4639 7.85717H6.41052C5.14395 7.85717 4.11719 8.88393 4.11719 10.1505V21.6172C4.11719 22.8837 5.14395 23.9105 6.41052 23.9105Z"
          stroke={color}
          strokeWidth={1.14667}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

