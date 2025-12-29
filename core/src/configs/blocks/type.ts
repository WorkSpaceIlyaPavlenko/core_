import {NodeAstConfigType, NodeCoreStructType} from "@/core/configs/type";


//Container
export type LayoutType =
    | 'FlexLayout'
    | 'GridLayout'
    | 'AbsoluteLayout'
    | 'InlineLayout'
    | 'DefaultLayout'

export interface AstContainerCore extends NodeCoreStructType<unknown>
{
    kind:'container';
    layout?:LayoutType;
}

export interface AstContainerProps
{
    className?:string;

    display?: 'flex' | 'grid' | 'inline';
    direction?: 'row' | 'column';
    align?: 'start' | 'center' | 'end';
    gap?: number;
    position?: 'absolute' | 'relative' | 'fixed' | 'static' | 'sticky';
}

export interface AstBlockContainerType extends NodeAstConfigType<unknown>
{
    core:AstContainerCore;
    props:AstContainerProps;
}
