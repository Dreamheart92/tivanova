import ContentBox from "@/components/content-box";
import Box from "@/components/box";
import ChangePasswordForm from "@/app/(pages)/(account)/forms/change-password-form";

export default function ChangePassword() {
    return (
        <ContentBox>
            <Box justify='center' align='center' style={{width: '100%', paddingTop: '15%',}}>
                <ChangePasswordForm/>
            </Box>
        </ContentBox>
    )
}