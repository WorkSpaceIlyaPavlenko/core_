
import {
    StoresRegisters,
    RuntimeRegister,
    StoresRegistersType,
    childrenStoresRegisters,
    RuntimeChildrenRegister
} from "@/core/register";



export class StoreProvider
{
    private stores:StoresRegistersType = StoresRegisters;
    private childrenStore = childrenStoresRegisters;

    constructor() {};

    /**
     * provie valid props to registers
     */
    public provide(kind:string, props:RuntimeRegister):void
    {
        const fn = this.stores.get(kind);

        if (!fn)
        {
            //TODO:прокинуть в logger
            console.error(`There is no suitable registry for the ${kind}`);
            return;
        }

        fn(props);
    }

    public childIdsProvide(kind:string, data:RuntimeChildrenRegister)
    {
        const fn = this.childrenStore.get(kind);

        if (!fn)
        {
            console.error(`There is no suitable registry children for the ${kind}`);
            return;
        }

        fn(data)
    }
}


