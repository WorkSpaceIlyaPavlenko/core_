
import {CoreIdAndKind} from "@/core/signals/type";
import crypto from 'node:crypto';
import {RuntimeSignal} from "@/core/engine/type";
import Validator from "@/core/schemas/validator";
import AppButtonHandler, {ButtonHandler} from "@/core/signals/handlers/button_handler";
import AppTextHandler, {TextHandler} from "@/core/signals/handlers/text_handler";
import AppContainerHandler, {ContainerHandler} from "@/core/signals/handlers/container_handler";

export type Handlers =
    | ButtonHandler
    | TextHandler
    | ContainerHandler

class SignalRegister
{
    keySignalsId_ = new Map<string, string>();
    signalsIdHandler = new Map<string, Array<string>>();

    private handlers = new Map<string, Handlers>([
        ['AppButtonHandler', AppButtonHandler],
        ['AppTextHandler', AppTextHandler],
        ['AppContainerHandler', AppContainerHandler],
    ]);

    constructor() {}

    public setSignal({id, kind}:CoreIdAndKind, data:RuntimeSignal)
    {
        const key = this.getKey({id, kind});
        const signalID = this.createSignalId(key);

        if (!this.keySignalsId_.has(key))
        {
            this.keySignalsId_.set(key, signalID);
            this.provideToHandler(signalID, data);
        }

    }

    public getSignalId({id, kind}:CoreIdAndKind)
    {
        const key = this.getKey({id, kind});
        return this.keySignalsId_.get(key)!;

    }

    public getEventForId(signalId:string)
    {
        const handlerNames = this.signalsIdHandler.get(signalId);

        if (!handlerNames?.length)
            return [];

        const events:Array<string> = [];

        for (const handlerName of handlerNames)
        {
            const handler = this.getHandler(handlerName);

            if (!handler)
                return [];

            events.push(...handler.getEventById(signalId))
        }

        return events
    }

    public executeSignal(signalId:string, event:string)
    {
        const handlerNames = this.signalsIdHandler.get(signalId);

        if (!handlerNames?.length)
            throw Error('No denied Handlers');

        for (const handlerName of handlerNames)
        {
            const handler = this.getHandler(handlerName);

            if (!handler)
                throw Error('No denied Handler');

            handler.execute(signalId, event)
        }

    }

    private createSignalId(key:string)
    {
        const key_ = crypto.createHash('sha256')
            .update(key)
            .digest('hex')
            .slice(0,16);

        return `sig_${key_}`;
    }

    private getKey({id, kind}:CoreIdAndKind)
    {
        return `${id}-${kind}`;
    }

    private provideToHandler(signalId:string, data:RuntimeSignal):void
    {
        const emitCollection = this.sortEmitsByKind(data);

        for (const [kind, emit] of emitCollection)
        {
            if (Validator.EntitiesKindButton.safeParse(kind).success)
            {
                this.getHandler('AppButtonHandler')?.register(signalId, emit);

                this.setSignalHandler(signalId, 'AppButtonHandler');

                continue;
            }

            if (Validator.EntitiesKindText.safeParse(kind).success)
            {
                this.getHandler('AppTextHandler')?.register(signalId, data);

                this.setSignalHandler(signalId, 'AppTextHandler');

                continue;
            }

            if (Validator.EntitiesKindContainer.safeParse(kind).success)
            {
                this.getHandler('AppContainerHandler')?.register(signalId, data);

                this.setSignalHandler(signalId, 'AppContainerHandler');

                continue;
            }
        }
    }

    private getHandler(handler:string)
    {
        if (this.handlers.has(handler))
            return this.handlers.get(handler);
        else
            throw Error('No handler handler found.');
    }

    private setSignalHandler(id:string, handler:string)
    {
        const prevHandlers = this.signalsIdHandler.get(id)!;

        if (prevHandlers && prevHandlers.length)
        {
            this.signalsIdHandler.set(id, [...prevHandlers, handler]);
        }
        else
            this.signalsIdHandler.set(id, [handler])
    }

    private sortEmitsByKind(data:RuntimeSignal)
    {
        const emits = data.emits;

        const kindEmits = new Map<string, RuntimeSignal>([]);

        for (const emit of emits)
        {
            const prev = kindEmits.get(emit.elKind)!;

            if(prev?.emits.length)
                kindEmits.set(emit.elKind, {emits:[...prev.emits, emit]});
            else
                kindEmits.set(emit.elKind, {emits:[emit]});
        }

        return kindEmits;
    }
}

const AppSignalRegister = new SignalRegister();

export default AppSignalRegister;