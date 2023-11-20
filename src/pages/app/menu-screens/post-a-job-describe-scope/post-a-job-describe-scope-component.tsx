
import { View } from 'react-native';

import Colors from '../../../../styles/colors';
import { Title } from '../../../../core/components/screen-title.component';
// import { styles } from './post-a-job.style';
import { centralStyle } from '../../../../styles/constant.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { styles } from './post-a-job-describe-scope.style';

export const step = (title: string, borderEnabled: boolean, isComplete?: boolean) => {
    return (
        <View style={[centralStyle.circle(RFPercentage(3)), centralStyle.mx05, isComplete ? styles.completeCircle : borderEnabled ? styles.borderWidth : styles.disableCircle]}>
            <Title
                title={title}
                type='Poppin-11'
                color={isComplete ? Colors.white : Colors.fontColor}
                weight='400' />
        </View>
    )
}