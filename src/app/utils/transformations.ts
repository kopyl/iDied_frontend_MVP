
const snakeToCamelCaseStr = (str: string): string => {
    return str.split("_")
    .map(
        (word: string, index: number) => {
            if (index === 0) return word
            return word[0].toUpperCase() + word.slice(1)
        }
    )
    .join("")
}

const snakeToCamelCaseObj = (object: Object): Object => {
    const entries = Object.entries(object)
    entries.map(e => e[0] = snakeToCamelCaseStr(e[0]))
    return Object.fromEntries(entries)
}

export const snakeToCamelCaseArray = (array: Array<Object>): Array<Object> => {
    return array
    .map(e => snakeToCamelCaseObj(e))
}
