import React from "react";
import {useFormStatus} from "react-dom";
import Button from "@/components/button";

export default function SubmitButton({disabled, children}: { disabled?: boolean, children: React.ReactNode }) {
    const {pending} = useFormStatus();

    return (
        <Button
            type='submit'
            disabled={pending || disabled}
        >
            {pending ? 'Submitting...' : children}
        </Button>
    )
}