import {createEvent, createStore} from "effector";
import {RuntimeContainerChildren, RuntimeContainerRegister} from "@/core/register/container_store/type";
import {RuntimeChildrenId} from "@/core/engine/type";
import {removeChildren, updateChildren} from "@/core/register/utils";


export const addContainerChildren = createEvent<RuntimeContainerChildren>();

export const deleteChildren = createEvent<RuntimeContainerChildren>();

export const $container_children = createStore<Map<RuntimeContainerRegister['id'], Array<RuntimeChildrenId>>>(new Map())
    .on(addContainerChildren, updateChildren)
    .on(deleteChildren, removeChildren)