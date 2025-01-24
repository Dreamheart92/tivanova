'use client';

import {Button} from "@/components/ui/button";
import {useRouter, useSearchParams} from "next/navigation";
import {PATHS} from "@/lib/constants/paths";

export default function ClearFiltersButton({label}: { label: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const hasQuery = searchParams.size > 0;

    return (
        <div className=''>
            <Button
                disabled={!hasQuery}
                className='w-full'
                onClick={() => router.push(PATHS.SHOP)}
            >
                {label}
            </Button>
        </div>
    )
}