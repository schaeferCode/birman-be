import { AdGroupExtensionSetting } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class AdGroupExtensionSettingService extends Service {
    get(id: number | string): Promise<AdGroupExtensionSetting>;
    list(options?: ServiceListOptions): Promise<Array<{
        ad_group_extension_setting: AdGroupExtensionSetting;
    }>>;
    create(ad_group_extension_setting: AdGroupExtensionSetting | Array<AdGroupExtensionSetting>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(ad_group_extension_setting: AdGroupExtensionSetting | Array<AdGroupExtensionSetting>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
