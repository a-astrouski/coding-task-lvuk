import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ApiService, UserDto } from '@/api';
import { ParallaxFlatList } from '@/components/parallax';
import UserCard from '@/components/UserCard';
import SearchInput from '@/components/SearchInput';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const keyExtractor = (item: UserDto) => item.id.toString();

export default function TabTwoScreen() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [query, setQuery] = useState('');

  const colorScheme = useColorScheme() ?? 'light';

  useEffect(() => {
    ApiService.users.getUsers().then(setUsers);
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(userProfile => userProfile.name.toLowerCase().includes(query.toLowerCase()));
  }, [query, users]);

  const onXmarkPress = useCallback(() => {
    setQuery('');
  }, []);

  const renderUser = useCallback(({ item }: { item: UserDto }) => <UserCard item={item} />, []);

  return (
    <ParallaxFlatList
      keyExtractor={keyExtractor}
      data={filteredUsers}
      renderItem={renderUser}
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={10}
      updateCellsBatchingPeriod={50}
      headerComponent={
        <View style={styles.headerContainer}>
          <Text style={[styles.headerTitle, { color: Colors[colorScheme].text }]}>Users</Text>
          <SearchInput value={query} onChangeText={setQuery} onButtonPress={onXmarkPress} />
        </View>
      }
      headerImage={
        <IconSymbol size={310} color="#808080" name="brain.head.profile.fill" style={styles.headerImage} />
      }
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
