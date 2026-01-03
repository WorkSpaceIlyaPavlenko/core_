import {AstContainerProps} from "@/core/configs/blocks/type";
import {NodeAstStateType} from "@/core/configs/type";
import {RuntimeChildrenId} from "@/core/engine/type";


export type RuntimeContainerProps =  AstContainerProps & NodeAstStateType;

export interface RuntimeContainerRegister
{
    id: string;
    props: RuntimeContainerProps;
}

export type RuntimeContainerChildren = {id:string, children:Array<RuntimeChildrenId>}
