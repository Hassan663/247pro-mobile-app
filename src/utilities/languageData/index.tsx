import { t } from 'i18next';

export const languageData = [

    {
        locale: 'en',
        translation: {
            Create_Your_Free_Account:`Create Your Free Account`, 
            Login:`Login Your Account`, 
        }
    },
    {
        locale: 'ch',
        translation: {
            Create_Your_Free_Account:`创建您的免费帐户`, 
            Login:`登录您的帐户`, 

        }
    },  
    {
        locale: 'es',
        translation: {
            Create_Your_Free_Account:`Crea tu cuenta gratuita`, 
            Login:`inicie sesión en su cuenta`, 

              }
    }
];

export type languageProps = {
    id: string;
    name: string;
    code: string;
};

export const appLanguages: languageProps[] = [
    {
        id: '0',
        name: 'English',
        code: 'en'
    },
    {
        id: '1',
        name: 'chinese',
        code: 'ch'
    }, 
    {
        id: '5',
        name: 'Spanish',
        code: 'es'
    }
];
