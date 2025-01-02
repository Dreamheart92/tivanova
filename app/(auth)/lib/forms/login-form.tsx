import FormWrapper from "@/app/(auth)/components/form-wrapper";
import InputWrapper from "@/app/(auth)/components/input-wrapper";
import {Button} from "@/components/ui/button";

type LoginFormProps = {
    settings: {
        email: {
            name: string,
            label: string,
            placeholder: string,
        },
        password: {
            name: string,
            label: string,
        },
        buttonCaption: string;
    }
}

export default function LoginForm({settings}: LoginFormProps) {
    return (
        <form>
            <FormWrapper>
                <InputWrapper
                    name={settings.email.name}
                    label={settings.email.label}
                    placeholder={settings.email.placeholder}
                />

                <InputWrapper
                    name={settings.password.name}
                    label={settings.password.label}
                />

                <Button>{settings.buttonCaption}</Button>
            </FormWrapper>
        </form>
    )
}