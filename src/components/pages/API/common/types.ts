// This file contains all the types that are sent or recieved from the API

export type CategoryResource = {
    name: string,
    isParent: boolean,
    parentId?: string,
    status?: string,
    description: string,
    icon: string,
    color?: string,
}

export type CategoryRequestResource = CategoryResource & { _id: string }