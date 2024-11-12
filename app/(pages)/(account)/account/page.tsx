import Box from "@/components/box";
import {getSession, getWishlistSession} from "@/lib/session";
import Image from "next/image";
import ContentBox from "@/components/content-box";
import {fetchWishlistProducts} from "@/lib/services/wishlist-service";
import WishlistCard from "@/components/wishlist-card";
import Link from "next/link";
import {UserData} from "@/lib/definitions";

const Wrapper = ({title, children}: { title: string, children: React.ReactNode }) => {
    return (
        <Box column style={{width: '100%'}}>
            <h4 style={{
                borderBottom: '1px solid #bdc3c7',
                paddingBottom: '1em',
                marginBottom: '1em',
                width: '100%',
            }}
            >
                {title}
            </h4>
            {children}
        </Box>
    )
}

const Orders = ({orders}: { orders: [] }) => {
    return (
        <Wrapper title='My orders'>
            {orders.length <= 0
                && (
                    <p>You still do not have any purchases</p>
                )}
        </Wrapper>
    )
}

const AccountInfo = async ({accountInfo}: { accountInfo: UserData }) => {
    return (
        <Wrapper title='Account info'>
            <Box style={{width: '100%'}} column gap='0.5em'>
                <p>{accountInfo.firstName} {accountInfo.lastName}</p>
                <p>{accountInfo.email}</p>
                <p>{accountInfo.phone}</p>
                {/*<Button>Edit profile</Button>*/}
                {/*<Button>Change password</Button>*/}

                <Link style={{textDecoration: 'underline'}} href='/account/edit-profile'>Edit profile</Link>
                <Link style={{textDecoration: 'underline'}} href='/account/change-password'>Change password</Link>
            </Box>
        </Wrapper>
    )
}

const Wishlist = async () => {
    const wishlist = await getWishlistSession();

    const wishlistProducts = await fetchWishlistProducts(wishlist);

    return (
        <Box column style={{width: '100%'}}>
            <Box
                align='center'
                justify='space-between'
                style={{
                    width: '100%', borderBottom: '1px solid #bdc3c7',
                    paddingBottom: '1em',
                    marginBottom: '1em',
                }}>
                <h4>My wishlist </h4>

                {wishlistProducts.length > 4
                    && <Link style={{textDecoration: 'underline'}} href='/wishlist'>View wishlist</Link>
                }
            </Box>
            <Box column gap='1em'>
                <Box gap='1em'>
                    {wishlistProducts.length > 0
                        && (
                            wishlistProducts.slice(0, 4).map((product) => (
                                <WishlistCard key={product.id} product={product}/>
                            ))
                        )}
                </Box>

                {wishlistProducts.length <= 0
                    && <p>Your wishlist is currently empty</p>}
            </Box>
        </Box>
    )
}

export default async function Account() {
    const session = await getSession();

    if (typeof session?.user !== 'undefined') {
        return (
            <Box column>
                <Box style={{position: 'relative', width: '100%'}}>
                    <Image
                        src='/account-image.jpg'
                        alt='Women fashion'
                        quality={100}
                        width={1920}
                        height={500}
                        style={{
                            width: '100vw',
                            height: '25em',
                            objectFit: 'cover',
                            objectPosition: '50% 30%',
                            filter: 'brightness(60%)'
                        }}/>

                    <Box style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                    }}>
                        <h2 style={{
                            color: 'white',
                            textTransform: 'uppercase'
                        }}>Welcome {session?.user.firstName} {session?.user.lastName} </h2>
                    </Box>
                </Box>
                <ContentBox>
                    <Box column gap='4em' style={{width: '100%'}}>
                        <Box style={{width: '100%'}} gap='3em'>
                            <Box flex='1 1 70%'>
                                <Orders orders={[]}/>
                            </Box>
                            <Box flexGrow='1'>
                                <AccountInfo accountInfo={session?.user}/>
                            </Box>
                        </Box>

                        <Box style={{width: '100%'}}>
                            <Wishlist/>
                        </Box>
                    </Box>
                </ContentBox>
            </Box>
        )
    }
}
