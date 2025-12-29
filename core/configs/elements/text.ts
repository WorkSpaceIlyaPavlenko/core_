import {AstElementTextType} from "@/core/configs/elements/type";
import {ElementType} from "react";
import Validator from "@/core/schemas/validator";


export function text_config(data:AstElementTextType):AstElementTextType
{
    const core = setCore(data);
    const behavior = setBehavior(data) ?? {emit:[]};
    const initialState = setState(data);
    const props = setProps(data) ?? {};

    return {
        core,
        initialState,
        behavior,
        props
    }
}

function setCore(data:Pick<AstElementTextType, 'core'>)
{
    return {...data.core}
}

function setBehavior(data:Pick<AstElementTextType, 'behavior'>)
{
    if (!data.behavior)
        return undefined;

    return {...data.behavior}
}

function setState(data:Pick<AstElementTextType, 'initialState'>)
{
    if (!data.initialState)
        return {
            visible: true,
            tag:'p' as ElementType
        }

    return {
        ...data.initialState,
        visible:data.initialState.visible ?? true,
        tag:setTextTag(data.initialState.tag),
    };
}

function setTextTag(tag:ElementType):ElementType
{
    return Validator.TextTagSchema.safeParse(tag).success
        ? tag as ElementType : 'p';
}

function setProps(data:Pick<AstElementTextType, 'props'>)
{
    if (!data.props)
        return undefined;

    const props = {...data.props};

    return {...props}
}