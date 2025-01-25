'use client';

import InputWrapper from "@/app/(auth)/components/input-wrapper";
import FormWrapper from "@/app/(orders)/checkout/components/form-wrapper";
import InputGroup from "@/app/(orders)/checkout/components/input-group";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import ErrorMessage from "@/app/(auth)/components/error-message";
import {Label} from "@/components/ui/label";
import {ExtendedShippingAddressSchemaErrorType} from "@/lib/actions/cart.actions";
import {AvailableShippingCountryType} from "@/lib/definitions/shop.definitions";
import {ShippingAddressSchemaType} from "@/lib/validations/checkoutSchema";
import Link from "next/link";
import {PATHS} from "@/lib/constants/paths";

const settings = {
    countryCode: {
        name: 'countryCode',
        label: 'Country',
        placeholder: 'Country/Region',
    },
    firstName: {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'First Name',
    },
    lastName: {
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Last Name',
    },
    address1: {
        name: 'address1',
        label: 'Address',
        placeholder: 'Address',
    },
    address2: {
        name: 'address2',
        label: 'Apartment',
        placeholder: 'Apartment, suite, etc, (optional)'
    },
    zip: {
        name: 'zip',
        label: 'Zip code',
        placeholder: 'Zip code',
    },
    city: {
        name: 'city',
        label: 'City',
        placeholder: 'City',
    },
    phone: {
        name: 'phone',
        label: 'Phone',
        placeholder: 'Phone',
    }
}

type DeliveryInformationFormProps = {
    availableShippingCountries: AvailableShippingCountryType[];
    submitButton: React.ReactNode;
    state: {
        data: ShippingAddressSchemaType,
        errors: ExtendedShippingAddressSchemaErrorType,
        success: boolean;
    }
    isLoggedIn?: boolean;
}

export default function DeliveryInformationForm(
    {
        availableShippingCountries,
        state,
        submitButton,
        isLoggedIn = true
    }: DeliveryInformationFormProps) {

    return (
        <FormWrapper>
            {!isLoggedIn && (
                <div className=''>
                    <div className='flex justify-between pb-4 items-center'>
                        <h2>Contact</h2>
                        <div className=''>
                            <Link className='underline w-fit h-fit p-0 m-0' href={PATHS.LOGIN}>Login</Link>
                        </div>
                    </div>

                    <div className='pb-4'>
                        <InputWrapper
                            name='email'
                            label='Email'
                            placeholder='Email'
                            defaultValue={state.data.email}
                            errors={state?.errors?.fieldErrors?.email}
                        />
                    </div>
                </div>
            )}

            <h2 className='pb-4'>Delivery Address</h2>

            {state?.errors?.internalError && (
                <ErrorMessage error={state.errors.internalError[0]} align={'left'}/>
            )}

            <InputGroup
                firstInput={<InputWrapper
                    name={settings.firstName.name}
                    label={settings.firstName.label}
                    placeholder={settings.firstName.placeholder}
                    errors={state?.errors?.fieldErrors?.firstName}
                    defaultValue={state?.data?.firstName}
                />}
                secondInput={<InputWrapper
                    name={settings.lastName.name}
                    label={settings.lastName.label}
                    placeholder={settings.lastName.placeholder}
                    errors={state?.errors?.fieldErrors?.lastName}
                    defaultValue={state?.data?.lastName}
                />}
            />

            <div>
                <Label htmlFor={settings.countryCode.name}>{settings.countryCode.label}</Label>
                <Select defaultValue={state?.data?.countryCode} name={settings.countryCode.name}>
                    <SelectTrigger>
                        <SelectValue placeholder='Select a country'/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {availableShippingCountries.map((country) => (
                                <SelectItem
                                    key={country.isoCode}
                                    value={country.isoCode}
                                    className='cursor-pointer'
                                >
                                    {country.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {state?.errors?.fieldErrors?.countryCode && (
                    <ErrorMessage error={state.errors.fieldErrors.countryCode[0]} align={'left'}/>
                )}
            </div>

            <InputWrapper
                name={settings.phone.name}
                label={settings.phone.label}
                placeholder={settings.phone.placeholder}
                errors={state?.errors?.fieldErrors?.phone}
                defaultValue={state?.data?.phone}
            />

            <InputWrapper
                name={settings.address1.name}
                label={settings.address1.label}
                placeholder={settings.address1.placeholder}
                errors={state?.errors?.fieldErrors?.address1}
                defaultValue={state?.data?.address1}
            />
            <InputWrapper
                name={settings.address2.name}
                label={settings.address2.label}
                placeholder={settings.address2.placeholder}
                errors={state?.errors?.fieldErrors?.address2}
                defaultValue={state?.data?.address2}
            />

            <InputGroup
                firstInput={<InputWrapper
                    name={settings.zip.name}
                    label={settings.zip.label}
                    placeholder={settings.zip.placeholder}
                    errors={state?.errors?.fieldErrors?.zip}
                    defaultValue={state?.data?.zip}
                />}
                secondInput={<InputWrapper
                    name={settings.city.name}
                    label={settings.city.label}
                    placeholder={settings.city.placeholder}
                    errors={state?.errors?.fieldErrors?.city}
                    defaultValue={state?.data?.city}
                />}
            />

            {submitButton}
        </FormWrapper>
    )
}
