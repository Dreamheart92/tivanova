import ContentBox from "@/components/content-box";
import Box from "@/components/box";
import EditProfileForm from "@/app/(pages)/(account)/forms/edit-profile-form";
import {getSession} from "@/lib/session";

export default async function EditProfile() {
    const session = await getSession();

    if (typeof session?.user !== "undefined") {
        return (
            <ContentBox>
                <Box justify='center' align='center' style={{width: '100%', paddingTop: '12%'}}>
                    <EditProfileForm userData={session.user}/>
                </Box>
            </ContentBox>
        )
    }
}