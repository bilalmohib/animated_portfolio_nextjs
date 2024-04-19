"use client";
import { z } from "zod"
import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { subsribeToNewsletter } from '@/actions/subsribeToEmail';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import clsx from 'clsx'

import Button from '@/common/Button';
import { Container } from '@/common/Container';

import {
    DribbbleIcon,
    InstagramIcon,
    TwitterIcon,
    LinkedInIcon,
    GitHubIcon,
    EmailIcon,
} from './SocialIcons'
import { useSnackbar } from 'notistack';

const links = [
    { label: 'Home', href: '/' },
    /*  { label: 'About', href: '/about' },
     { label: 'Work', href: '/work' },
     { label: 'Blog', href: '/blog' }, */
    { label: 'Contact', href: '/contact' },
]

const socialLinks = [
    {
        label: 'Email me',
        icon: EmailIcon,
        href: 'mailto:bilalmohib7896@gmail.com',
    },
    /*     {
            label: 'Dribbble',
            icon: DribbbleIcon,
            href: '#',
        }, */
    /*     {
            label: 'Instagram',
            icon: InstagramIcon,
            href: '#',
        }, */
    {
        label: 'Twitter',
        icon: TwitterIcon,
        href: 'https://twitter.com/bilalmohib',
    },
    {
        label: 'LinkedIn',
        icon: LinkedInIcon,
        href: 'https://www.linkedin.com/in/bilalmohib/',
    },
    {
        label: 'Github',
        icon: GitHubIcon,
        href: 'https://github.com/bilalmohib',
    },
]

interface SocialLinkProps {
    icon: React.ElementType
    label: string
    href: string
}

const validationSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
});

function SocialLink({ icon: Icon, label, ...props }: SocialLinkProps) {
    return (
        <Link
            className="flex items-center justify-center gap-2.5 rounded-full border border-slate-600/90 py-2.5 text-sm text-slate-50 duration-200 ease-in-out hover:bg-slate-800 hover:text-white lg:gap-2 xl:gap-2.5"
            {...props}
        >
            <Icon className="h-4 w-4 shrink-0 text-slate-200 duration-200 ease-in-out group-hover:fill-slate-100" />
            {label}
        </Link>
    )
}

function Footer({ newsletter = true }) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // close all snackbars on unmount
    useEffect(() => {
        return () => {
            closeSnackbar();
        }
    }, []);

    const submitForm = async (data: z.infer<typeof validationSchema>) => {
        console.log("Form Data just before sending to server ===> ", data);

        const contactFormDetails: { email: string, role: "user" | "admin" } = {
            email: data.email,
            role: (data.email !== "bilalmohib7896@gmail.com") ? "user" : "admin",
        }

        console.log("Contact Form Details ===> ", contactFormDetails);

        try {
            await subsribeToNewsletter(contactFormDetails.email, contactFormDetails.role).then(() => {
                enqueueSnackbar('Thank you for subscribing to my newsletter! You will receive an email shortly to confirm your subscription.', {
                    variant: "default",
                    autoHideDuration: 5000
                });
                // 
                formik.resetForm();
            }).catch((error) => {
                console.log("Error:", error);
                enqueueSnackbar(`Oops! A Error occured saving your information : ${error}`, {
                    variant: "error",
                    autoHideDuration: 5000
                });
            });
        } catch (error) {
            console.log("Error ===> ", error);
            enqueueSnackbar(`Oops! A Error occured saving your information : ${error}`, {
                variant: "error",
                autoHideDuration: 5000
            });
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: toFormikValidationSchema(validationSchema),
        onSubmit: async (values: z.infer<typeof validationSchema>) => {
            submitForm(values);
        },
    });

    return (
        <section className={clsx(newsletter && 'pt-12 sm:pt-16')}>
            {newsletter && (
                <div className="relative">
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-slate-900"></div>
                    <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="relative overflow-hidden rounded-2xl bg-sky-700 px-5 py-12 sm:px-16 lg:py-14">
                            <Image
                                src={"/images/newsletter-bg.png"}
                                alt="NewsLetter"
                                width={1920}
                                height={1080}
                                className="absolute inset-0 h-full w-full object-cover object-right"
                            />
                            <div className="relative flex w-full flex-col items-center lg:flex-row">
                                <div className="max-w-2xl text-center lg:pr-4 lg:text-left">
                                    <h3 className="font-display text-4xl font-semibold text-white sm:text-5xl">
                                        Subscribe to my newsletter
                                    </h3>
                                    <p className="mx-auto mt-4 max-w-lg text-lg text-sky-50 lg:mx-0 lg:mt-6">
                                        Join my newsletter and get my latest articles, resources, and
                                        updates delivered straight to your inbox.
                                    </p>
                                </div>
                                <form
                                    onSubmit={formik.handleSubmit}
                                    className="relative mt-10 w-full max-w-lg lg:mt-0"
                                >
                                    <input
                                        type="email"
                                        className="h-14 w-full rounded-full border-0 bg-white/10 py-3.5 pl-5 pr-32 text-sm leading-5 text-sky-50 placeholder-sky-100/90 outline-none ring-1 ring-white/25 backdrop-blur  duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/30 sm:pl-6"
                                        required
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <p className="text-red-400 mt-1"> {formik.touched.email && formik.errors.email} </p>
                                    <button
                                        type="submit"
                                        className="absolute right-1.5 top-1.5 inline-flex h-11 items-center rounded-full bg-sky-900 px-5 py-3 text-sm font-semibold text-sky-50 outline-none transition duration-200 ease-in-out hover:bg-sky-800 focus:outline-none sm:px-7 sm:text-md disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
                                        disabled={formik.isSubmitting}
                                    >
                                        {
                                            formik.isSubmitting ? "Subscribing..." : "Subscribe"
                                        }
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <footer className="overflow-hidden bg-slate-900 pb-8 pt-20 sm:pb-12 sm:pt-24 lg:pt-32">
                <Container>
                    <div className="mx-auto grid max-w-xl items-center gap-5 lg:mx-0 lg:max-w-none lg:grid-cols-12 lg:gap-12 xl:gap-20">
                        <div className="lg:col-span-7">
                            <h3 className="text-center font-display text-4xl font-semibold text-white sm:text-5xl lg:max-w-xl lg:text-left">
                                Lets make something great together
                            </h3>
                            <div className="hidden lg:block">
                                <Button
                                    href="https://www.upwork.com/freelancers/~013a136c7081592898"
                                    target="_blank"
                                    variant="primaryOnDark"
                                    className="mt-12"
                                >
                                    Book a call
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center lg:col-span-5 lg:items-start">
                            <p className="text-center text-lg text-slate-50 lg:max-w-sm lg:text-left">
                                I am always looking for new opportunities to learn and grow, and I am
                                excited to work with you on your next project.
                            </p>
                            <Link
                                href="https://www.upwork.com/freelancers/~013a136c7081592898"
                                className="mt-10 inline-flex items-center justify-center gap-x-2.5 rounded-full bg-white px-7 py-3 text-md font-semibold leading-none text-slate-700 duration-200 ease-in-out hover:bg-sky-50 lg:hidden"
                            >
                                Book a call
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Link>
                            <div className="mt-16 grid w-full max-w-sm grid-cols-2 gap-3.5 sm:max-w-none sm:grid-cols-3 lg:mt-8 lg:gap-2.5 xl:gap-3.5">
                                {socialLinks.map((socialLink) => (
                                    <SocialLink
                                        key={`footer-social-link-${socialLink.label}`}
                                        icon={socialLink.icon}
                                        label={socialLink.label}
                                        href={socialLink.href}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <hr className="mb-6 mt-12 h-px w-full border-slate-600/90 sm:mb-10 sm:mt-16" />
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <div className="flex items-center gap-6">
                            {links.map((link, index) => (
                                <Link
                                    key={`footer-link-${index}`}
                                    href={link.href}
                                    className="text-base font-medium text-slate-100 duration-200 ease-in-out hover:text-white"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <p className="mt-8 text-base text-slate-400/90 md:mt-0">
                            © 2024 <a
                                href="https://github.com/bilalmohib"
                                className="text-slate-100 hover:text-white"
                                target='_blank'
                            >Muhammad Bilal</a>. All rights reserved.
                        </p>
                    </div>
                </Container>
            </footer>
        </section>
    )
}
export default Footer