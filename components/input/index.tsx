import Box from "@/components/box";

import styles from './index.module.css';
import ErrorMessage from "@/components/error-message";

type InputProps = {
    label: string,
    name: string,
    type?: string,
    required?: boolean,
    error?: string[],
    defaultValue?: string | number,
    onChange?: () => void;
}

export default function Input(
    {
        label,
        name,
        type = 'text',
        required,
        error,
        defaultValue,
        onChange,
    }: InputProps) {
    const maxLength = type === 'tel' ? 13 : 30;

    return (
        <Box
            column
            style={{
                width: '100%',
            }}>
            <Box style={{
                position: 'relative',
                width: '100%',
            }}>
                <input
                    className={styles.input}
                    name={name}
                    type={type}
                    placeholder=''
                    defaultValue={defaultValue}
                    maxLength={maxLength}
                    required={required}
                    onChange={onChange}
                />
                <label
                    className={styles.label}
                    htmlFor={name}
                >
                    {`${label} ${required ? '*' : ''}`}
                </label>
            </Box>

            <ErrorMessage>
                {error && error[0]}
            </ErrorMessage>
        </Box>
    )
}