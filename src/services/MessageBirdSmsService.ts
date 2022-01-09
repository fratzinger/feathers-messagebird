import util from 'util';
import initMB, {
  FilterParameters,
  Message,
  MessageBird,
  MessageParameters
} from 'messagebird';

import type { Paginated, Params } from "@feathersjs/feathers"
import { filterQuery } from "@feathersjs/adapter-commons"
import { MethodNotAllowed } from "@feathersjs/errors"
import type { MaybeArray, MessageBirdSmsFindParams, MessageBirdSmsOptions } from '../types';
import { errorHandler } from '../utils';

const alwaysMulti: { [key: string]: boolean } = {
  find: true,
  get: false,
  update: false
};

export class MessageBirdSmsService {
  messagebird: MessageBird
  options: MessageBirdSmsOptions

  protected send: (params: MessageParameters) => Promise<Message>
  protected list: (params: FilterParameters) => Promise<Message[]>
  protected read: (id: string) => Promise<Message>
  protected delete: (id: string) => Promise<unknown>

  constructor(options: MessageBirdSmsOptions) {
    this.messagebird = initMB(options.accessKey);
    this.send = util.promisify(this.messagebird.messages.create)
    this.list = util.promisify(this.messagebird.messages.list)
    this.read = util.promisify(this.messagebird.messages.read)
    this.delete = util.promisify(this.messagebird.messages.delete)

    this.options = options;
  }

  protected get messages() {
    return this.messagebird.messages;
  }

  getOptions (params: Params): MessageBirdSmsOptions {
    return {
      ...this.options,
      ...params.adapter
    }
  }

  async _find(params: MessageBirdSmsFindParams) {
    const { filters, query, paginate } = this.filterQuery(params);
    let { $limit, $skip } = filters;

    const result = await this.list({
      status: params.query.status,
      limit: $limit,
      offset: $skip
    }).catch(errorHandler);

    // @ts-ignore
    if (paginate && paginate.default) {
      return {
        //@ts-ignore
        data: result.items,
        //@ts-ignore
        $skip: result.offset,
        //@ts-ignore
        $limit: result.limit,
        //@ts-ignore
        total: result.totalCount
      }
    } else {
      //@ts-ignore
      return result.items;
    }

  }

  async _get(id: string, params: Params) {
    return await this.read(id).catch<Message>(errorHandler);
  }

  protected createOne(data: MessageParameters, params: Params) {
    const originator = this.options.originator || data.originator;
    return this.send({
      originator,
      recipients: data.recipients,
      body : data.body,
    });
  }

  async _create(data: MaybeArray<MessageParameters>, params: Params) {
    if (Array.isArray(data)) {
      return await Promise.all(
        data.map(async d => this.createOne(d, params))
      ).catch<Message[]>(errorHandler)
    } else {
      return await this.createOne(data, params).catch<Message>(errorHandler);
    }
  }

  async _remove(id, params) {
    return await this.delete(id).catch<unknown>(errorHandler);
  }

  async find (params: MessageBirdSmsFindParams): Promise<Message[] | Paginated<Message>> {
    return await this._find(params);
  }

  async get (id: string, params?: Params): Promise<Message> {
    return await this._get(id, params);
  }

  async create (data: MessageParameters, params?: Params): Promise<Message>;
  async create (data: MessageParameters[], params?: Params): Promise<Message[]>;
  async create (data: MaybeArray<MessageParameters>, params?: Params): Promise<MaybeArray<Message>> {
    if (Array.isArray(data) && !this.allowsMulti('create', params)) {
      return Promise.reject(new MethodNotAllowed('Can not create multiple entries'));
    }

    return await this._create(data, params);
  }

  async remove (id: string, params?: Params): Promise<unknown> {
    return await this._remove(id, params);
  }

  filterQuery (params: Params = {}, opts: any = {}) {
    const paginate = typeof params.paginate !== 'undefined'
      ? params.paginate
      : this.getOptions(params).paginate;
    const { query = {} } = params;
    const options = Object.assign({
      operators: [],
      filters: [],
      paginate
    }, opts);
    const result = filterQuery(query, options);

    return Object.assign(result, { paginate });
  }

  allowsMulti (method: string, params: Params = {}) {
    const always = alwaysMulti[method];

    if (typeof always !== 'undefined') {
      return always;
    }

    const { multi: option } = this.getOptions(params);

    if (option === true || option === false) {
      return option;
    }

    return option.includes(method);
  }
}
