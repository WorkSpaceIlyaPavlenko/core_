import {AstTextInitialState, AstTextProps} from "@/core/configs/elements/type";


export type RuntimeTextProps = AstTextProps & AstTextInitialState;

export interface RuntimeTextRegister
{
    id:string;
    props:RuntimeTextProps
}

