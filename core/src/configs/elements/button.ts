import {AstElementButtonType} from "./type";
import {OwnerDynamicParentType} from "@/core/configs/type";


export function button_config(data:AstElementButtonType):AstElementButtonType
{

    const core = setCore(data);
    const initialState = setState(data) ?? {};
    const behavior = setBehavior(data) ?? { emit: [] };
    const props = setProps(data) ?? {};

    return {
        core,
        initialState,
        behavior,
        props
    }
}

export function button_config_dynamic(data:AstElementButtonType, owner:OwnerDynamicParentType):AstElementButtonType
{
    const coreWithOwner = {
        core: {
            ...data.core,
            owner
        }
    }

    const core = setCore(coreWithOwner);
    const initialState = setState(data) ?? {};
    const behavior = setBehavior(data) ?? { emit: [] };
    const props = setProps(data) ?? {};

    return {
        core,
        initialState,
        behavior,
        props
    }
}

function setCore(data:Pick<AstElementButtonType, 'core'>)
{ 
  return {...data.core}
}

function setBehavior(data:Pick<AstElementButtonType, 'behavior'>)
{
  if (!data.behavior)
    return undefined;

  return {...data.behavior}
}

function setState(data:Pick<AstElementButtonType, 'initialState'>)
{
  if (!data.initialState)
    return {
      visible: true
    }

  return {
    ...data.initialState,
    visible:data.initialState.visible ?? true
    
  };
}

function setProps(data:Pick<AstElementButtonType, 'props'>)
{
  if (!data.props)
    return undefined;

  const props = {...data.props};

  if (props.img)
    if (!props.imgLocation)
      props.imgLocation = 'left';

  return {...props}
}

