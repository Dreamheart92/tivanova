import AuthHeader from "@/app/(auth)/components/auth-header";
import AuthFooter from "@/app/(auth)/components/auth-footer";
import {PATHS} from "@/lib/constants/paths";
import SignupForm from "@/app/(auth)/components/forms/signup-form";

const pageSettings = {
    header: {
        title: 'Sign up',
        caption: 'Join us today and unlock exclusive deals, personalized recommendations, and a seamless shopping experience. Sign up now and be part of something exciting!'
    },
    footer: {
        caption: 'Already have an account?',
        href: PATHS.LOGIN,
        linkCaption: 'Sign in',
    },
    form: {
        email: {
            name: 'email',
            placeholder: 'john.doe@example.com',
            label: 'Email',
        },
        firstName: {
            name: 'firstName',
            placeholder: 'John',
            label: 'First name',
        },
        lastName: {
            name: 'lastName',
            placeholder: 'Doe',
            label: 'Last name',
        },
        password: {
            name: 'password',
            label: 'Password',
        },
        phone: {
            name: 'phone',
            label: 'Phone',
            placeholder: '+359xxxxxxxxx'
        },
        confirmPassword: {
            name: 'confirmPassword',
            label: 'Confirm password',
        },
        buttonCaption: 'Sign up',
    }
}

export default function SignUp() {
    return (
        <div>
            <AuthHeader
                title={pageSettings.header.title}
                caption={pageSettings.header.caption}
            />

            <SignupForm settings={pageSettings.form}/>

            <AuthFooter
                caption={pageSettings.footer.caption}
                href={pageSettings.footer.href}
                linkCaption={pageSettings.footer.linkCaption}
            />
        </div>
    )
}