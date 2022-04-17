interface urlArgs {
    endpoint: string
    port: number
    protocol?: string
    base?: string
    retriedAllowed?: boolean
    errorNotification?: boolean
}

export const makeUrl = (
    a = {
        endpoint: "",
        port: 80,
        protocol: "http",
        base: "",
    }
) => {
    const host = window.location.host
    const strProtocol = `${a.protocol}:`

    if (window.location.href.includes("https")) {
        // for development
        // return `https://` + `${base}/` + `api/` + `${endpoint}`
        return `https://` + `idied.org/` + `api/` + `${a.endpoint}`
    }

    return `http://` + `localhost:5001/` + `${a.endpoint}`
    // return `https://` + `idied.org/` + `api/` + `${endpoint}`

    // return `${strProtocol}//` + `${base}:` + `${port}/` + `${endpoint}`
}

export const makeUrlObj = (arg: urlArgs): requestURL => {
    const url = makeUrl({
        endpoint: arg.endpoint,
        port: arg.port,
        protocol: arg.protocol ?? "",
        base: arg.base ?? "",
    })
    return {
        url: url,
        retriedAllowed: arg.retriedAllowed ?? true,
        errorNotification: arg.errorNotification ?? true,
    }
}
