import { TouchableOpacity } from "react-native"
import { styles } from "./company-profile.style"
import { centralStyle } from "../../../../../styles/constant.style"
import { Title } from "../../../../../core/components/screen-title.component"
import Colors from "../../../../../styles/colors"
import { t } from "i18next"
interface TabsUiProps {
    item: string;
    index: number;
    setSelectedTab: (tab: string) => void;
    selectedTab: string;
}

const TabsUi: React.FC<TabsUiProps> = ({ item, index, setSelectedTab, selectedTab }) => {

    return (

        <TouchableOpacity
            key={index.toString()}
            onPress={() => setSelectedTab(t(item))}
            activeOpacity={.9} style={[
                styles.tabsContainer(selectedTab, item),
                centralStyle.XAndYCenter]}>
            <Title
                weight='600'
                type='Poppin-14' color={selectedTab == item ? Colors.primary : Colors.fontColor}
                title={item} />
        </TouchableOpacity>
    )
}
export default TabsUi;
