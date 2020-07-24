import { UserList } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class UserListService extends Service {
    get(id: number | string): Promise<UserList>;
    list(options?: ServiceListOptions): Promise<Array<{
        user_list: UserList;
    }>>;
    create(user_list: UserList | Array<UserList>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(user_list: UserList | Array<UserList>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
