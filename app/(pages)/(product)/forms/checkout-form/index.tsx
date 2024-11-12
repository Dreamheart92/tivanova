'use client';

import Box from "@/components/box";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";

export default function CheckoutForm() {
    return (
        <form
            style={{
                maxWidth: '900px',
                width: '100%',
            }}
        >
            <Box column gap='2em' style={{width: '100%'}}>
                <Box gap='1em' style={{width: '100%'}}>
                    <Input
                        name='firstName'
                        label='First Name'
                    />

                    <Input
                        name='lastName'
                        label='Last Name'
                    />
                </Box>

                <Input
                    name='phone'
                    label='Phone'
                />

                <Input
                    label='Address'
                    name='address'
                />

                <Input
                    label='Apt/Suite/Floor (Optional)'
                    name='apartament'
                />

                <Box gap='1em' style={{width: '100%'}}>
                    <Input
                        name='city'
                        label='City'
                    />

                    <Input
                        name='postalCode'
                        label='Postal code'
                    />
                </Box>

                <SubmitButton>
                    Purchase
                </SubmitButton>
            </Box>
        </form>
    )
}