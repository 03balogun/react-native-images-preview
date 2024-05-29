import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { Strings } from '../../../constants';
import type { SectionProps } from '../Types';
import { HeaderStyle as styles } from './styles';

const Header = ({
  renderHeader,
  onPressClose,
  sectionOpacityAnimation,
}: SectionProps) => {
  return (
    <Animated.View style={[styles.closeButtonParent, sectionOpacityAnimation]}>
      {renderHeader ? (
        renderHeader(onPressClose)
      ) : (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            onPressClose();
          }}>
          <Text style={styles.closeText}>{Strings.close}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default Header;
