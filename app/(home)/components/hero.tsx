import Image from "next/image";

export default function Hero() {
    return (
        <div className="relative">
            <Image
                src='/banner.png'
                alt='Banner'
                width={1920}
                height={850}
                quality={100}
                style={{
                    objectFit: 'cover',
                    height: '850px',
                    filter: 'brightness(90%)'
                }}
            />

            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <h1 className='text-white'>FALL/WINTER 2024</h1>
            </div>
        </div>
    )
}