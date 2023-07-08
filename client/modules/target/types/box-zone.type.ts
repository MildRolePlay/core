export interface BoxZoneOption {
    name: string,
    heading: number,
    debugPoly: boolean,
    minZ: number,
    maxZ: number
}

export type BoxZoneCreationOption = Omit<BoxZoneOption, 'name'>