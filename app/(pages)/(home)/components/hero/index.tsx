import Box from "@/components/box";
import Image from "next/image";

export default function Hero() {
    return (
        <Box
            wrap
            style={{
                position: "relative",
                width: '100%',
            }}>
            <Box style={{
                width: '100%',
                justifyContent: 'center',
            }}>

                <Box flex='1 1 50%'>
                    <Image src='/hero-left.jpg' alt='Banner' width={1700} height={500}
                           style={{
                               width: '100%',
                               maxHeight: '53em',
                               objectFit: 'cover',
                               objectPosition: 'center 40%',
                               pointerEvents: 'none',
                               filter: 'brightness(90%)',
                           }}/>
                </Box>

                <Box flex='1 1 50%'>
                    <Image src='/hero-right.jpg' alt='Banner' width={1700} height={500}
                           style={{
                               width: '100%',
                               maxHeight: '53em',
                               objectFit: 'cover',
                               pointerEvents: 'none',
                               filter: 'brightness(90%)',
                               objectPosition: 'center 40%',
                           }}/>
                </Box>

                <Box style={{
                    position: 'absolute',
                    zIndex: 1,
                    top: '50%',
                }}>
                    <h1 style={{
                        color: 'white',
                    }}>FALL/WINTER 2024</h1>
                </Box>
            </Box>
        </Box>
    )
}