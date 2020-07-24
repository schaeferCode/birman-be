import { AdGroupCriterionLabel } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class AdGroupCriterionLabelService extends Service {
    get(id: number | string): Promise<AdGroupCriterionLabel>;
    list(options?: ServiceListOptions): Promise<Array<{
        ad_group_criterion_label: AdGroupCriterionLabel;
    }>>;
    create(ad_group_criterion_label: AdGroupCriterionLabel | Array<AdGroupCriterionLabel>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(ad_group_criterion_label: AdGroupCriterionLabel | Array<AdGroupCriterionLabel>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
