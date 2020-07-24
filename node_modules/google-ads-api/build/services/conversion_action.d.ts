import { ConversionAction } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class ConversionActionService extends Service {
    get(id: number | string): Promise<ConversionAction>;
    list(options?: ServiceListOptions): Promise<Array<{
        conversion_action: ConversionAction;
    }>>;
    create(conversion_action: ConversionAction | Array<ConversionAction>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(conversion_action: ConversionAction | Array<ConversionAction>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
