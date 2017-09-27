declare module "redux-persist-transform-encrypt" {
    import {Transform} from "redux-persist";

    export interface IEnableTransform {
        enabled: boolean;
    }

    export interface IReduxPersistEncryptionConfig {
        secretKey: string;
    }

    /* tslint:disable */
    const createEncryptor: (config: IReduxPersistEncryptionConfig) => Transform<string, string>;
    export default createEncryptor;
    /* tslint:enable */
}
