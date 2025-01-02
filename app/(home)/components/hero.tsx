type HeroProps = {
    title: string;
}

export default function Hero({title}: HeroProps) {
    return (
        <div className="relative">
            <picture>
                <source
                    media="(max-width: 768px)"
                    srcSet="/mobile-banner.jpg"
                />
                <img
                    src="/banner.png"
                    alt="Banner"
                    className='max-h-[70em] xl:max-h-[52em]'
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        filter: 'brightness(90%)',
                    }}
                />
            </picture>

            <div className='absolute top-1/2 -translate-y-1/2 w-full text-center'>
                <h1 className='text-white'>{title}</h1>
            </div>
        </div>
    )
}