/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

const IconlistingContentFill: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M515.562667 168.917333c159.061333 0 288 128.938667 288 288v22.250667A85.354667 85.354667 0 0 1 874.666667 563.306667v93.994666a85.333333 85.333333 0 0 1-85.333334 85.333334h-116.138666V477.973333h66.346666v-21.056c0-121.685333-97.002667-220.693333-217.92-223.914666l-6.058666-0.085334h-7.125334c-123.712 0-224 100.288-224 224v21.056h66.368v264.661334H234.666667a85.333333 85.333333 0 0 1-85.333334-85.333334v-93.994666a85.354667 85.354667 0 0 1 71.104-84.138667v-22.250667c0-159.061333 128.938667-288 288-288z m27.52 313.813334v256h-62.165334v-256h62.165334z m103.616 42.666666v192H584.533333v-192h62.165334z m-207.232 0v192h-62.165334v-192H439.466667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconlistingContentFill.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconlistingContentFill) : IconlistingContentFill;
