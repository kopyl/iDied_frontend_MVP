
export const makeUrl = (
    endpoint: string,
    port: number,
    protocol: string = "http",
    base: string = window.location.host
) => {
    const strProtocol = `${protocol}:`

    if (window.location.href.includes("https")) {  // for development
        return `https://` + `${base}/` + `api/` + `${endpoint}`
    }

    return `${strProtocol}//` + `${base}:` + `${port}/` + `${endpoint}`
}
