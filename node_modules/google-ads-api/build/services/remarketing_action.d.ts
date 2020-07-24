import { RemarketingAction } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class RemarketingActionService extends Service {
    get(id: number | string): Promise<RemarketingAction>;
    list(options?: ServiceListOptions): Promise<Array<{
        remarketing_action: RemarketingAction;
    }>>;
    create(remarketing_action: RemarketingAction | Array<RemarketingAction>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(remarketing_action: RemarketingAction | Array<RemarketingAction>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
