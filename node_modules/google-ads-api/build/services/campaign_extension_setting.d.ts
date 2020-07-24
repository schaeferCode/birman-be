import { CampaignExtensionSetting } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class CampaignExtensionSettingService extends Service {
    get(id: number | string): Promise<CampaignExtensionSetting>;
    list(options?: ServiceListOptions): Promise<Array<{
        campaign_extension_setting: CampaignExtensionSetting;
    }>>;
    create(campaign_extension_setting: CampaignExtensionSetting | Array<CampaignExtensionSetting>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(campaign_extension_setting: CampaignExtensionSetting | Array<CampaignExtensionSetting>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
