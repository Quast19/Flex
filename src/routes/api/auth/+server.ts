import { redirect } from "@sveltejs/kit";

export function GET() {
    throw redirect(302, '/');//redirects to base url instead of /api/auth, which is cool, 
}