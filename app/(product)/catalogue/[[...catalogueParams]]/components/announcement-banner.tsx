export default function AnnouncementBanner({content}: { content: string }) {
    return (
        <div className='text-center bg-red-500 py-3 mb-12 uppercase text-white'>
            <h5 className='animate-bounce font-bold'>{content}</h5>
        </div>
    );
}
