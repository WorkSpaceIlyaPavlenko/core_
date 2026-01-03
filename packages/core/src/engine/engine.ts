

import {
    NodeAstConfigType,
    NodeCoreStructType, OwnerDynamicParentType
} from "../configs/type";
import {registerButton} from "@/core/register/button_store/button_register";
import PropsConverter from "@/core/engine/converters/props_converter";
import SignalConverter from "@/core/engine/converters/signal_converter";
import Validator from "@/core/schemas/validator";
import AppSignalRegister from "@/core/signals/signal_register";
import {registerText} from "@/core/register/text_store/text_register";
import {RuntimeTextRegister} from "@/core/register/text_store/type";
import {RuntimeButtonRegister} from "@/core/register/button_store/type";
import {ZodSafeParseError} from "zod";
import {registerContainer} from "@/core/register/container_store/container_register";
import {RuntimeContainerRegister} from "@/core/register/container_store/type";
import {addContainerChildren} from "@/core/register/container_store/container_childs_register";
import {RuntimeChildrenId} from "@/core/engine/type";
import {AllRuntimeProps, ValidationProps} from "@/core/engine/validation/validation_props";
import {StoreProvider} from "@/core/engine/providers/store_provider";



export default class Engine
{
    private inRun = new Set<NodeCoreStructType['id']>([]);
    private childrenIds = new Map<string, Array<RuntimeChildrenId>>([]);
    private validator = new ValidationProps();
    private provider = new StoreProvider();


    constructor(){};

    public run(config:NodeAstConfigType)
    {
        this.parseNode(config);
    }

    public dynamic(data:NodeAstConfigType | Array<NodeAstConfigType>)
    {
        if (Array.isArray(data))
            for (const item of data)
            {
                if(this.validator.isDynamic(item.core))
                {
                    this.run(item);
                    this.ownerByChildren(item.core)
                }
            }
        else
            if(this.validator.isDynamic(data.core))
            {
                this.run(data);
                this.ownerByChildren(data.core)
            }
    }

    private storeProvider({core, initialState, props}:NodeAstConfigType)
    {
        const {id, kind}  = core
        const converter = new PropsConverter(initialState, props, core);

        if (!this.validator.validKind(kind))
            return;

        const propsRuntime = converter.getProps();

        if (!propsRuntime || !this.validator.validRuntimePropsOfKind(kind, propsRuntime?.id, propsRuntime?.props))
            return;

        this.provider.provide(kind, propsRuntime);
        this.childrenProvide({id, kind});
    }

    private signalsProvider({core, behavior}:NodeAstConfigType)
    {
        if (!behavior)
            return;

        const converter = new SignalConverter(core, behavior);
        const runtimeSignal = converter.getSignals();

        if (!runtimeSignal)
            return;

        AppSignalRegister.setSignal(core, runtimeSignal);
    }

    private parseNode(config:NodeAstConfigType)
    {
        const {core} = config;

        if (this.inRun.has(core.id))
            throw new Error(`Duplicate or cyclic node id: ${core.id}`);

        this.inRun.add(core.id);

        if (this.hasChild(core) && Array.isArray(core.children))
        {
            const ids:Array<RuntimeChildrenId> = [];

            for (let i = 0; i < core.children.length; i++)
            {
                const child= this.validator.castToNodeAstConfig(core.children[i]);

                const {id, kind} = child.core

                ids.push({id, kind});
                this.parseNode(child);
            }

            if (ids.length)
                this.setChildrenIds(core.id, ids);
        }

        this.storeProvider(config);
        this.signalsProvider(config);
    }

    private hasChild(core:NodeCoreStructType)
    {
        return !!core.children?.length
    }

    private getChildrenIds(id:string)
    {
        if(this.childrenIds.has(id))
            return this.childrenIds.get(id)!;

        return [];
    }

    private ownerByChildren(core:NodeCoreStructType)
    {
        const parse = this.validator.isDynamicCore(core.owner);
        if (parse)
        {
            this.setChildrenIds(parse.id, [{id:core.id, kind:core.kind}]);
            this.childrenProvide(parse)
        }
    }

    private childrenProvide({id, kind}:OwnerDynamicParentType)
    {
        if (!this.validator.blocksKind(kind))
            return;

        const children = this.getChildrenIds(id);
        if (!children?.length)
            return;

        this.provider.childIdsProvide(kind, {id, children})
    }

    private setChildrenIds(id: string, children_ids: RuntimeChildrenId[])
    {
        if (!children_ids.length)
            return;

        const prev = this.childrenIds.get(id) ?? [];

        const map = new Map<string, RuntimeChildrenId>();

        for (const c of [...prev, ...children_ids])
        {
            map.set(c.id, c);
        }

        this.childrenIds.set(id, [...map.values()]);
    }

}
