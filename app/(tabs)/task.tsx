import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ApiService, UserDto } from '@/api';

const keyExtractor = (item: UserDto) => item.id.toString();

export default function TabTwoScreen() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    ApiService.users.getUsers().then(setUsers);
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(userProfile => userProfile.name.toLowerCase().includes(query.toLowerCase()));
  }, [query, users]);

  const renderUser = useCallback(({ item }: { item: UserDto }) => <Text>{item.name}</Text>, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol size={310} color="#808080" name="brain.head.profile.fill" style={styles.headerImage} />
      }>
      <View style={styles.container}>
        <TextInput value={query} onChangeText={setQuery} placeholder="Search users..." />
      </View>
      <FlatList data={filteredUsers} keyExtractor={keyExtractor} renderItem={renderUser} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  container: {
    flexDirection: 'row',
    gap: 8,
  },
});
