import Types from "@/core/types/types";
import z from "zod";


export const EventKindUI = z.literal(Types.Events.Kind.ui)

export const EventKindSys = z.literal(Types.Events.Kind.ui)

const EventKindSchemas = {
    EventKindUI,
    EventKindSys,

}

export default EventKindSchemas;