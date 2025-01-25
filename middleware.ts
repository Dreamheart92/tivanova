import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {getCountryIsoBasedOnIp} from "@/lib/utils/server/customer.server-utils";
import {SETTINGS} from "@/settings";

export async function middleware(req: NextRequest) {
    const response = NextResponse.next();

    if (!req.cookies.get('countryISO')) {
        const customerIp = req.headers.get('x-forwarded-for') || '127.0.0.1';

        if (customerIp === '127.0.0.1' || customerIp === '::1') {
            response.cookies.set('countryISO', SETTINGS.DEFAULT_COUNTRY);

        } else {
            const countryISO = await getCountryIsoBasedOnIp(customerIp);
            response.cookies.set('countryISO', countryISO);
        }
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}