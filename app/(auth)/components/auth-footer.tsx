import Link from "next/link";

type AuthFooterProps = {
    caption: string;
    href: string;
    linkCaption: string;
}

export default function AuthFooter({caption, linkCaption, href}: AuthFooterProps) {
    return (
        <div className='text-center pt-4'>
            {caption}
            <Link className='underline pl-1' href={href}>{linkCaption}</Link>
        </div>
    )
}