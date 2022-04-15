
export const makeUrl = (
    endpoint: string,
    port: number,
    protocol: string = "http",
    base: string = window.location.host
) => {
    const strProtocol = `${protocol}:`


    if (window.location.href.includes("https")) {  // for development
        // return `https://` + `${base}/` + `api/` + `${endpoint}`
        return `https://` + `idied.org/` + `api/` + `${endpoint}`
    }

    // return `http://` + `localhost:5001/` + `${endpoint}`
    return `https://` + `idied.org/` + `api/` + `${endpoint}`

    // return `${strProtocol}//` + `${base}:` + `${port}/` + `${endpoint}`
}
