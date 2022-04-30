import apiClient from './clients/api-client';
import { AxiosResponse } from 'axios';
import { User } from '../models/user';

export default class MemberAPI {
  static async validate (member: User): Promise<User> {
    const res: AxiosResponse<User> = await apiClient.patch(`/api/members/${member.id}/validate`, { user: member });
    return res?.data;
  }
}
