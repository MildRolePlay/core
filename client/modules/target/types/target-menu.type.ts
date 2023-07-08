export interface TargetInteractMenu {
    items: TargetInteractMenuItem[]
}

export interface TargetInteractMenuItem {
    label: string,
    metadata: any,
    client?: string,
    server?: string
}