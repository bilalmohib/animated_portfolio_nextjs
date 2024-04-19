"use server";
import { ServicesNeededType } from "@/app/contact/page";
import { contactUsForm } from "@/db/schema";
import { db } from "@/db";

export const addContactUsForm = async (name: string, email: string, phone: string, message: string, servicesNeeded: ServicesNeededType) => {
    await db.insert(contactUsForm).values({
        name: name,
        email: email,
        phone: phone,
        message: message,
        servicesNeeded: servicesNeeded
    });
};