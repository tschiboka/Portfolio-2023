// This file contains all the types that are sent or recieved to the API

export type CategoryResource = {
    name: string,
    isParent: boolean,
    parent?: string,
    description: string,
    icon: string,
    color?: string,
}

export type CategoryRequestResource = CategoryResource & { _id: string }