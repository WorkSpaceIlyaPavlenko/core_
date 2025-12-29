import Validator from "@/core/schemas/validator";
import {NodeAstConfigType} from "@/core/configs/type";
import {ZodSafeParseError} from "zod";
import {AllKindsSchemaType} from "@/core/schemas/entities/kind";
import Types from "@/core/types/types";
import {RuntimeButtonProps} from "@/core/register/button_store/type";
import {RuntimeContainerProps} from "@/core/register/container_store/type";
import {RuntimeTextProps} from "@/core/register/text_store/type";


export type AllRuntimeProps =
    | RuntimeButtonProps
    | RuntimeContainerProps
    | RuntimeTextProps


export type AllRuntimePropsFn = (data:unknown) => boolean;

export class ValidationProps
{
    private schemasByKind = new Map<AllKindsSchemaType, AllRuntimePropsFn>
    ([
        [
            Types.Entities.Kind.button,
            (props) => Validator.RuntimePropsButtonSchema.safeParse(props).success
        ],
        [
            Types.Entities.Kind.link,
            (props) => Validator.RuntimePropsButtonSchema.safeParse(props).success
        ],
        [
            Types.Entities.Kind.text,
            (props) => Validator.RuntimePropsTextSchema.safeParse(props).success
        ],
        [
            Types.Entities.Kind.container,
            (props) => Validator.RuntimePropsContainerSchema.safeParse(props).success
        ]

    ])

    constructor() {};


    public validKind(kind:string)
    {
        const parse = Validator.EntitiesKindAll.safeParse(kind);

         if (parse.success)
             return true;
         else
         {
             //TODO:номарльный logger завести
             console.error(parse.error);
             return false;
         }
    }

    public validRuntimePropsOfKind(kind:string, id:string | undefined, props:AllRuntimeProps | undefined)
    {
        if (!id)
        {
            console.warn(`Unknown runtime item`)
            return false;
        }

        if (!props)
        {
            console.warn(`Empty props for item ${id}. Skip register`);
            return false;
        }

        const fn = this.schemasByKind.get(kind);

        if (!fn)
        {
            console.error(`Undefined kind - ${kind}`);
            return false;
        }

        const parse = fn(props);

        if (parse)
            return true;

        else
        {
            console.error(`Not correct props structure for Kind: ${kind}`);
            return false;
        }

    }

    public isDynamic(item:unknown)
    {
        const parse = Validator.UtilsIsDynamicCore.safeParse(item);

        if (parse.success)
            return true;
        else
        {
            console.error(parse.error);
            return false;
        }
    };

    public isDynamicCore(item:unknown)
    {
        const parse = Validator.UtilsDynamicNodeCore.safeParse(item);

        if (parse.success)
            return parse.data;
        else
        {
            console.error(parse.error);
            return false;
        }
    }

    //TODO:ослабить валидацию для всего кроме core иничае z перезатрет
    public castToNodeAstConfig(item:unknown):NodeAstConfigType
    {
        if (!Validator.UtilsIsObject(item))
            throw Error ('Not success format node config');

        if (!('core' in item))
            throw Error ('Core is missing node config');

        const parsedCore = Validator.UtilsIsNodeCoreSchema.safeParse(item.core);

        if (!parsedCore.success)
            this.throwError(parsedCore);

        let parsedInitialState= undefined;
        if ('initialState' in item)
            parsedInitialState = Validator.UtilsIsNodeInitialStateSchema.safeParse(item.initialState);

        if (parsedInitialState && !parsedInitialState.success)
            this.throwError(parsedInitialState);

        let parsedBehavior = undefined;
        if ('behavior' in item)
            parsedBehavior = Validator.UtilsIsBehaviorSchema.safeParse(item.behavior);

        if (parsedBehavior && !parsedBehavior.success)
            this.throwError(parsedBehavior);

        let parseProps = undefined;
        if ('props'in item)
            parseProps = item.props;

        return {
            core:parsedCore.data,
            initialState:parsedInitialState?.data ?? undefined,
            behavior:parsedBehavior?.data ?? undefined,
            props:parseProps ?? undefined
        }

    }

    private throwError<E>(errs:ZodSafeParseError<E>):never
    {
        throw Error ('Not correct struct for core: ' +
            errs.error.issues.map(i => i.path.join('.') + ': ' + i.message).join(', ')
        )
    }

    public blocksKind = (kind:string) => Validator.EntitiesKindContainer.safeParse(kind).success;
}