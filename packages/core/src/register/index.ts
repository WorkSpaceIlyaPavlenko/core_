import Types from "@/core/types/types";
import {registerButton} from "@/core/register/button_store/button_register";
import {registerText} from "@/core/register/text_store/text_register";
import {RuntimeButtonRegister} from "@/core/register/button_store/type";
import {RuntimeTextRegister} from "@/core/register/text_store/type";
import {AllKindsSchemaType} from "@/core/schemas/entities/kind";
import {registerContainer} from "@/core/register/container_store/container_register";
import {RuntimeContainerChildren, RuntimeContainerRegister} from "@/core/register/container_store/type";
import {addContainerChildren} from "@/core/register/container_store/container_childs_register";


export type RuntimeRegister =
    | RuntimeButtonRegister
    | RuntimeTextRegister
    | RuntimeContainerRegister

export type RegisterHandler = (data: RuntimeRegister) => void;

export type StoresRegistersType = Map<AllKindsSchemaType, RegisterHandler>;

export const StoresRegisters = new Map<AllKindsSchemaType, RegisterHandler>
([
    [Types.Entities.Kind.button,(data) => registerButton(data as RuntimeButtonRegister)],
    [Types.Entities.Kind.link, (data) => registerButton(data as RuntimeButtonRegister)],
    [Types.Entities.Kind.text, (data) => registerText(data as RuntimeTextRegister)],
    [Types.Entities.Kind.container, (data) => registerContainer(data as RuntimeContainerRegister)],
])

export type RuntimeChildrenRegister =
    | RuntimeContainerChildren

export type AddChildrenType = (data:RuntimeChildrenRegister) => void;

export const childrenStoresRegisters = new Map<AllKindsSchemaType, AddChildrenType>
([
    [Types.Entities.Kind.container,(data) => addContainerChildren(data as RuntimeContainerChildren)],
])