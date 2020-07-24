import { Label } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class LabelService extends Service {
    get(id: number | string): Promise<Label>;
    list(options?: ServiceListOptions): Promise<Array<{
        label: Label;
    }>>;
    create(label: Label | Array<Label>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(label: Label | Array<Label>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
