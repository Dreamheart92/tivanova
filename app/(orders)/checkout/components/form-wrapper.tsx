export default function FormWrapper({children}: { children: React.ReactNode }) {
    return (
        <form className='flex flex-col gap-2'>
            {children}
        </form>
    )
}