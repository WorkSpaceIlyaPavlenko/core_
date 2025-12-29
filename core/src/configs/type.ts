import { z } from 'zod';
import {UtilsDynamicNodeCore, UtilsSignalSchema} from "@/core/schemas/utils/typeof";
/**
 * Core declarative node of the Cubro scene graph.
 *
 * This type defines the minimal universal structure for all nodes
 * used in the configuration (AST) layer of the system.
 *
 * IMPORTANT:
 * - This structure is **declarative only**.
 * - It must NOT contain any runtime state, DOM references, effects, or subscriptions.
 * - It is used as an input for Engine, diffing, and scene rendering.
 *
 * @typeParam T - Type of child nodes.
 */

export type OwnerDynamicParentType =  z.infer<typeof UtilsDynamicNodeCore>

export interface NodeCoreStructType<T = unknown>
{
    /**
     * Stable unique identifier of the node.
     */
    id: string;

    /**
     * Semantic kind of the node.
     */
    kind: string;

    /**
     * Logical owner or contextual group of the node.
     */
    owner?: OwnerDynamicParentType | string | null;

    /**
     * Declarative child nodes.
     */
    children?: T[];

};

//engine - entry data (from config)
export interface NodeAstStateType 
{
    visible?: boolean;
    disabled?: boolean;
    active?: boolean;
    loading?: boolean;
}


export interface NodeAstBehaviorType<T>
{
    emit:Array<SignalContract<T>>
}

export interface NodeAstConfigType<T = unknown, P = unknown>
{
    core:NodeCoreStructType<T>;
    initialState?:NodeAstStateType;
    behavior?:NodeAstBehaviorType<unknown>;
    props?:P
}

export type UiEventType =
    | 'onClick'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'onFocus'
    | 'onBlur'
    | 'onKeyDown'
    | 'onKeyUp';

//latter
export type SystemSignalType =
    | 'open'
    | 'close'
    | 'setVisible'
    | 'setDisabled'
    | 'setActive'
    | 'setLoading';

export type SignalUIType = { kind: 'ui'; event: UiEventType };

export type SignalSysType = { kind: 'system'; event: SystemSignalType }

export type SignalType = z.infer<typeof UtilsSignalSchema>;

export interface SignalContract<T = unknown>
{
    targetId:string;
    elKind:string;
    signal:SignalType;
    payload?:T
}



