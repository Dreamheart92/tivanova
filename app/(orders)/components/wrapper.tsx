export default function Wrapper({children}: { children: React.ReactNode }) {
    return (
        <div className='bg-white py-4 md:p-4 shadow-sm'>
            {children}
        </div>
    )
}