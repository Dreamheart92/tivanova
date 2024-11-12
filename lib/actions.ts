'use server';

import {deleteUserAccessToken} from "@/lib/services/auth-service";
import {isRedirectError} from "next/dist/client/components/redirect";
import {redirect} from 'next/navigation';
import {deleteSession, getSession} from "@/lib/session";

export const logout = async () => {
    const userData = await getSession();

    if (typeof userData?.user !== 'undefined') {
        try {
            await deleteUserAccessToken(userData.user.token);
            await deleteSession();
            redirect('/');
        } catch (error) {
            if (isRedirectError(error)) {
                throw error;
            }
        }
    }
}