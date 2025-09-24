import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ProfileCardProps {
  name: string;
  job: string;
  avatarUrl?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  job,
  avatarUrl = 'https://i.pravatar.cc/150',
}) => {
  return (
    
    <View style={styles.container}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.job}>{job}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    margin: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 8,
  },
  job: {
    fontStyle: 'italic',
    color: '#888',
    fontSize: 16,
  },
});

export default ProfileCard;
