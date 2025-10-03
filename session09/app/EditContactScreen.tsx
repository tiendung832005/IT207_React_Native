import React from "react";
import { useContacts } from "../hooks/useContacts";
import ContactForm from "../components/ContactForm";
import { Contact } from "../constants/types";

export default function EditContactScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { updateContact } = useContacts();
  const { contact } = route.params as { contact: Contact };

  return (
    <ContactForm
      initial={contact}
      onSubmit={(updated) => {
        updateContact(updated);
        navigation.goBack();
      }}
    />
  );
}
