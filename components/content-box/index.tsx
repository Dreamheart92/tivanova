import React from "react";
import Box from "@/components/box";

import styles from './index.module.css';

type ContentBoxProps = {
    title?: string;
    caption?: string;
    children: React.ReactNode;
    outerStyle?: string;
}

export default function ContentBox(
    {
        title,
        caption,
        children,
        outerStyle
    }: ContentBoxProps) {
    return (
        <div className={`${styles.box} ${outerStyle}`}>
            <Box
                column
                style={{
                    flexGrow: 1,
                    maxWidth: '1700px',
                    width: '100%',
                    overflow: 'hidden',
                    margin: '0 auto',
                }}>
                <Box
                    column
                    style={{
                        paddingBottom: '1em',
                    }}
                >
                    {title
                        && <h3 style={{
                            alignSelf: 'flex-start',
                        }}>{title}</h3>}

                    {caption
                        && <h4 style={{
                            fontWeight: 'normal'
                        }}>{caption}</h4>}
                </Box>
                {children}
            </Box>
        </div>
    );
}
