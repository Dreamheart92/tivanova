import ContentContainer from "@/components/ui/content-container";
import {Button} from "@/components/ui/button";

type HeroProps = {
    title: string;
    caption: string;
}

export default function Hero({title, caption}: HeroProps) {
    return (
        <ContentContainer>
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
                    <h2 className='text-white'>{caption}</h2>
                    <h1 className='text-white'>{title}</h1>
                    <Button size='lg' variant='secondary' className='mt-4 uppercase'>Explore</Button>
                </div>
            </div>
        </ContentContainer>
    )
}