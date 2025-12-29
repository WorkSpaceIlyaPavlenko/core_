import {AstBlockContainerType} from "@/core/configs/blocks/type";




export function container_config(data:AstBlockContainerType):AstBlockContainerType
{
    const core = setCore(data);

    return {
        core,
        behavior:setBehavior(data) ?? {emit:[]},
        initialState:setState(data) ?? {},
        props:setProps(data.props, core),
    }
}

function setCore(data:Pick<AstBlockContainerType, 'core'>)
{
    const {core} = data;

    return {
        ...core,
        layout:core.layout ?? 'DefaultLayout',
    }
}

function setBehavior(data:Pick<AstBlockContainerType, 'behavior'>)
{
    if (!data.behavior)
        return undefined;

    return {...data.behavior}
}

function setState(data:Pick<AstBlockContainerType, 'initialState'>)
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

function setProps(props: AstBlockContainerType['props'], core: AstBlockContainerType['core']): AstBlockContainerType['props'] {
    const base = props ? { ...props } : {};
    const layout = core.layout ?? 'DefaultLayout';

    switch (layout)
    {
        case 'FlexLayout':
        {
            return {
                ...base,
                display: 'flex',
                direction: base.direction ?? 'row',
                align: base.align ?? 'start',
                gap: base.gap ?? 0,
            };
        }

        case 'GridLayout':
        {
            return {
                ...base,
                display: 'grid',
                gap: base.gap ?? 0,
                // колонки / строки можно добавить позже
            };
        }

        case 'AbsoluteLayout':
        {
            return {
                ...base,
                position: base.position ?? 'absolute',
            };
        }

        case 'InlineLayout':
        {
            return {
                ...base,
                display: 'inline',
            };
        }

        case 'DefaultLayout':
        default: {
            return {
                ...base,
            };
        }
    }
}



