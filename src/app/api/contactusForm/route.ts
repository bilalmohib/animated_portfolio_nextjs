// Create a nextjs post route for the contact us form
import { db } from '@/db';
import { contactUsForm } from '@/db/schema';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest) {
    const { name, email, phone, message } = await req.body.json();
    const contactFormDetails = {
        name,
        email,
        phone,
        message,
        /*    servicesNeeded */
    };
    /* await db.insert(contactUsForm).values(contactFormDetails).then(() => {
        return NextResponse.json({ message: 'Contact Saved Successfully' }, { status: 201 });
    }).catch((error) => {
        return NextResponse.json({ message: 'Error saving contact', error }, { status: 400 });
    }); */
    try {
        await db.insert(contactUsForm).values({
            name: "contactFormDetails.name",
            email: "contactFormDetails.email",
            phone: "contactFormDetails.phone",
            message: "contactFormDetails.message"
        });
        return Response.json({
            message: 'Contact Saved Successfully',
            data: JSON.stringify(contactFormDetails)
        }, { status: 201 });
    } catch (error) {
        return Response.json({ message: 'Error saving contact', error }, { status: 400 });
    }
}
