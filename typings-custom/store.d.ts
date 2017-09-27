declare module "store" {
    interface IStore {
        set(key: string, value: any): void;

        get(key: string): any;

        getAll(): Object;

        remove(key: string): void;

        clear(): void;

        forEach(callback: (key: string, value: any) => void): void;
    }

    let store: IStore;

    export = store;
}
