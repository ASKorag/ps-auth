import axios from 'axios';

import { IUser } from '@type/user';
import { backEndInstance } from '@api/API';


export  type UserType = {
  email: string,
  id: string
  isActivated: boolean
}

type AuthResponseType = {
  accessToken: string
  refreshToken: string
  user: UserType,
  profile: IUser,
}

export const authAPI = {
  login(email: string, password: string) {
    return backEndInstance.post<AuthResponseType>(`/login`, { email, password })
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          /*console.log(err)*/
          // client received an error response (5xx, 4xx)
        } else if (err.request) {
          /*console.log(err)*/
          // client never received a response, or request never left
        } else {
          /*console.log(err)*/
          // anything else
        }
      });
  },
  registration(email: string, password: string, name: string) {
    return backEndInstance.post<AuthResponseType>(`/registration`, { email, password, name })
      .then(response => response.data);
  },
  logout() {
    return backEndInstance.post<any>(`/logout`)
      .then(response => response.data);

  },
  refresh() {
    return backEndInstance.get<AuthResponseType>(`/refresh`, )
      .then(response => response.data)
  },
};
