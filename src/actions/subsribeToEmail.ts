"use server";
import { db } from "@/db";
import { subsribers } from "@/db/schema";

export const subsribeToNewsletter = async (
    email: string,
    role: "admin" | "user"
) => {
    await db.insert(subsribers).values({
        email: email,
        role: role
    });
};