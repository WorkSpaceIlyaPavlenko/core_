
import {createStore, createEvent} from 'effector'
import {RuntimeButtonRegister} from "@/core/register/button_store/type";
import {register, update} from "@/core/register/utils";


export const registerButton = createEvent<RuntimeButtonRegister>();

export const updateButton = createEvent<{id:RuntimeButtonRegister['id']; patch:Partial<RuntimeButtonRegister>}>()

export const $buttons = createStore<Map<RuntimeButtonRegister['id'], RuntimeButtonRegister>>(new Map())
    .on(registerButton, register)
    .on(updateButton, update)
