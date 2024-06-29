import { SearchInputOption } from "../../../sharedComponents/WrappedFormComponents/WrappedFormComponents";
import { CategoryRequestResource } from "../common/types";
import { icons } from "./icons";

export const getParents = {
    fromApi: (categories: CategoryRequestResource[]): SearchInputOption[] => categories.map(c => ({
        name: c.name, 
        value: c._id,
        icon: icons[c.icon],
        iconColor: c.color
    }))
}