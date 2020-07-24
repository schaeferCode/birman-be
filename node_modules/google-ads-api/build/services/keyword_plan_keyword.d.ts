import { KeywordPlanKeyword } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class KeywordPlanKeywordService extends Service {
    get(id: number | string): Promise<KeywordPlanKeyword>;
    list(options?: ServiceListOptions): Promise<Array<{
        keyword_plan_keyword: KeywordPlanKeyword;
    }>>;
    create(keyword_plan_keyword: KeywordPlanKeyword | Array<KeywordPlanKeyword>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(keyword_plan_keyword: KeywordPlanKeyword | Array<KeywordPlanKeyword>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
