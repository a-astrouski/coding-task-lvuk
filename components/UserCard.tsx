import { UserDto } from '@/api';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

type Props = {
  item: UserDto;
};

export default function UserCard(props: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View
      style={[
        styles.userCard,
        { backgroundColor: Colors[colorScheme].background, shadowColor: Colors[colorScheme].shadow },
      ]}>
      <View style={[styles.userAvatar, { backgroundColor: Colors[colorScheme].tint }]}>
        <Text style={[styles.userInitial, { color: Colors[colorScheme].background }]}>
          {props.item.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={[styles.userName, { color: Colors[colorScheme].text }]}>{props.item.name}</Text>
        <Text style={[styles.userSubtext, { color: Colors[colorScheme].secondaryText }]}>
          User ID: {props.item.id}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInitial: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  userSubtext: {
    fontSize: 14,
  },
});
