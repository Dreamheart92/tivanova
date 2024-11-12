import React from "react";
import Box from "@/components/box";

import styles from './index.module.css';
import {HeartFilled, HeartOutlined} from "@ant-design/icons";

type ButtonProps = {
    onClick?: () => void;
    variant?: 'primary' | 'success' | 'underline' | 'wishlist' | 'transparent';
    style?: object;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    children?: React.ReactNode;
    selected?: boolean;
}

export default function Button(
    {
        onClick,
        variant = 'primary',
        style,
        type = 'button',
        disabled,
        children,
        selected,
    }: ButtonProps) {
    return (
        <Box
            style={{
                width: '100%',
                ...style,
            }}
        >
            <button
                className={`${styles.button} ${styles[variant]}`}
                onClick={onClick}
                type={type}
                disabled={disabled}
            >
                {variant === 'wishlist'
                    && (
                        selected ? <HeartFilled/> : <HeartOutlined/>
                    )
                }

                {variant !== 'wishlist'
                    && children}
            </button>
        </Box>
    )
}