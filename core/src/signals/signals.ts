import AppSignalRegister from "@/core/signals/signal_register";
import {CoreIdAndKind} from "@/core/signals/type";

export function getActionId({id, kind}:CoreIdAndKind)
{

    const signalId = AppSignalRegister.getSignalId({id, kind});
    const events = AppSignalRegister.getEventForId(signalId);

    return {
        signalId,
        events
    }
}

export function onSignal(signalId:string, events:string)
{
    AppSignalRegister.executeSignal(signalId, events);
}
