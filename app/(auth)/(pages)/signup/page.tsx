import SignupForm from "@/app/(auth)/forms/signup-form";
import Box from "@/components/box";
import Link from "next/link";

export default function Signup() {
    return (
        <>
            <SignupForm/>
            <Box
                justify='center'
                gap='0.25em'
                style={{
                    width: '100%',
                    marginTop: '0.5em',
                }}
            >
                <p>Already have an account?</p>
                <span>
                    <Link
                        style={{
                            textDecoration: 'underline',
                        }}
                        href='/login'>
                        Sign in
                    </Link>
                </span>
            </Box>
        </>
    )
}