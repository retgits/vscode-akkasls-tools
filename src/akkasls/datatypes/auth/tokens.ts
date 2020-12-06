/* eslint-disable @typescript-eslint/naming-convention */
export interface Token {
    name:         string;
    description:  string;
    created_time: Time;
    scopes:       number[];
    expire_time?: Time;
    token_type?:  number;
}

export interface Time {
    seconds: number;
}