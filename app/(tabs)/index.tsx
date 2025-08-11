import { Image, StyleSheet, Text, View } from 'react-native';
import { ParallaxScrollView } from '@/components/parallax';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#dfbe54', dark: '#473c1d' }}
      headerImage={
        <Image
          source={require('@/assets/images/lv-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.stepContainer}>
        <Text style={styles.heading}>Hello 👋</Text>
        <Text style={styles.text}>
          Have a look at the simple user search component on the 'Task' tab.
          You can find this component in <Text style={{fontStyle: 'italic'}}>app/tabs/explore.tsx</Text>
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text style={styles.heading}>The Task</Text>
        <Text style={styles.text}>Imagine that the component was 'heavier' and part of a much larger app.</Text>
        <Text style={styles.text}>▪️ Fix any bugs</Text>
        <Text style={styles.text}>▪️ Optimise the performance of the component</Text>
        <Text style={styles.text}>▪️ Style it up, make the UI more user friendly</Text>
        <Text style={styles.text}>▪️ Dont spend longer than 2 hours </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text style={styles.heading}>When you're done</Text>
        <Text style={styles.text}>▪️ Add an explaination of what you have done and why to the README.md </Text>
        <Text style={styles.text}>▪️ Push your version up to your git and send us the link (please dont push it to our repo)</Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
  },
  text: {
    fontSize: 14,
    lineHeight: 24,
    display: 'flex',
  },
  block: {
    
    color: 'blue',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
