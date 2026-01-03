import {behaviorAST, coreAST} from "@/core/engine/converters/type";
import {SignalContract, SignalSysType, SignalUIType} from "@/core/configs/type";
import {RuntimeSignal} from "@/core/engine/type";
import Validator from "@/core/schemas/validator";
import {AstButtonProps, AstTextCore} from "@/core/configs/elements/type";
import {AstContainerCore} from "@/core/configs/blocks/type";


class SignalConverter {
    coreAST:coreAST;
    behaviorAST:behaviorAST;
    kind:string;
    id:string;

    constructor(core:coreAST, behavior:behaviorAST)
    {
        this.coreAST = core;
        this.behaviorAST = behavior;
        this.kind = core.kind
        this.id = core.id;
    }

    getSignals() {
        return this.createRuntimeSignals();
    }

    createRuntimeSignals():RuntimeSignal| undefined
    {
        if (!this.behaviorAST)
            return undefined;

        const emits = [...this.behaviorAST.emit];
        const runTimeEmits:Array<SignalContract> = [];

        for (const emit of emits)
        {
            const {targetId, targetKind} = this.getEmitsTarget(emit);
            const signal = this.getSignalType(emit);

            if(signal === undefined)
                continue;

            const payload = this.getPayload(targetKind, emit.payload);

            runTimeEmits.push({
                targetId,
                elKind:targetKind,
                signal,
                payload
            })
        }
        console.log(runTimeEmits);
        return {emits:runTimeEmits}
    }

    getEmitsTarget(emit:SignalContract)
    {
        const targetId = emit.targetId;
        const targetKind = emit.elKind;

        return {
            targetId,
            targetKind,
        }
    }

    getSignalType(emit:SignalContract)
    {
        const signal = emit.signal;
        const {kind, event} = signal;

        if (Validator.EventKindUI.safeParse(kind).success
            && Validator.EventActionsUI.safeParse(event))
            return signal as SignalUIType;

        else if (Validator.EventKindSys.safeParse(kind).success
            && Validator.EventActionsSys.safeParse(event))
            return signal as SignalSysType;

        return undefined;
    }
    //TODO:заменить as на z валидацию
    getPayload(kind:string, payload:unknown)
    {
        if (!Validator.UtilsIsObject(payload))
            return {};

        if (Validator.EntitiesKindButton.safeParse(kind).success)
            return payload as AstButtonProps;

        if (Validator.EntitiesKindContainer.safeParse(kind).success)
            return payload as AstContainerCore;

        if (Validator.EntitiesKindText.safeParse(kind).success)
            return payload as AstTextCore;

        return {}
    }

}

export default SignalConverter;