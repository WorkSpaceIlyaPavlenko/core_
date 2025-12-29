import {createEvent, createStore} from "effector";
import {register, update} from "@/core/register/utils";
import {RuntimeContainerRegister} from "@/core/register/container_store/type";


export const registerContainer = createEvent<RuntimeContainerRegister>();

export const updateContainer = createEvent<{id:RuntimeContainerRegister['id']; patch:Partial<RuntimeContainerRegister>}>()

export const $containers = createStore<Map<RuntimeContainerRegister['id'], RuntimeContainerRegister>>(new Map())
    .on(registerContainer, register)
    .on(updateContainer, update)

