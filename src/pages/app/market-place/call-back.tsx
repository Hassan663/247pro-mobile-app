import { changeRoute } from "../../../core/helpers/async-storage"

export const handleCloseSheet = (check: boolean, refRBSheet: any, routeName?: string, navigation?: any) => {
    if (!check) {
        refRBSheet.current.close()
        if (routeName) changeRoute(navigation, routeName)
    }
}