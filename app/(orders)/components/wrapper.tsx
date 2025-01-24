export default function Wrapper({children}: { children: React.ReactNode }) {
    return (
        <div className='bg-white p-4 shadow-sm'>
            {children}
        </div>
    )
}