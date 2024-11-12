import LoginForm from "@/app/(auth)/forms/login-form";
import Box from "@/components/box";
import Link from "next/link";

export default function Login() {
    return (
        <>
            <LoginForm/>
            <Box
                justify='center'
                gap='0.25em'
                style={{
                    width: '100%',
                    marginTop: '0.5em',
                }}
            >
                <p>Don&apos;t have an account?</p>
                <span>
                    <Link
                        style={{
                            textDecoration: 'underline',
                        }}
                        href='/signup'>
                        Sign up
                    </Link>
                </span>
            </Box>
        </>
    )
}