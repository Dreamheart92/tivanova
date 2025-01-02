import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

type InputWrapperProps = {
    name: string;
    label: string;
    placeholder?: string;
}

export default function InputWrapper({name, label, placeholder}: InputWrapperProps) {
    return (
        <div>
            <Label htmlFor={name}>
                {label}
            </Label>
            <Input
                type="email"
                name={name}
                placeholder={placeholder}
                required
            />
        </div>
    )
}