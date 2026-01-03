import z from "zod";
import Types from "@/core/types/types";


export function isObject (item:unknown)
{
    return (typeof item === 'object' && item !== null)
}
const deferRegister = setTimeout(() =>{

},5000)

export const UtilsDynamicNodeCore = z.object({
    id: z.string(),
    kind: z.string(),
})

const UtilsIsDynamicCore = z.object({
    id: z.string(),
    kind: z.string(),
    owner: UtilsDynamicNodeCore,
})
const UtilsIsNodeCore = z.object({
    id: z.string(),
    kind: z.string(),
    owner: z.string().nullable().optional(),
    children: z.array(z.unknown()).optional(),

    //container
    layout: z.string().optional(),
});

const UtilsIsNodeInitialState = z.object({
    visible: z.boolean().optional(),
    disabled: z.boolean().optional(),
    active: z.boolean().optional(),
    loading: z.boolean().optional(),
});

const UtilsSignalUISchema = z.object({
    kind: z.literal(Types.Events.Kind.ui),
    event: z.enum(Object.values(Types.Events.UI)),
})

const UtilsSignalSysSchema = z.object({
    kind: z.literal(Types.Events.Kind.system),
    event: z.enum(Object.values(Types.Events.Systems)),
})

export const UtilsSignalSchema = z.discriminatedUnion('kind', [
    UtilsSignalUISchema,
    UtilsSignalSysSchema,
]);

const UtilsEmitSchema = z.object({
    targetId: z.string(),
    elKind: z.string(),
    signal: UtilsSignalSchema,
    payload:z.unknown().optional()
})

const UtilsIsBehaviorSchema = z.object({
    emit:z.array(UtilsEmitSchema),
});

const Utils = {
    UtilsIsObject: isObject,
    UtilsIsNodeCoreSchema:UtilsIsNodeCore,
    UtilsIsNodeInitialStateSchema: UtilsIsNodeInitialState,
    UtilsSignalUISchema,
    UtilsSignalSysSchema,
    UtilsSignalSchema,
    UtilsEmitSchema,
    UtilsIsBehaviorSchema,
    UtilsDynamicNodeCore,
    UtilsIsDynamicCore,

}

export default Utils;