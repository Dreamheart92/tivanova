import Image from "next/image";

//TODO: Store this to shopify and add stores locations

const settings = {
    storeCaption: {
        heading: 'Your Style, Your Story',
        subHeading: 'Fashion That Defines You',
        content: 'At TIVANOVA, we believe that every piece you wear should tell a story. Our collection is designed to inspire confidence, creativity, and individuality.'
    },
    ourStory: {
        title: 'Our Story',
        content: [
            {
                title: 'From Humble Beginnings to Fashion Forward',
                content: 'What began as a small boutique in 2015 has blossomed into a global fashion brand. Inspired by a love for creativity and individuality, we set out to redefine the way people express themselves through style.'
            },
            {
                title: 'The Vision',
                content: 'At TIVANOVA, we believe fashion is more than clothing—it’s a form of self-expression. Our mission is to inspire confidence and empower individuality with every piece we create.'
            },
            {
                title: 'Our Journey',
                content: [
                    '2015: Launched our first collection of handcrafted, timeless basics.',
                    '2018: Introduced eco-friendly materials to support sustainability.',
                    '2021: Expanded globally, reaching customers in over 30 countries.',
                    '2023: Partnered with like-minded brands to promote ethical practices and innovative designs.',
                ]
            },
            {
                title: 'Looking Ahead',
                content: 'We’re just getting started. With a focus on sustainability, inclusivity, and innovation, we’re committed to shaping the future of fashion. Our promise is to continue delivering timeless designs that help you express your story.'
            }
        ]
    },
    ourAchievements: [
        {
            heading: '72K',
            subHeading: 'Products Offered',
            content: 'With an ever-expanding collection, we offer over 72,000 styles, ensuring variety and quality for every fashion enthusiast.'
        },
        {
            heading: '10K',
            subHeading: 'Happy Clients',
            content: 'We’ve built lasting relationships with over 10,000 satisfied customers who continue to trust us for their fashion needs.'
        },
        {
            heading: '5K',
            subHeading: 'Brand Partnerships',
            content: 'Through collaborations with over 5,000 brands, we bring exclusive designs and ethical fashion practices to our global community.'
        }
    ],
    ourStores: ['/our-stores-1.jpg', '/our-stores-2.jpg'],
    meetOurTeam: [
        {
            name: 'Alice Thompson',
            position: 'Founder & CEO',
            content: 'Alice’s passion for fashion and entrepreneurship led her to create a brand that celebrates individuality, quality, and sustainability.',
            image: '/ceo.jpg',
        },
        {
            name: 'David Rivera',
            position: 'Chief Marketing Officer',
            content: 'David is the driving force behind our brand\'s presence and growth, crafting strategies to engage and inspire customers worldwide.',
            image: '/ho.jpg',
        },
        {
            name: 'Sophia Lee',
            position: 'Customer Experience Manager',
            content: 'Sophia is dedicated to creating a seamless and delightful shopping experience, always putting our customers’ needs at the forefront.',
            image: '/cem.jpg',
        },
        {
            name: 'Ethan Carter',
            position: 'Head of Operations',
            content: 'Ethan ensures everything runs smoothly behind the scenes, from supply chain management to delivering your favorite styles on time.',
            image: '/cmo.jpg',
        }
    ]
}


export default function About() {
    return (
        <div className='max-w-[1200px] mx-auto py-12 flex flex-col gap-12'>
            <StoreCaption/>
            <OurStory/>
            <OurAchievements/>
            <OurStores/>
            <OurTeam/>
        </div>
    )
}

const StoreCaption = () => {
    return (
        <div className='text-center'>
            <h1 className='text-[2.2em]'>{settings.storeCaption.heading}</h1>
            <h2>{settings.storeCaption.subHeading}</h2>
            <p className='max-w-[45%] mx-auto pt-2'>{settings.storeCaption.content}</p>
            <div className='pt-8'>
                <AboutUsBanner/>
            </div>
        </div>
    )
}

const AboutUsBanner = () => {
    return (
        <Image
            src='/about-us.jpg'
            alt='About us banner'
            width={1400}
            height={500}
            className='max-h-[550px] object-cover object-top'
        />
    )
}

const OurStory = () => {
    return (
        <div>
            <h2 className='text-stone-900 font-bold'>{settings.ourStory.title}</h2>
            {settings.ourStory.content.map((section, index) => (
                <div key={index} className='py-2'>
                    <h4 className='font-semibold pb-2'>{section.title}</h4>

                    {Array.isArray(section.content) ? (
                        <BulletList listItems={section.content}/>
                    ) : <p>{section.content}</p>}

                </div>
            ))}
        </div>
    )
}

const BulletList = ({listItems}: { listItems: string[] }) => {
    return (
        <div>
            <ul>
                {listItems.map((item, index) => (
                    <li key={index} className='list-disc list-inside py-1'>{item}</li>
                ))}
            </ul>
        </div>
    )
}

const AchievementCard = ({achievement}: { achievement: { heading: string, subHeading: string, content: string } }) => {
    return (
        <div className='text-center'>
            <h1 className='text-[2.2em]'>{achievement.heading}</h1>
            <h3>{achievement.subHeading}</h3>
            <p className=''>{achievement.content}</p>
        </div>
    )
}

const OurAchievements = () => {
    return (
        <div className='flex gap-10 justify-between pt-12 border-t border-stone-200'>
            {settings.ourAchievements.map((achievement, index) => (
                <AchievementCard achievement={achievement} key={index}/>
            ))}
        </div>
    )
}

const StoreImage = ({image}: { image: string }) => {
    return (
        <Image src={image} alt='Physical store image' width={600} height={530} className='object-cover'/>
    )
}

const OurStores = () => {
    return (
        <div className='pt-4'>
            <h2 className='text-stone-900 font-bold pb-4'>Our Stores</h2>
            <div className='flex gap-4'>
                {settings.ourStores.map((storeImage: string, index) => (
                    <StoreImage image={storeImage} key={index}/>
                ))}
            </div>
        </div>
    )
}

const TeamMemberCard = ({details}: { details: { name: string, position: string, content: string, image: string } }) => {
    return (
        <div className='w-[200px]'>
            <Image
                src={details.image}
                alt={details.name}
                width={200}
                height={340}
                className='object-cover object-top max-h-[200px] rounded-full'/>
            <div className='text-center pt-4'>
                <h4 className='font-bold'>{details.name}</h4>
                <h5 className='text-stone-500'>{details.position}</h5>
                <p className='pt-1'>{details.content}</p>
            </div>
        </div>
    )
}

const OurTeam = () => {
    return (
        <div>
            <div className='text-center border-b border-stone-200 mb-12 pb-4'>
                <h1 className='text-[5em] font-bold'>
                    Meet Our Team
                </h1>
                <h2 className='font-bold'>The people behind the brand.</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-20'>
                {settings.meetOurTeam.map((teamMember, index) => (
                    <TeamMemberCard details={teamMember} key={index}/>
                ))}
            </div>
        </div>
    )
}
