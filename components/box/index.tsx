import React from "react";

import styles from './index.module.css';

type BoxProps = {
    children: React.ReactNode,
    column?: boolean,
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly',
    align?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
    flexShrink?: string,
    flexGrow?: string,
    flexBasis?: string,
    flex?: string,
    gap?: string,
    wrap?: boolean,
    noScrollbar?: boolean,
    style?: object,
    props?: object,
}

export default function Box(
    {
        column = false,
        style,
        justify,
        align,
        flexShrink,
        flexGrow,
        flexBasis,
        flex,
        gap,
        wrap = false,
        children,
        noScrollbar,
        props,
    }: BoxProps) {
    return (
        <div
            style={{
                flexDirection: column ? 'column' : 'row',
                justifyContent: justify,
                alignItems: align,
                flexShrink,
                flexGrow,
                flexBasis,
                flex,
                gap,
                flexWrap: wrap ? 'wrap' : 'nowrap',
                ...style,
            }}
            {...props}
            className={`${styles.box} ${noScrollbar && 'no-scrollbar'}`}
        >
            {children}
        </div>
    )
}