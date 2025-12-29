import Handler, {StoreFn} from "@/core/signals/handlers/handler";
import {RuntimeSignal} from "@/core/engine/type";
import {RuntimeTextProps} from "@/core/register/text_store/type";
import {updateText} from "@/core/register/text_store/text_register";


export class TextHandler extends Handler<RuntimeTextProps>
{
    private actionsCollection:Map<string, RuntimeSignal> = new Map();

    constructor(){ super(); };

    protected getCollection(): Map<string, RuntimeSignal>
    {
        return this.actionsCollection;
    }

    protected getStore(): StoreFn<RuntimeTextProps> {
        return updateText;
    }
}

const AppTextHandler = new TextHandler();

export default AppTextHandler;