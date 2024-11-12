'use client';

import {LoginState} from "@/app/(auth)/lib/definitions";
import {useFormState} from "react-dom";
import {authenticate} from "@/app/(auth)/lib/actions";
import Box from "@/components/box";
import Input from "@/components/input";
import ErrorMessage from "@/components/error-message";
import SubmitButton from "@/components/submit-button";
import {useCart} from "@/lib/store/cart";
import {useWishlist} from "@/lib/store/wishlist";
import {fetchCart} from "@/lib/services/cart-service";
import {useRouter} from "next/navigation";
import {setSession} from "@/lib/session";

export default function LoginForm() {
    const router = useRouter();
    const {updateCart} = useCart();
    const {updateWishlist} = useWishlist();

    const initialState: LoginState = {success: null, message: null, errors: {}};
    const [state, formAction] = useFormState(handleLogin, initialState);

    async function handleLogin(state: LoginState | undefined, formData: FormData) {
        const authResult = await authenticate(state, formData);

        if (!authResult?.success) {
            return authResult;
        }

        const cart = await fetchCart(authResult.userData.cartId);

        updateCart({
            products: cart.lines.nodes,
            totalPrice: cart.cost.totalAmount.amount,
            quantity: cart.totalQuantity,
        })

        updateWishlist(authResult.userData.wishlist);

        await setSession(authResult.userData);

        router.replace('/');
    }

    return (
        <form action={formAction}>
            <ErrorMessage
                style={{
                    paddingBottom: '2em',
                    textAlign: 'center',
                }}
            >
                {state?.success === false && (
                    state?.errors?.invalid_credentials || state?.errors?.internal_error
                )}
            </ErrorMessage>

            <Box column gap='2em' style={{width: '100%'}}>
                <Input
                    name='email'
                    label='Email address'
                    type='email'
                    error={state?.success === false ? state?.errors?.email : []}
                />

                <Input
                    name='password'
                    label='Password'
                    type='password'
                    error={state?.success === false ? state?.errors?.password : []}
                />

                <SubmitButton>
                    Sign in
                </SubmitButton>
            </Box>
        </form>
    )
}