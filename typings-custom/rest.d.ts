declare module "rest" {
    export = rest;

    function rest(request: string | rest.IRequest): rest.IResponsePromise;

    namespace rest {
        export function setDefaultClient(client: IClient): void;

        export function getDefaultClient(): IClient;

        export function resetDefaultClient(): void;

        export function wrap<T>(interceptor: Interceptor<T>, config?: T): IClient;

        export interface IRequest {
            method?: string;
            path?: string;
            params?: any;
            headers?: any;
            entity?: any;
        }

        export interface IStatus {
            code: number;
            text?: string;
        }

        export interface IHeaders {
            [index: string]: any;  // string or string[]
        }

        export interface IResponse {
            request: IRequest;
            raw: any;
            status: IStatus;
            headers: IHeaders;
            entity: any;
        }

        export interface IResponsePromise extends Promise<IResponse> {
            entity(): Promise<any>;

            status(): Promise<number>;

            headers(): Promise<IHeaders>;

            header(headerName: string): Promise<any>; // string or string[]
        }

        export type Interceptor<T> = (parent?: IClient, config?: T) => IClient;

        export interface IClient {
            (request: string | IRequest): IResponsePromise;

            skip(): IClient;

            wrap<T>(interceptor: Interceptor<T>, config?: T): IClient;
        }

        export interface IMeta {
            client: IClient;
            arguments: any;
        }
    }
}

declare module "rest/interceptor" {
    import rest = require("rest");

    function interceptor<T, U>(config: interceptor.IConfig<T, U>): rest.Interceptor<T>;

    type PromiseOrRequest = rest.IRequest | Promise<rest.IRequest>;

    namespace interceptor {
        interface IConfig<T, U> {
            init?: (config: T) => U;
            request?: (request: rest.IRequest, config: U, meta: rest.IMeta) => PromiseOrRequest;
            response?: (response: rest.IResponse, config: U, meta: rest.IMeta) => PromiseOrRequest;
            success?: (response: rest.IResponse, config: U, meta: rest.IMeta) => PromiseOrRequest;
            error?: (response: rest.IResponse, config: U, meta: rest.IMeta) => PromiseOrRequest;
        }
    }

    export = interceptor;
}

declare module "rest/interceptor/defaultRequest" {
    import rest = require("rest");

    let defaultRequest: rest.Interceptor<defaultRequest.IConfig>;

    namespace defaultRequest {
        interface IConfig {
            method?: string;
            path?: string;
            params?: any;
            headers?: any;
            entity?: any;
            mixin?: any;
        }
    }

    export = defaultRequest;
}

declare module "rest/interceptor/hateoas" {
    import rest = require("rest");

    let hateoas: rest.Interceptor<hateoas.IConfig>;

    namespace hateoas {
        interface IConfig {
            target?: string;
            client?: rest.IClient;
        }
    }

    export = hateoas;
}

declare module "rest/interceptor/location" {
    import rest = require("rest");

    let location: rest.Interceptor<location.IConfig>;

    namespace location {
        interface IConfig {
            client?: rest.IClient;
            code?: number;
        }
    }

    export = location;
}

declare module "rest/interceptor/mime" {
    import rest = require("rest");
    import registry = require("rest/mime/registry");

    let mime: rest.Interceptor<mime.IConfig>;

    namespace mime {
        interface IConfig {
            mime?: string;
            accept?: string;
            registry?: registry.IRegistry;
            permissive?: boolean;
        }
    }

    export = mime;
}

declare module "rest/interceptor/pathPrefix" {
    import rest = require("rest");

    let pathPrefix: rest.Interceptor<pathPrefix.IConfig>;

    namespace pathPrefix {
        interface IConfig {
            prefix?: string;
        }
    }

    export = pathPrefix;
}

declare module "rest/interceptor/basicAuth" {
    import rest = require("rest");

    let basicAuth: rest.Interceptor<basicAuth.IConfig>;

    namespace basicAuth {
        interface IConfig {
            username?: string;
            password?: string;
        }
    }

    export = basicAuth;
}

declare module "rest/interceptor/oAuth" {
    import rest = require("rest");

    let oAuth: rest.Interceptor<oAuth.IConfig>;

    namespace oAuth {
        type DismissWindow = () => void;

        interface IConfig {
            token?: string;
            clientId?: string;
            scope?: string;
            authorizationUrl?: string;
            redirectUrl?: string;
            windowStrategy?: (url: string) => DismissWindow;
            oAuthCallback?: (hash: string) => void;
            oAuthCallbackName?: string;
        }
    }

    export = oAuth;
}

declare module "rest/interceptor/csrf" {
    import rest = require("rest");

    let csrf: rest.Interceptor<csrf.IConfig>;

    namespace csrf {
        interface IConfig {
            name?: string;
            token?: string;
        }
    }

    export = csrf;
}

declare module "rest/interceptor/errorCode" {
    import rest = require("rest");

    let errorCode: rest.Interceptor<errorCode.IConfig>;

    namespace errorCode {
        interface IConfig {
            code?: number;
        }
    }

    export = errorCode;
}

declare module "rest/interceptor/retry" {
    import rest = require("rest");

    let retry: rest.Interceptor<retry.IConfig>;

    namespace retry {
        interface IConfig {
            initial?: number;
            multiplier?: number;
            max?: number;
        }
    }

    export = retry;
}

declare module "rest/interceptor/template" {
    import rest = require("rest");

    let template: rest.Interceptor<template.IConfig>;

    namespace template {
        interface IConfig {
            template?: string;
            params?: {
                [name: string]: any;
            };
        }
    }

    export = template;
}

declare module "rest/interceptor/timeout" {
    import rest = require("rest");

    let timeout: rest.Interceptor<timeout.IConfig>;

    namespace timeout {
        interface IConfig {
            timeout?: number;
            transient?: boolean;
        }
    }

    export = timeout;
}

declare module "rest/interceptor/jsonp" {
    import rest = require("rest");

    let jsonp: rest.Interceptor<jsonp.IConfig>;

    namespace jsonp {
        interface IConfig {
            callback?: {
                param?: string;
                prefix?: string;
                name?: string;
            };
        }
    }

    export = jsonp;
}

declare module "rest/interceptor/ie/xdomain" {
    import rest = require("rest");

    let xdomain: rest.Interceptor<{}>;

    export = xdomain;
}

declare module "rest/interceptor/ie/xhr" {
    import rest = require("rest");

    let xhr: rest.Interceptor<{}>;

    export = xhr;
}

declare module "rest/mime/registry" {
    let registry: registry.IRegistry;

    namespace registry {
        interface IMIMEConverter {
            read(value: string): any | Promise<any>;

            write(value: any): string | Promise<string>;
        }

        interface IRegistry {
            lookup(mimeType: string): Promise<IMIMEConverter>;

            register(mimeType: string, converter: IMIMEConverter): void;
        }
    }

    export = registry;
}

declare module "rest/client/xhr" {
    import rest = require("rest");
    let xhr: rest.IClient;
    export = xhr;
}

declare module "rest/client/node" {
    import rest = require("rest");
    let node: rest.IClient;
    export = node;
}

declare module "rest/client/jsonp" {
    import rest = require("rest");
    let jsonp: rest.IClient;
    export = jsonp;
}

declare module "rest/client/xdr" {
    import rest = require("rest");
    let xdr: rest.IClient;
    export = xdr;
}
