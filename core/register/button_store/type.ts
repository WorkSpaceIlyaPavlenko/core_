
import {AstButtonCore, AstButtonProps} from "@/core/configs/elements/type";
import {NodeAstStateType} from "@/core/configs/type";


export type RuntimeButtonProps = AstButtonProps & NodeAstStateType;

export interface RuntimeButtonRegister
{
    id: string;
    props: RuntimeButtonProps;
}

export  interface RuntimeButtonRegisterWithKind extends RuntimeButtonRegister
{
    kind:AstButtonCore['kind'];
}