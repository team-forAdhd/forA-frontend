import { CDN_CLOUDFRONT_URL } from '@env';

export function imagePathMerge(uri: string) {
    if (!uri) return;
    const baseURL = CDN_CLOUDFRONT_URL;
    if (!uri.startsWith('/')) return baseURL + '/' + uri;
    return baseURL + uri;
}
