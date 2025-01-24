import {clsx} from "clsx";

type ErrorMessageProps = {
    error?: string;
    align?: 'left' | 'center' | 'right';
}

export default function ErrorMessage({error, align = 'center'}: ErrorMessageProps) {
    if (error) {
        return (
            <div className={clsx('pt-1', {
                'text-left': align === 'left',
                'text-center': align === 'center',
                'text-right': align === 'right',
            })}>
                <span className='text-destructive'>{error}</span>
            </div>
        )
    }
}