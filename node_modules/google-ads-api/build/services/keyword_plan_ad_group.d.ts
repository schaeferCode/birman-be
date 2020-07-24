import { KeywordPlanAdGroup } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class KeywordPlanAdGroupService extends Service {
    get(id: number | string): Promise<KeywordPlanAdGroup>;
    list(options?: ServiceListOptions): Promise<Array<{
        keyword_plan_ad_group: KeywordPlanAdGroup;
    }>>;
    create(keyword_plan_ad_group: KeywordPlanAdGroup | Array<KeywordPlanAdGroup>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(keyword_plan_ad_group: KeywordPlanAdGroup | Array<KeywordPlanAdGroup>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
