export default function DetailsField({label, children}: { label: string, children: React.ReactNode }) {
    return (
        <div>
            <p className='text-sm text-stone-500'>{label}</p>
            <p>{children}</p>
        </div>
    )
}