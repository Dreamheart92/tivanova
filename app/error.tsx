'use client';

import {Button} from "@/components/ui/button";

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({error, reset}: ErrorProps) {
    return (
        <div>
            <h2>Something went wrong</h2>
            <Button onClick={() => reset()}>Try again</Button>
        </div>
    )
}