import {PATHS} from "@/lib/constants/paths";
import AuthHeader from "@/app/(auth)/components/auth-header";
import AuthFooter from "@/app/(auth)/components/auth-footer";
import LoginForm from "@/app/(auth)/components/forms/login-form";

const pageSettings = {
    header: {
        title: 'Sign in',
        caption: 'Welcome back! Log in for exclusive offers and a personalized shopping experience.',
    },
    footer: {
        caption: 'Don\'t have an account?',
        linkCaption: 'Sign up',
        href: PATHS.SIGNUP,
    },
    form: {
        email: {
            name: 'email',
            placeholder: 'john.doe@example.com',
            label: 'Email',
        },
        password: {
            name: 'password',
            label: 'Password',
        },
        buttonCaption: 'Sign in',
        buttonLoading: 'Signing in...'
    },
}

export default function Login() {
    return (
        <div>
            <AuthHeader
                title={pageSettings.header.title}
                caption={pageSettings.header.caption}
            />
            <LoginForm settings={pageSettings.form}/>
            <AuthFooter
                caption={pageSettings.footer.caption}
                href={pageSettings.footer.href}
                linkCaption={pageSettings.footer.linkCaption}
            />
        </div>
    )
}
