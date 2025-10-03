import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Contact } from "../constants/types";

const STORAGE_KEY = "contacts";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      if (data) setContacts(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact: Contact) => setContacts(prev => [...prev, contact]);
  const updateContact = (contact: Contact) =>
    setContacts(prev => prev.map(c => (c.id === contact.id ? contact : c)));
  const deleteContact = (id: string) =>
    setContacts(prev => prev.filter(c => c.id !== id));

  return { contacts, addContact, updateContact, deleteContact };
}
