import Handler, {StoreFn} from "@/core/signals/handlers/handler";
import {RuntimeContainerProps} from "@/core/register/container_store/type";
import {RuntimeSignal} from "@/core/engine/type";

import {updateContainer} from "@/core/register/container_store/container_register";


export class ContainerHandler extends Handler<RuntimeContainerProps>
{
    private actionsCollection:Map<string, RuntimeSignal> = new Map();

    constructor() { super(); }

    protected getCollection(): Map<string, RuntimeSignal>
    {
        return this.actionsCollection;
    }

    protected getStore(): StoreFn<RuntimeContainerProps>
    {
        return updateContainer;
    }
}

const AppContainerHandler = new ContainerHandler();

export default AppContainerHandler;