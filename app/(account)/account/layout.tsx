import Banner from "@/app/(account)/account/[[...slug]]/components/banner";
import {getSession} from "@/lib/utils/server/session.utils";
import {notFound} from "next/navigation";
import ContentContainer from "@/components/ui/content-container";
import Navigation from "@/app/(account)/account/[[...slug]]/components/navigation";

export default async function Layout({children}: { children: React.ReactNode }) {
    const session = await getSession();

    if (!session) {
        return notFound();
    }

    return (
        <div className='bg-stone-100 h-full'>
            <ContentContainer>
                <Banner firstName={session.firstName} lastName={session.lastName}/>
                <div
                    className='flex flex-wrap md:flex-nowrap items-start lg:py-4 gap-6 w-full max-w-full md:max-w-screen-xl mx-auto'>
                    <Navigation/>
                    {children}
                </div>
            </ContentContainer>
        </div>
    )
}