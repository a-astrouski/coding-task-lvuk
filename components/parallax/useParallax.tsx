import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { ReactElement, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const HEADER_HEIGHT = 170;

interface UseParallaxOptions {
  headerHeight?: number;
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}

export function useParallax(options: UseParallaxOptions) {
  const { headerHeight = HEADER_HEIGHT, headerImage, headerBackgroundColor } = options;

  const colorScheme = useColorScheme() ?? 'light';
  const { top } = useSafeAreaInsets();

  const scrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [-headerHeight / 2, 0, 0],
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-headerHeight, 0, headerHeight], [2, 1, 1]),
        },
      ],
    };
  });

  const renderHeader = useCallback(() => {
    return (
      <Animated.View
        style={[
          styles.header,
          { height: headerHeight, backgroundColor: headerBackgroundColor[colorScheme] },
          headerAnimatedStyle,
        ]}>
        {headerImage}
      </Animated.View>
    );
  }, [colorScheme, headerAnimatedStyle, headerBackgroundColor, headerHeight, headerImage]);

  const statusBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [headerHeight - top - 3, headerHeight - top],
        [0, 1],
        Extrapolation.CLAMP,
      ),
    };
  });

  const renderStatusBar = useCallback(() => {
    return (
      <Animated.View
        style={[
          styles.statusBar,
          { height: top, backgroundColor: Colors[colorScheme].background },
          statusBarAnimatedStyle,
        ]}></Animated.View>
    );
  }, [colorScheme, statusBarAnimatedStyle, top]);

  return {
    scrollOffset,
    scrollHandler,
    headerAnimatedStyle,
    renderHeader,
    statusBarAnimatedStyle,
    renderStatusBar,
  };
}

const styles = StyleSheet.create({
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  header: {
    overflow: 'hidden',
  },
});
