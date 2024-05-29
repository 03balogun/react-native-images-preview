import React from 'react';
import Animated from 'react-native-reanimated';
import type { SectionProps } from '../Types';
import { HeaderStyle as styles } from './styles';

const Footer = ({
  renderFooter,
  onPressClose,
  sectionOpacityAnimation,
}: SectionProps) => {
  if (!renderFooter) return null;

  return (
    <Animated.View style={[styles.closeButtonParent, sectionOpacityAnimation]}>
      {renderFooter(onPressClose)}
    </Animated.View>
  );
};

export default Footer;
