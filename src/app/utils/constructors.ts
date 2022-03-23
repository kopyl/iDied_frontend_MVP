
export const makeUrl = (
    endpoint: string,
    port: number,
    protocol: string = "http",
    base: string = window.location.host
) => {
    const strProtocol = `${protocol}:`
    return `${strProtocol}//` + `${base}:` + `${port}/` + `${endpoint}`
}
