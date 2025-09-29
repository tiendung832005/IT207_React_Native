import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface BusinessCardProps {
  avatarUrl: string;
  name: string;
  jobTitle: string;
  contactInfo: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  avatarUrl,
  name,
  jobTitle,
  contactInfo,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.jobTitle}>{jobTitle}</Text>
      <Text style={styles.contact}>{contactInfo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 24,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#2196f3",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  jobTitle: {
    fontSize: 16,
    color: "#2196f3",
    marginBottom: 8,
  },
  contact: {
    fontSize: 14,
    color: "#555",
  },
});

export default BusinessCard;
