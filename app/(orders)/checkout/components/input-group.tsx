type InputGroupsProps = {
    firstInput: React.ReactNode;
    secondInput: React.ReactNode;
}

export default function InputGroup({firstInput, secondInput}: InputGroupsProps) {
    return (
        <div className='flex gap-4'>
            <div className='basis-1/2'>
                {firstInput}
            </div>
            <div className='flex-1'>
                {secondInput}
            </div>
        </div>
    )
}