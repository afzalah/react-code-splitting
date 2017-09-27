declare module "redux-mock-store" {

    type IConfigureStore = (middlewares?: any) => IMockStore;
    type IMockStore = (getState?: Object | Function) => IStore;
    type IAction = any;

    interface IStore {
        dispatch(action: any): any;

        getState(): any;

        getActions(): any[];

        clearActions(): void;

        subscribe(): void;
    }

    let configureStore: IConfigureStore;

    export = configureStore;
}
