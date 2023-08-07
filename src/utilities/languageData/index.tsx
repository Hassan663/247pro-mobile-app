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
            verifyBuisnessHeader: 'Help us to improve your experience by answering a few questions',
            Are_you_a_business: 'Are you a business?',
            yes: 'Yes',
            no: 'No',
            completeQuestions: `Complete these questions to receive job leads.`
        }
    },
    {
        locale: 'ch',
        translation: {
            Create_Your_Free_Account: `创建您的免费帐户`,
            Please_provide_your_login_information: "请提供您的登录信息",
            Full_name: "全名",
            verifyBuisnessHeader: '回答几个问题帮助我们改善您的体验',
            Are_you_a_business: '你是企业吗？',
            Email: "电子邮件",
            Next: "下一步",
            Password: "密码",
            Welcome_to_247PRO: "欢迎来到247PRO",
            Login: `登录您的帐户`,
            yes: '是的',
            no: '不',
            completeQuestions: `完成这些问题以获得工作机会。`,

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
            verifyBuisnessHeader: 'Ayúdanos a mejorar tu experiencia respondiendo algunas preguntas',
            Next: "Siguiente",
            Full_name: "Nombre completo",
            Email: "Correo electrónico",
            Are_you_a_business: '¿Eres un negocio?',
            yes: 'Sí',
            no: 'No',
            completeQuestions: `Complete estas preguntas para recibir oportunidades de trabajo.`



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
