import Navigation from "@/app/(account)/account/[[...slug]]/components/navigation";
import Banner from "@/app/(account)/account/[[...slug]]/components/banner";
import {getSession} from "@/lib/session";
import {notFound} from "next/navigation";
import ContentContainer from "@/components/ui/content-container";

//TODO: Add auth logic

export default async function Layout({children}: { children: React.ReactNode }) {
    const session = await getSession();

    if (!session) {
        return notFound();
    }

    return (
        <div className='bg-stone-100 h-full'>
            <ContentContainer>
                <Banner firstName={session.firstName} lastName={session.lastName}/>
                <div className='flex items-start py-4 gap-6 max-w-screen-xl mx-auto'>
                    <Navigation/>
                    {children}
                </div>
            </ContentContainer>
        </div>
    )
}