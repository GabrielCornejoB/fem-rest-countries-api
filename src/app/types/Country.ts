export interface Country {
    code: string,
    name: string,
    population: number,
    region: string,
    capital: string,
    flag: string,
    officialName?: string,
    subregion?: string,
    tld?: string[],
    currencies?: string[],
    languages?: string[],
    borderCountries?: string[]
}