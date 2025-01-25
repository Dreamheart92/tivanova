import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {getCountryIsoBasedOnIp} from "@/lib/utils/server/customer.server-utils";
import {SETTINGS} from "@/settings";
import {getSession} from "@/lib/utils/server/session.utils";
import {PATHS} from "@/lib/constants/paths";

const publicRoutes = [PATHS.LOGIN, PATHS.SIGNUP];
const protectedRoutes = [PATHS.ACCOUNT];

export async function middleware(req: NextRequest) {
    const response = NextResponse.next();
    const session = await getSession();

    const path = req.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);
    const isProtectedRoute = protectedRoutes.some((route) => route === path || path.startsWith(route));

    if (!req.cookies.get('countryISO')) {
        const customerIp = req.headers.get('x-forwarded-for') || '127.0.0.1';

        if (customerIp === '127.0.0.1' || customerIp === '::1') {
            response.cookies.set('countryISO', SETTINGS.DEFAULT_COUNTRY);

        } else {
            const countryISO = await getCountryIsoBasedOnIp(customerIp);
            response.cookies.set('countryISO', countryISO);
        }
    }

    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL(PATHS.LOGIN, req.nextUrl));
    }

    if (isPublicRoute && session) {
        return NextResponse.redirect(new URL(PATHS.ACCOUNT, req.nextUrl));
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}