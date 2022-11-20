import { environment } from '@environment'

interface urlArgs {
    endpoint?: string
    port?: number
    protocol?: string
    base?: string
    retriedAllowed?: boolean
    errorNotification?: boolean
    customApiUrl?: string
    skipHttpErrors?: boolean
}

export const makeUrl = (
    a = {
        endpoint: '',
        port: 80,
        protocol: 'http',
        base: '',
    }
) => {
    return `${environment.apiUrl}${a.endpoint}`
}

export const makeUrlObj = (arg: urlArgs): requestURL => {
    const url = makeUrl({
        endpoint: arg.endpoint ?? '',
        port: arg.port ?? 80,
        protocol: arg.protocol ?? '',
        base: arg.base ?? '',
    })
    return {
        url: arg.customApiUrl ?? url,
        retriedAllowed: arg.retriedAllowed ?? true,
        errorNotification: arg.errorNotification ?? true,
        skipHttpErrors: arg.skipHttpErrors ?? false,
    }
}
