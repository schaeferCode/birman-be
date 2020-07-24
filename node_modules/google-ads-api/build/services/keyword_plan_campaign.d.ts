import { KeywordPlanCampaign } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class KeywordPlanCampaignService extends Service {
    get(id: number | string): Promise<KeywordPlanCampaign>;
    list(options?: ServiceListOptions): Promise<Array<{
        keyword_plan_campaign: KeywordPlanCampaign;
    }>>;
    create(keyword_plan_campaign: KeywordPlanCampaign | Array<KeywordPlanCampaign>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(keyword_plan_campaign: KeywordPlanCampaign | Array<KeywordPlanCampaign>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
