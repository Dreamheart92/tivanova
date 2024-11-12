'use client';

import {useEffect, useRef, useState} from "react";
import Box from "@/components/box";
import Search from "@/app/(pages)/(product)/c/[[...category]]/components/search";
import {normalizeName} from "@/lib/utils/string-utils";
import {DownOutlined} from "@ant-design/icons";
import ContentBox from "@/components/content-box";
import {FilterValue} from "@/lib/definitions";

export default function Filter({filters, attribute}: {
    filters: FilterValue[],
    attribute: string,
}) {
    const [open, setOpen] = useState(false);
    const filtersWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (filtersWrapperRef.current) {
            if (open) {
                filtersWrapperRef.current.style.height = `${filtersWrapperRef.current.scrollHeight}px`
            } else {
                filtersWrapperRef.current.style.height = '0';
            }
        }
    }, [open]);

    return (
        <Box column>
            <Box
                column
                props={{
                    onMouseLeave: () => setOpen(false),
                }}
            >
                <Box
                    gap='0.5em'
                    style={{
                        cursor: 'pointer',
                    }}
                    props={{
                        onMouseEnter: () => setOpen(true),
                    }}
                >
                    <p>
                        {normalizeName(attribute)}
                    </p>

                    <DownOutlined
                        style={{
                            fontSize: '0.75em',
                            transform: `rotate(-${open ? '180' : '0'}deg)`,
                            transition: 'transform .3s ease-in-out',
                        }}/>
                </Box>
                <Box>
                    <div
                        ref={filtersWrapperRef}
                        style={{
                            width: '100vw',
                            flexWrap: 'wrap',
                            height: '0',
                            display: open ? 'flex' : 'none',
                            position: 'absolute',
                            left: 0,
                            zIndex: 100,
                            backgroundColor: 'white',
                            borderTop: '1px solid #EEE',
                        }}>
                        <Box
                            wrap
                            column
                            style={{
                                maxHeight: '10em',
                            }}
                        >
                            <ContentBox>
                                <Box
                                    wrap
                                    column
                                    gap='1em'
                                    style={{
                                        maxHeight: '8em',
                                        paddingBottom: '1em'
                                    }}
                                >
                                    {filters.map((filter, index) => {
                                        if (filter.count > 0) {
                                            return (
                                                <Box
                                                    flex='1 1 auto'
                                                    key={filter.id}
                                                    style={{
                                                        marginLeft: index > 2 ? '12em' : '',
                                                    }}
                                                >
                                                    <Search
                                                        filter={filter}
                                                        attribute={attribute}
                                                    />
                                                </Box>
                                            )
                                        }
                                    })}
                                </Box>
                            </ContentBox>
                        </Box>
                    </div>
                </Box>
            </Box>
        </Box>
    )
}