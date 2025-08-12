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

function ParallaxFlatList(props: Props) {
  const bottomTab = useBottomTabOverflow();
  const { bottom } = useSafeAreaInsets();

  const {
    headerImage,
    headerComponent,
    headerBackgroundColor,
    renderItem,
    CellRendererComponent,
    data,
    ...flatListProps
  } = props;

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
        contentContainerStyle={{ paddingBottom: bottomTab + bottom + 15 }}
        renderItem={renderItem}
        data={data}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator
        ListHeaderComponent={
          <View>
            {renderHeader()}
            {props.headerComponent}
          </View>
        }
        {...flatListProps}
      />
    </View>
  );
}

export default React.memo(ParallaxFlatList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
