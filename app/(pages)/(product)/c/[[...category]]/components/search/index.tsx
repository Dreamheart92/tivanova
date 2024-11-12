'use client';

import {usePathname, useSearchParams} from "next/navigation";
import {useRouter} from 'next/navigation';
import {normalizeName} from "@/lib/utils/string-utils";

import styles from './index.module.css';
import {FilterValue} from "@/lib/definitions";
import {CheckOutlined} from "@ant-design/icons";

export default function Search({filter, attribute}: { filter: FilterValue, attribute: string }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const terms = searchParams.get(attribute)?.split('|');

    const selected = terms?.includes(filter.input);

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams);

        if (selected && terms) {
            const termIndex = terms.findIndex((term) => term === filter.input);

            if (termIndex > -1) {
                terms.splice(termIndex, 1);

                if (terms.length > 0) {
                    params.set(attribute, terms.join('|'));
                    router.replace(`${pathname}?${params.toString()}`);
                } else {
                    params.delete(attribute);
                    router.replace(`${pathname}?${params.toString()}`);
                }
                return;
            }
        }

        if (params.has(attribute)) {
            const term = `${params.get(attribute)}|${filter.input}`;
            params.set(attribute, term);
        } else {
            params.set(attribute, filter.input);
        }

        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <span
            className={styles.span}
            onClick={handleSearch}
        >
            {selected && <CheckOutlined/>}
            <p className={selected ? styles.selected : ''}>{normalizeName(filter.label)}</p>
        </span>
    )
}