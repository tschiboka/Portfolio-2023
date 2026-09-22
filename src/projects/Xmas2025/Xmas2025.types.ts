export type XmasFormData = {
    name: string
    message: string
}

/** A message as a table row — `createdAt` is formatted for display. */
export type XmasMessageRow = {
    _id: string
    date: string
    name: string
    message: string
    userId: string
}
