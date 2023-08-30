// @app
import React, { useState } from 'react';
import {
    TouchableOpacity,
    FlatList,
    View,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import Colors from '../../../styles/colors';
import { Title } from '../../../core/components/screen-title.component';
import { centralStyle } from '../../../styles/constant.style';
import { styles } from './speciality.style';

export const ServiceCategories: React.FC<{ item?: any }> = ({ item }) => {
    const [selectedCategory, setselectedCategory] = useState<boolean>(false);
    const [isOpen, setisOpen] = useState<boolean>(false);
    return (
        <>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => setselectedCategory(!selectedCategory)}
                style={[centralStyle.row, centralStyle.alignitemCenter, styles.categoryContainer]}>
                <View style={[centralStyle.row, centralStyle.alignitemCenter]}>
                    {selectedCategory ?
                        <AntDesign
                            style={styles.mr1}
                            name={`checksquare`}
                            color={Colors.primary}
                            size={RFPercentage(3)} />
                        :
                        <Feather
                            style={styles.mr1}
                            name={`square`}
                            color={Colors.fontColor}
                            size={RFPercentage(3)} />
                    }
                    <Title
                        title={`${item}`}
                        weight='400'
                        color={Colors.black}
                        type='Poppin-16' />

                </View>
                <AntDesign
                    onPress={() => setisOpen(!isOpen)}
                    name={isOpen ? 'down' : 'left'}
                    size={RFPercentage(3)} />
            </TouchableOpacity >
            {item == t('Plumbing') && isOpen &&
                <FlatList
                    style={[styles.px2]}
                    data={[t('KitchenSink'), t('InstallAfaucet'), t('InstallAsink'), t('InstallAtoilet'), t('Tub'), t('WaterHeater')]}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <CheckBoxRow selectedCategory={selectedCategory} item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            }
        </>
    )

}
export const CheckBoxRow: React.FC<{ item?: any, selectedCategory?: boolean }> = ({ item, selectedCategory }) => {
    const [check, setCheck] = useState<boolean>(false)
    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={() => setCheck(!check)}
            style={[centralStyle.row, centralStyle.alignitemCenter, styles.titleContainer,]}>
            {selectedCategory == true ?
                < AntDesign
                    style={styles.mr1}
                    name={`checksquare`}
                    color={Colors.primary}
                    size={RFPercentage(2.5)} /> :

                check ?
                    <AntDesign
                        style={styles.mr1}
                        name={`checksquare`}
                        color={Colors.primary}
                        size={RFPercentage(2.5)} />
                    :
                    <Feather
                        style={styles.mr1}
                        name={`square`}
                        color={Colors.fontColor}
                        size={RFPercentage(2.5)} />
            }
            <Title
                title={`${item}`}
                weight='400'
                color={Colors.fontColor}
                type='Poppin-14' />
        </TouchableOpacity>
    )

};

