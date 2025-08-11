import React, { ReactElement } from 'react';
import { FlatListProps, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

const HEADER_HEIGHT = 170;

type Props = {
  headerImage: ReactElement;
  headerComponent?: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
} & FlatListProps<any>;

export default function ParallaxFlatList(props: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollOffset = useSharedValue(0);
  const bottom = useBottomTabOverflow();

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
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        onScroll={scrollHandler}
        ListHeaderComponent={
          <View>
            <Animated.View
              style={[
                styles.header,
                { backgroundColor: props.headerBackgroundColor[colorScheme] },
                headerAnimatedStyle,
              ]}>
              {props.headerImage}
            </Animated.View>
            {props.headerComponent}
          </View>
        }
        style={{ backgroundColor: 'transparent' }}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
        renderItem={props.renderItem}
        data={props.data}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'teal',
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
