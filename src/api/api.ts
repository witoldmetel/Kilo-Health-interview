import DeviceInfo from 'react-native-device-info';
import axios, { AxiosRequestConfig } from 'axios';
import { config } from '@config';
import { isJWTValid } from '@utils/jwt';

const CONFIG: AxiosRequestConfig = {
  headers: {
    Authorization: '',
    accept: 'application/json',
    'Accept-Language': 'en',
    'X-App-Version': DeviceInfo.getVersion(),
    'X-Platform': `${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}`,
  },
};
export class Api {
  static JWT: string;

  static Config = CONFIG;

  static setToken = (jwt: string) => {
    Api.JWT = jwt;

    if (Api.Config.headers) {
      Api.Config.headers.Authorization = `Bearer ${jwt}`;
    }
  };

  static setLanguage = (language: string) => {
    if (Api.Config.headers) {
      Api.Config.headers['Accept-Language'] = language;
    }
  };

  static checkJWT = async () => {
    if (!isJWTValid(Api.JWT)) {
      // const newToken = await FirebaseApi.getUserToken(true);
      // Api.setToken(newToken);
    }
  };

  // Helpers
  static get = async <T>(
    endpoint: string,
    params?: { [key in string]: string | number },
  ) => {
    await Api.checkJWT();
    const url = config.BASE_URL + endpoint;

    return (await axios.get<{ data: T }>(url, { ...Api.Config, params })).data
      .data;
  };

  static post = async <D, T>(endpoint: string, data: D, checkJWT = true) => {
    if (checkJWT) {
      await Api.checkJWT();
    }

    const url = config.BASE_URL + endpoint;

    return (await axios.post<{ data: T }>(url, data, Api.Config)).data.data;
  };

  static patch = async <D, T>(endpoint: string, data: D) => {
    await Api.checkJWT();
    const url = config.BASE_URL + endpoint;

    return (await axios.patch<{ data: T }>(url, data, Api.Config)).data.data;
  };

  static delete = async <D, T>(endpoint: string, data: D) => {
    await Api.checkJWT();
    const url = config.BASE_URL + endpoint;

    return (await axios.delete<{ data: T }>(url, { ...Api.Config, data })).data
      .data;
  };
}
