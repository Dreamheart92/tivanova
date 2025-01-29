import Image from "next/image";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <div className='flex'>
            <div className='w-full md:basis-1/2 flex-shrink-0 flex justify-center items-center flex-col'>
                <div className='w-full p-4 md:w-[70%] text-sm md:text-base'>
                    {children}
                </div>
            </div>

            <div className='hidden md:block'>
                <Image
                    src='/auth.webp'
                    alt='Womens eating cherries'
                    width={1000}
                    height={700}
                    className='object-cover h-[93.6vh] brightness-75'
                />
            </div>
        </div>
    )
}