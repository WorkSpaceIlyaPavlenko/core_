import {NodeCoreStructType, SignalContract} from "@/core/configs/type";
import {behaviorAST} from "@/core/engine/converters/type";
import {NodeRuntimeBehaviorType} from "@/core/signals/type";

//core
export interface NodeRuntimeMetaType
{
    id: string;
    parentId: string | null;
}

export interface NodeRuntimeStateType<P = unknown>
{
    visible?: boolean;
    disabled?: boolean;
    active?: boolean;
    loading?: boolean;
    props?:P
}
export interface RuntimeSignal
{
    emits:Array<SignalContract>;
}

export interface NodeRuntimeConfigType<T = never, P = unknown>
{
    meta:NodeRuntimeMetaType;
    state:NodeRuntimeStateType<P>;
    behavior?:NodeRuntimeBehaviorType;
    coreRef:NodeCoreStructType<T>;
}

export type RuntimeChildrenId = Pick<NodeCoreStructType, 'id'> &  Pick<NodeCoreStructType, 'kind'> ;

//element
// export type RuntimeSignalHandler<T = unknown> =
//     (signal: SignalContract<T>) => void;
//
// export interface NodeRuntimeBehaviorType
// {
//     onSignal?: Record<string, RuntimeSignalHandler>;
//     action?: () => void;
// }

