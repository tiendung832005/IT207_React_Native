import React from "react";
import { useContacts } from "../hooks/useContacts";
import ContactForm from "../components/ContactForm";

export default function AddContactScreen({ navigation }: { navigation: any }) {
  const { addContact } = useContacts();

  return (
    <ContactForm
      onSubmit={(contact) => {
        addContact(contact);
        navigation.goBack();
      }}
    />
  );
}
