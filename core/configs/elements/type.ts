import { StaticImageData } from "next/image";
import {NodeAstConfigType, NodeAstStateType, NodeCoreStructType} from "../type";
import {ElementType, FunctionComponent, SVGProps} from "react";

//Button
export interface AstButtonCore extends NodeCoreStructType<never>
{
    kind:'button' | 'link'
}

//TODO: убрать все рантайм сущоности {*this} из ast создать сылочный стор для них
export interface AstButtonProps
{
    className?:string;
    classNameImgWp?:string;
    classNameImg?:string;
    classNameSvg?:string;

    importance?:'default' | 'main' | 'supplementary';
    backgroundStyle?:string;

    text?: string;
    img?: string | StaticImageData;//*this
    svg?:FunctionComponent<SVGProps<SVGSVGElement>>;//*this

    imgLocation?: "left" | "right";
    imgWidth?:number;
    imgHeight?:number;
}
export interface AstElementButtonType extends NodeAstConfigType
{
    core:AstButtonCore;
    props:AstButtonProps;
}


//Text
export interface AstTextCore extends NodeCoreStructType
{
    kind:'text';
}

export interface AstTextProps
{
    className?:string

    text?:string | number;

    animateTyping?:boolean;
    typingSpeed?:number;
    startDelay?:number;
}

export  interface AstTextInitialState extends NodeAstStateType
{
    tag:ElementType;
}

export interface AstElementTextType extends NodeAstConfigType
{
    core:AstTextCore;
    initialState:AstTextInitialState;
    props:AstTextProps;
}