type ContentContainerProps = {
    children: React.ReactNode;
}

export default function ContentContainer({children}: ContentContainerProps) {
    return (
        <div className="max-w-[1700px] w-full mx-auto relative">
            {children}
        </div>
    )
}