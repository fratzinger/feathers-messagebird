import { Params } from "@feathersjs/feathers";

export interface MessageBirdSmsOptions {
  accessKey: string
  originator?: string
  multi?: boolean|string[];
  paginate?: {
    default?: number;
    max?: number;
  }
}

export interface MessageBirdSmsFindQuery {
  originator?: string
  recipient?: string
  direction?: string
  searchterm?: string
  type?: 'sms' | 'binary' | 'flash'
  contact_id?: number
  status?: 'scheduled' | 'sent' | 'buffered' | 'delivered' | 'expired' | 'delivery_failed'
  from?
  until?
  $limit?: number
  $skip?: number
}

export interface MessageBirdSmsFindParams extends Params {
  query: MessageBirdSmsFindQuery
}

export interface MessageBirdError {
  errors: any[]
  statusCode: number
  message: string
  stack: string
}

export type MaybeArray<T> = T | T[]
