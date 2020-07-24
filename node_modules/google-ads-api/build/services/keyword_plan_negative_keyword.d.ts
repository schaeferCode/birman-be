import { KeywordPlanNegativeKeyword } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class KeywordPlanNegativeKeywordService extends Service {
    get(id: number | string): Promise<KeywordPlanNegativeKeyword>;
    list(options?: ServiceListOptions): Promise<Array<{
        keyword_plan_negative_keyword: KeywordPlanNegativeKeyword;
    }>>;
    create(keyword_plan_negative_keyword: KeywordPlanNegativeKeyword | Array<KeywordPlanNegativeKeyword>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(keyword_plan_negative_keyword: KeywordPlanNegativeKeyword | Array<KeywordPlanNegativeKeyword>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
