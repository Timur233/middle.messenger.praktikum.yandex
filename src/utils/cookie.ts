type cookieOptions = {
    expires?: number | Date,
    domain?: string,
    path?: string,
    secure?: boolean,
    sameSite?: string,
    httpOnly?: boolean
}

export function getCookie(name: string): string | undefined {
    const cookies = document.cookie;
    const match = cookies.match(new RegExp(`(^| )${name}=([^;]+)`));

    if (match) {
        return decodeURIComponent(match[2]);
    }

    return undefined;
}

export function setCookie(name: string, value: string, options?: cookieOptions): void {
    let cookieString: string = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options?.expires) {
        if (typeof options.expires === 'number') {
            const date: Date = new Date();

            date.setTime(date.getTime() + options.expires * 1000);
            cookieString += `; expires=${date.toUTCString()}`;
        } else if (options.expires instanceof Date) {
            cookieString += `; expires=${options.expires.toUTCString()}`;
        }
    }

    if (options?.path) {
        cookieString += `; path=${options.path}`;
    }

    if (options?.domain) {
        cookieString += `; domain=${options.domain}`;
    }

    if (options?.secure) {
        cookieString += '; secure';
    }

    if (options?.sameSite) {
        cookieString += `; samesite=${options.sameSite}`;
    }

    if (options?.httpOnly) {
        cookieString += '; httponly';
    }

    document.cookie = cookieString;
}
