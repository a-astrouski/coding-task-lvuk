import React, { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useParallax } from '@/components/parallax/useParallax';

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({ children, headerImage, headerBackgroundColor }: Props) {
  const bottom = useBottomTabOverflow();

  const { scrollHandler, renderHeader, renderStatusBar } = useParallax({
    headerHeight: 170,
    headerImage,
    headerBackgroundColor,
  });

  return (
    <View style={styles.container}>
      {renderStatusBar()}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}>
        {renderHeader()}
        <View style={styles.content}>{children}</View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
