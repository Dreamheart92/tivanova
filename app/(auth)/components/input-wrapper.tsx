import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

type InputWrapperProps = {
    name: string;
    label: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email';
    required?: boolean;
    errors?: string[];
    defaultValue?: string;
}

export default function InputWrapper(
    {
        name,
        label,
        placeholder,
        type = 'text',
        defaultValue,
        errors,
        required = false,
    }: InputWrapperProps) {
    return (
        <div>
            <Label htmlFor={name}>
                {label}
            </Label>
            <Input
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                defaultValue={defaultValue}
            />
            {errors && (
                <div className='pt-1'>
                    <span className='text-destructive'>{errors[0]}</span>
                </div>
            )}
        </div>
    )
}