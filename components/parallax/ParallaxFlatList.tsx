import React, { ReactElement } from 'react';
import { FlatListProps, StyleSheet, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useParallax } from '@/components/parallax/useParallax';

type Props = {
  headerImage: ReactElement;
  headerComponent?: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
} & FlatListProps<any>;

export default function ParallaxFlatList(props: Props) {
  const bottomTab = useBottomTabOverflow();
  const { bottom } = useSafeAreaInsets();

  const { scrollHandler, renderHeader, renderStatusBar } = useParallax({
    headerImage: props.headerImage,
    headerBackgroundColor: props.headerBackgroundColor,
  });

  return (
    <View style={styles.container}>
      {renderStatusBar()}
      <Animated.FlatList
        onScroll={scrollHandler}
        itemLayoutAnimation={LinearTransition}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom: bottomTab }}
        contentContainerStyle={{ paddingBottom: bottomTab + bottom }}
        renderItem={props.renderItem}
        data={props.data}
        ListHeaderComponent={
          <View>
            {renderHeader()}
            {props.headerComponent}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
