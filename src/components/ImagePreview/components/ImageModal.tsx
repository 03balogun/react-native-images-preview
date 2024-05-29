import React from 'react';
import { ActivityIndicator, Modal, SafeAreaView } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useImageModal } from '../hooks';
import type { ImageModalProps } from '../Types';
import Header from './Header';
import { ImageModalStyle } from './styles';
import Footer from './Footer';

const ImageModal = ({
  setModalConfig,
  modalConfig,
  renderHeader,
  renderFooter,
  imageSource,
  doubleTapZoomEnabled,
  pinchZoomEnabled,
  swipeDownCloseEnabled,
}: ImageModalProps) => {
  const styles = ImageModalStyle(
    modalConfig.x,
    modalConfig.y,
    modalConfig.height,
    modalConfig.width
  );
  const {
    imageAnimatedStyle,
    onPressClose,
    modalAnimatedStyle,
    animatedImageRef,
    animatedImageStyle,
    loading,
    setLoading,
    sectionOpacityAnimation,
    doubleTapEvent,
    panGestureEvent,
    pinchGestureEvent,
  } = useImageModal({
    modalConfig,
    setModalConfig,
    pinchZoomEnabled,
    doubleTapZoomEnabled,
    swipeDownCloseEnabled,
  });

  return (
    <Modal visible={modalConfig.visible} transparent>
      <GestureHandlerRootView style={styles.gestureContainer}>
        <GestureDetector
          gesture={Gesture.Race(
            doubleTapEvent,
            Gesture.Simultaneous(panGestureEvent, pinchGestureEvent)
          )}>
          <Animated.View style={[styles.modalContainer, modalAnimatedStyle]}>
            <SafeAreaView style={styles.modalContainer}>
              <Header
                {...{ renderHeader, onPressClose, sectionOpacityAnimation }}
              />
              {loading && (
                <ActivityIndicator style={styles.activityIndicatorStyle} />
              )}
              <Animated.Image
                ref={animatedImageRef}
                source={imageSource}
                resizeMode={'contain'}
                style={[
                  animatedImageStyle,
                  imageAnimatedStyle,
                  styles.imageStyle,
                ]}
                onLoadStart={() => {
                  setLoading(true);
                }}
                onLoadEnd={() => {
                  setLoading(false);
                }}
              />
              <Footer
                {...{ renderFooter, onPressClose, sectionOpacityAnimation }}
              />
            </SafeAreaView>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default ImageModal;
