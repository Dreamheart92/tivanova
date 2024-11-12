export default function ErrorMessage({children, style}: { children: React.ReactNode, style?: object }) {
    return (
        <p style={{
            color: 'red',
            ...style,
        }}>{children}</p>
    )
}