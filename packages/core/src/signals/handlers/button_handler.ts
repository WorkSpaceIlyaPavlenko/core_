import {RuntimeSignal} from "@/core/engine/type";
import {updateButton} from "@/core/register/button_store/button_register";
import {RuntimeButtonProps} from "@/core/register/button_store/type";
import Handler, {StoreFn} from "@/core/signals/handlers/handler";


export class ButtonHandler extends Handler<RuntimeButtonProps>
{
    private actionsCollection:Map<string, RuntimeSignal> = new Map();

    constructor(){ super(); };

    protected getCollection(): Map<string, RuntimeSignal>
    {
        return this.actionsCollection;
    }

    protected getStore(): StoreFn<RuntimeButtonProps>
    {
        return updateButton;
    }
}

const AppButtonHandler = new ButtonHandler();

export default AppButtonHandler;