import Image from "next/image";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <div className='flex'>
            <div className='basis-1/2 flex justify-center items-center flex-col'>
                <div className='w-[70%]'>
                    {children}
                </div>
            </div>

            <div>
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