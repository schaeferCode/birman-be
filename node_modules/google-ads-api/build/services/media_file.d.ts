import { MediaFile } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class MediaFileService extends Service {
    get(id: number | string): Promise<MediaFile>;
    list(options?: ServiceListOptions): Promise<Array<{
        media_file: MediaFile;
    }>>;
    create(media_file: MediaFile | Array<MediaFile>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(media_file: MediaFile | Array<MediaFile>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
