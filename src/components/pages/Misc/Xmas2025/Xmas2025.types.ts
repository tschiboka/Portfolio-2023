export type XmasFormData = {
    name: string,
    message: string
}

export type XmasMessageRequestResource = XmasFormData & {
    userId: string
}
