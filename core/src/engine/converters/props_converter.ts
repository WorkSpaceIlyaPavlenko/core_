
import {AstElementButtonType} from "@/core/configs/elements/type";
import {RuntimeButtonRegister} from "@/core/register/button_store/type";
import {coreAST, initStateAST, propsAST} from "@/core/engine/converters/type";
import {RuntimeTextRegister} from "@/core/register/text_store/type";
import {AstElementTextType} from "@/core/configs/elements/type";
import Validator from "@/core/schemas/validator";
import {AstBlockContainerType} from "@/core/configs/blocks/type";


type SupportedKind = keyof PropsConverter['converters'];

export type RuntimeRegister =
    | RuntimeButtonRegister
    | RuntimeTextRegister
    | AstBlockContainerType


class PropsConverter
{
    initStateAST:initStateAST;
    propsAST:propsAST;
    coreAST:coreAST;
    kind:SupportedKind;

    converters = {
        button:() => this.mergeProps<AstElementButtonType['props']>(),
        link:() => this.mergeProps<AstElementButtonType['props']>(),
        text:() => this.mergeProps<AstElementTextType['props']>(),
        container:() => this.mergeProps<AstBlockContainerType['props']>(),
    } satisfies Record<string, () => RuntimeRegister>

    constructor(
        initState:initStateAST,
        props:propsAST,
        core:coreAST
    )
    {
        this.initStateAST = initState;
        this.propsAST = props;
        this.coreAST = core;
        this.kind = core.kind as SupportedKind;
    }

    getProps()
    {
        const kind = this.kind;
        const fn = this.converters[kind];

        if (!fn)
            return undefined;

        return fn();
    }

    private mergeProps<T>()
    {
        const props = Validator.UtilsIsObject(this.propsAST) ?
            this.propsAST as T: {};

        return {
            id:this.coreAST.id,
            props:{
                ...(this.initStateAST ?? {}),
                ...props
            }
        };
    }
}

export default PropsConverter;
