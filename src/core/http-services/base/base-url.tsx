
import { REACT_APP_PROD_MODE, REACT_APP_DEV_MODE } from '@env';

const BASE_URL: string = process.env.NODE_ENV === 'development' ? REACT_APP_DEV_MODE : REACT_APP_PROD_MODE;

export default BASE_URL;
