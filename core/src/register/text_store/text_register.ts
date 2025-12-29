import {createEvent, createStore} from "effector";
import {RuntimeTextRegister} from "@/core/register/text_store/type";
import {register, update} from "@/core/register/utils";


export const registerText = createEvent<RuntimeTextRegister>();

export const updateText = createEvent<{id:string, patch:RuntimeTextRegister}>();

export const $texts = createStore<Map<RuntimeTextRegister['id'], RuntimeTextRegister>>(new Map())
    .on(registerText, register)
    .on(updateText, update)