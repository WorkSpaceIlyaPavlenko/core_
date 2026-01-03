import {NodeCoreStructType} from "@ilyapavlenko/core";

export type IdKindProps = {
    id: string;
    kind:string;
}

export type RuntimeChildrenId = Pick<NodeCoreStructType, 'id'> &  Pick<NodeCoreStructType, 'kind'>