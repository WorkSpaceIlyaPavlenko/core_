import {SignalContract} from "@/core/configs/type";
import {RuntimeSignal} from "@/core/engine/type";
import Validator from "@/core/schemas/validator";


export type StoreFn<T> = (payload: {
    id: string;
    patch: {
        id: string;
        props: T;
    };
}) => void;

abstract class Handler<T> {

    protected abstract getCollection(): Map<string, RuntimeSignal>;

    protected abstract getStore():StoreFn<T>;

    protected constructor() {};

    public register(signalId:string, data:RuntimeSignal)
    {
        this.getCollection().set(signalId, data);
    }


    public execute(signalId:string, event:string):void
    {
        const data:RuntimeSignal = this.getCollection().get(signalId)!;
        const store = this.getStore();
        console.log(data)
        if (Validator.EventActionsUI.safeParse(event).success && data)
        {
            for (const emit of data.emits)
            {
                const event_= emit.signal.event;

                if (event_ !== event)
                    continue;


                store(this.getPatch(emit));
            }

        }

        else if (Validator.EventKindSys.safeParse(event).success && data)
        {
            //TODO: пока нет sys временно дублиурую логику
            for (const emit of data.emits)
            {
                const event_= emit.signal.event;

                if (event_ !== event)
                    continue;


                store(this.getPatch(emit));
            }
        }
    }

    public getEventById(signalId:string)
    {
        const data:RuntimeSignal = this.getCollection().get(signalId)!;
        const events:Array<string> = [];

        if (data)
            for (const emit of data.emits)
                events.push(emit.signal.event);

        return events;
    }

    protected getPatch(emit:SignalContract)
    {
        const patch = {
            id:emit.targetId,
            props:emit.payload as T
        }

        return {
            id:emit.targetId,
            patch:patch
        }
    }
    
}

export default Handler
