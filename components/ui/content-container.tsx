type ContentContainerProps = {
    children: React.ReactNode;
}

export default function ContentContainer({children}: ContentContainerProps) {
    return (
        <div className="max-w-[1700px] mx-auto">
            {children}
        </div>
    )
}