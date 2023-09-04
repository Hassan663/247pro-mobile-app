// @app
import React, {
    useState
} from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import AppHeader from '../../../core/components/app-headers';
import Colors from '../../../styles/colors';
import OutlinedDropDown from '../../../core/components/outlined-dropdown.component';
import { styles } from './speciality.style';
import { Title } from '../../../core/components/screen-title.component';
import { centralStyle } from '../../../styles/constant.style';
import { ServiceCategories } from './component';
import { changeRoute } from '../../../core/helpers/async-storage';

const Speciality: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    const [selectedIndustry, setselectedIndustry] = useState<string>('');

    return (
        <View style={{ flex: 1 }}>
            <AppHeader
                iconL1={
                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() => changeRoute(navigation, 'pop')}
                        style={styles.mx2}>
                        <Title
                            title={t('Cancel')}
                            weight={'600'}
                            color={Colors.primary}
                            type={'Poppin-14'} />
                    </TouchableOpacity>
                }
                iconR1={
                    <View style={styles.mx2}>
                        <Title
                            title={t('Done')}
                            weight={'600'}
                            color={Colors.primary}
                            type={'Poppin-14'} />
                    </View>

                }
                title={t(`Speciality`)} />

            <View style={[centralStyle.container,]}>
                <View style={[styles.inputContainer, centralStyle.XAndYCenter]}>
                    <AntDesign
                        name={'search1'}
                        color={Colors.fontColor}
                        size={RFPercentage(3)} />
                    <TextInput
                        placeholder={t('SearchJobs')}
                        style={[centralStyle.flex1, styles.px2]} />
                </View>
                <OutlinedDropDown
                    title={t('Service category')}
                    onselect={(value: string) => { setselectedIndustry(value) }}
                    DATA={[t('All'),]}
                    drop_down_button_style={styles.drop_down_button_style}
                />
                {selectedIndustry == t('All')
                    &&
                    <FlatList
                        data={[t('Plumbing'), t('Electrical'), t('Construction'), t('Software')]}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <ServiceCategories item={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </View>
        </View>
    );
};

export default Speciality;
