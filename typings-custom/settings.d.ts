declare module "settings" {
    import {PersistorConfig, AutoRehydrateConfig} from "redux-persist";
    import {IReduxPersistEncryptionConfig, IEnableTransform} from "redux-persist-transform-encrypt";

    export interface IReduxPersist {
        hydrator: AutoRehydrateConfig;
        persistorConfig: PersistorConfig;
        transform: {
            encryption: IReduxPersistEncryptionConfig & IEnableTransform
        };
    }

    let settings: {
        endPoints: any;
        restConfig: {
            host: string;
            apiRoot: string;
            reportingApiRoot: string
        };
        reduxPersist: IReduxPersist
    };

    /* tslint:disable */
    export default settings;
    /* tslint:enable */
}
