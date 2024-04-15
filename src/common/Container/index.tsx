import clsx from 'clsx'

interface ContainerProps {
    className?: string;
    [key: string]: any;
}

export function Container({ className, ...props }: ContainerProps) {
    return (
        <div
            className={clsx(
                'mx-auto max-w-screen-xl px-5 sm:px-6 lg:px-8',
                className
            )}
            {...props}
        />
    )
}
