// app/(tabs)/(contacts)/edit.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import * as yup from "yup";
import ContactForm from "../../../components/ContactForm";
import { useContactData } from "../../../hooks/useContactData";
import { ContactFormData, ContactTag } from "../../../types";

const phoneRegExp = /^(0|\+84)[3|5|7|8|9|1[2|6|8|9]]+([0-9]{8})$/;
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Tên là bắt buộc")
    .min(3, "Tên phải có ít nhất 3 ký tự"),
  phone: yup
    .string()
    .required("SĐT là bắt buộc")
    .matches(phoneRegExp, "Số điện thoại không hợp lệ"),
  tag: yup.string().oneOf(Object.values(ContactTag)).required(),
});

export default function EditContactScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { contacts, updateContact } = useContactData();

  const contactToEdit = contacts.find((c) => c.id === id);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    defaultValues: contactToEdit
      ? {
          name: contactToEdit.name,
          phone: contactToEdit.phone,
          tag: contactToEdit.tag,
        }
      : {
          name: "",
          phone: "",
          tag: ContactTag.Friend,
        },
  });

  // Giả lập hàm submit
  const onSubmit = (data: ContactFormData) => {
    if (!contactToEdit) return;

    const updatedData = {
      ...contactToEdit, // Giữ lại id và isBlocked
      ...data, // Ghi đè name, phone, tag
    };

    console.log("Dữ liệu cập nhật (UI-only):", updatedData);
    updateContact(updatedData); // Cập nhật state chung
    router.back();
  };

  if (!contactToEdit) {
    return (
      <View>
        <Text>Không tìm thấy liên hệ.</Text>
      </View>
    );
  }

  return (
    <ContactForm
      control={control}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      isEdit
    />
  );
}