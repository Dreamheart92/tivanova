import Image from "next/image";
import {normalizeName} from "@/lib/utils/utils";

type BannerProps = {
    firstName: string;
    lastName: string;
}

export default function Banner({firstName, lastName}: BannerProps) {
    return (
        <div className='relative'>
            <Image
                src='/account-banner.jpg'
                alt='Women walking'
                width={1920}
                height={500}
                className='max-h-[400px] object-cover object-[50%_30%] brightness-50'
            />

            <div className='absolute top-1/2 -translate-y-1/2 w-full text-center'>
                <h1 className='text-stone-200'>Welcome, {normalizeName(firstName)} {normalizeName(lastName)}</h1>
            </div>
        </div>
    )
}