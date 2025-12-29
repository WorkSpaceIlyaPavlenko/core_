import {NodeCoreStructType, UiEventType} from "@/core/configs/type";

export type CoreIdAndKind = Pick<NodeCoreStructType, 'id'> & Pick<NodeCoreStructType, 'kind'>;

export interface NodeRuntimeBehaviorType
{
    emits: Array<{
        event: UiEventType;
        signalId: string;
    }>;
}
