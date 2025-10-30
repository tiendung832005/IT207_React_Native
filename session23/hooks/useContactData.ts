// hooks/useContactData.ts
import { useState } from "react";
import { MOCK_CONTACTS } from "../constants/MockData";
import { Contact } from "../types";

// Dữ liệu fix cứng ban đầu
let internalContacts: Contact[] = MOCK_CONTACTS;

// Đây là một "giả-singleton" hook để giữ state khi chuyển tab
// Trong app thật, bạn sẽ dùng Context, Zustand, Redux...
export const useContactData = () => {
  const [contacts, setContacts] = useState<Contact[]>(internalContacts);

  const updateContact = (updatedContact: Contact) => {
    internalContacts = internalContacts.map((c) =>
      c.id === updatedContact.id ? updatedContact : c
    );
    setContacts(internalContacts);
  };

  const deleteContact = (id: string) => {
    internalContacts = internalContacts.filter((c) => c.id !== id);
    setContacts(internalContacts);
  };

  const addContact = (newContactData: Omit<Contact, "id" | "isBlocked">) => {
    const newContact: Contact = {
      ...newContactData,
      id: Date.now().toString(),
      isBlocked: false,
    };
    internalContacts = [newContact, ...internalContacts];
    setContacts(internalContacts);
  };

  const toggleBlockStatus = (id: string) => {
    const contact = internalContacts.find((c) => c.id === id);
    if (contact) {
      updateContact({ ...contact, isBlocked: !contact.isBlocked });
    }
  };

  return {
    contacts,
    updateContact,
    deleteContact,
    addContact,
    toggleBlockStatus,
  };
};