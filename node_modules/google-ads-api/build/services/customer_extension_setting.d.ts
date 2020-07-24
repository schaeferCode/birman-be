import { CustomerExtensionSetting } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class CustomerExtensionSettingService extends Service {
    get(id: number | string): Promise<CustomerExtensionSetting>;
    list(options?: ServiceListOptions): Promise<Array<{
        customer_extension_setting: CustomerExtensionSetting;
    }>>;
    create(customer_extension_setting: CustomerExtensionSetting | Array<CustomerExtensionSetting>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(customer_extension_setting: CustomerExtensionSetting | Array<CustomerExtensionSetting>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
