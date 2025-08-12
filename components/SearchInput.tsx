import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

type Props = {
  value: string;
  onChangeText: (value: ((prevState: string) => string) | string) => void;
  onButtonPress: () => void;
};

export default function SearchInput(props: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View
      style={[
        styles.searchContainer,
        { backgroundColor: Colors[colorScheme].background, shadowColor: Colors[colorScheme].shadow },
      ]}>
      <IconSymbol
        name="magnifyingglass"
        size={20}
        color={Colors[colorScheme].icon}
        style={styles.searchIcon}
      />
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder="Search users..."
        style={[styles.searchInput, { color: Colors[colorScheme].text }]}
        placeholderTextColor={Colors[colorScheme].placeholder}
      />
      {props.value.length > 0 && (
        <TouchableOpacity style={styles.clearIconContainer} onPress={props.onButtonPress}>
          <IconSymbol name="xmark.circle.fill" size={20} color={Colors[colorScheme].icon} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
  },
  clearIconContainer: {
    marginLeft: 8,
  },
});
