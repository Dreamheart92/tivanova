import Box from "@/components/box";

export default function SizeBox({size, onSelect, selected}: {
    size: string,
    onSelect: (value: string) => void,
    selected: boolean,
}) {
    return (
        <Box
            style={{
                width: '4em',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#EEE',
                cursor: 'pointer',
                border: `1px solid ${selected ? 'black' : 'transparent'}`,
            }}
            props={{
                onClick: () => onSelect(size)
            }}
        >
            <span>
                {size.toUpperCase()}
            </span>
        </Box>
    )
}