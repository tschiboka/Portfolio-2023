import { CategoryRequestResource } from "../common/types";

export const getParents = {
    fromApi: (categories: CategoryRequestResource[]) => categories.map(c => ({name: c.name, id: c._id}))
}