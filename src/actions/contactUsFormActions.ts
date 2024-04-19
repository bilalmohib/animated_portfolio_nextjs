"use server";
import { db } from "@/db";
import { contactUsForm } from "@/db/schema";

export const addContactUsForm = async (name: string, email: string, phone: string, message: string) => {
    await db.insert(contactUsForm).values({
        name: name,
        email: email,
        phone: phone,
        message: message
    });
};