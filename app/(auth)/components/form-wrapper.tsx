type FormWrapperProps = {
    children: React.ReactNode;
}

export default function FormWrapper({children}: FormWrapperProps) {
    return <div className='flex flex-col gap-4'>{children}</div>
}