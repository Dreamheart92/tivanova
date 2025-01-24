type AuthHeaderProps = {
    title: string;
    caption: string;
}

export default function AuthHeader({title,caption}: AuthHeaderProps) {
    return (
        <div className='text-center pb-6'>
            <h2>{title}</h2>
            <p>{caption}</p>
        </div>
    )
}