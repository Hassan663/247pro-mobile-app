import { t } from 'i18next';

export const languageData = [

    {
        locale: 'en',
        translation: {
            Create_Your_Free_Account: `Create Your Free Account`,
            Welcome_to_247PRO: "Welcome to 247PRO",
            Please_provide_your_login_information: "Please provide your login information",
            Full_name: "Full name",
            Email: "Email",
            Next: "Next",
            Password: "Password",
            Login: `Login Your Account`,
        }
    },
    {
        locale: 'ch',
        translation: {
            Create_Your_Free_Account: `创建您的免费帐户`,
            Please_provide_your_login_information: "请提供您的登录信息",
            Full_name: "全名",
            Email: "电子邮件",
            Next: "下一步",
            Password: "密码",
            Welcome_to_247PRO: "欢迎来到247PRO",
            Login: `登录您的帐户`,

        }
    },
    {
        locale: 'es',
        translation: {
            Create_Your_Free_Account: `Crea tu cuenta gratuita`,
            Welcome_to_247PRO: "Bienvenido a 247PRO",
            Please_provide_your_login_information: "Por favor proporcione su información de inicio de sesión",
            Login: `inicie sesión en su cuenta`,
            Password: "Contraseña",
            Next: "Siguiente",
            Full_name: "Nombre completo",
            Email: "Correo electrónico",


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
