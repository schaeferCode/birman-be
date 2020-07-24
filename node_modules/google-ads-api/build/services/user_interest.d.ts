import { UserInterest } from 'google-ads-node/build/lib/resources';
import Service from './service';
import { ServiceListOptions } from '../types';
export default class UserInterestService extends Service {
    get(id: number | string): Promise<UserInterest>;
    list(options?: ServiceListOptions): Promise<Array<{
        user_interest: UserInterest;
    }>>;
}
