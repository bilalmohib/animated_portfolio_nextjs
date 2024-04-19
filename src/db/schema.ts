import { json, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum("user_role", ["admin", "user"]);

export const subsribers = pgTable("subsribers", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 256 }).notNull(),
    role: userRoleEnum("role").default("user").notNull(),
    /*     created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull() */
});

export const contactUsForm = pgTable("contact_us_form", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    email: varchar("email").notNull(),
    phone: varchar("phone").notNull(),
    message: text("message").notNull(),
    /*     servicesNeeded: json("services_needed") */
    /*  created_at: timestamp("created_at", { mode: "date" }).defaultNow() */
});