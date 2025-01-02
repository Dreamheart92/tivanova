import FormWrapper from "@/app/(auth)/components/form-wrapper";
import InputWrapper from "@/app/(auth)/components/input-wrapper";
import {InputProp} from "@/app/(auth)/lib/definitions";
import {Button} from "@/components/ui/button";

type SignupFormProps = {
    settings: {
        email: InputProp;
        firstName: InputProp;
        lastName: InputProp;
        password: InputProp;
        confirmPassword: InputProp;
        buttonCaption: string;
    }
}

export default function SignupForm({settings}: SignupFormProps) {
    return (
        <form>
            <FormWrapper>
                <InputWrapper
                    name={settings.email.name}
                    label={settings.email.label}
                    placeholder={settings.email.placeholder}
                />

                <InputWrapper
                    name={settings.firstName.name}
                    label={settings.firstName.label}
                    placeholder={settings.firstName.placeholder}
                />

                <InputWrapper
                    name={settings.lastName.name}
                    label={settings.lastName.label}
                    placeholder={settings.lastName.placeholder}
                />

                <InputWrapper
                    name={settings.password.name}
                    label={settings.password.label}
                />

                <InputWrapper
                    name={settings.confirmPassword.name}
                    label={settings.confirmPassword.label}
                />

                <Button>{settings.buttonCaption}</Button>
            </FormWrapper>
        </form>
    )
}