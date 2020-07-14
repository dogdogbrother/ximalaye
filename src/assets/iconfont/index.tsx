/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconfavoritesFill from './IconfavoritesFill';
import IconlistingContentFill from './IconlistingContentFill';
import IconhomeFill from './IconhomeFill';

export type IconNames = 'iconfavorites-fill' | 'iconlisting-content-fill' | 'iconhome-fill';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'iconfavorites-fill':
      return <IconfavoritesFill key="1" {...rest} />;
    case 'iconlisting-content-fill':
      return <IconlistingContentFill key="2" {...rest} />;
    case 'iconhome-fill':
      return <IconhomeFill key="3" {...rest} />;
  }

  return null;
};

export default React.memo ? React.memo(IconFont) : IconFont;
