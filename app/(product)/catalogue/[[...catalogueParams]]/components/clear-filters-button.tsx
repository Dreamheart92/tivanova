'use client';

import {Button} from "@/components/ui/button";
import {useRouter, useSearchParams} from "next/navigation";

export default function ClearFiltersButton({label}: { label: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const hasQuery = searchParams.size > 0;

    return (
        <div className=''>
            <Button
                disabled={!hasQuery}
                className='w-full'
                onClick={() => router.push('/catalogue')}
            >
                {label}
            </Button>
        </div>
    )
}