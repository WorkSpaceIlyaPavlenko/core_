import Types from "@/core/types/types";
import z from "zod";

export const EventActionsUI = z.enum(Object.values(Types.Events.UI))

export const EventActionsSys = z.enum(Object.values(Types.Events.Systems))

const EventActionsSchemas = {
    EventActionsUI,
    EventActionsSys,

}

export default EventActionsSchemas;