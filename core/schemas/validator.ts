
import EventActionsSchemas from "@/core/schemas/events/events_actions";
import KindSchemas from "@/core/schemas/entities/kind";
import EventKindSchemas from "@/core/schemas/events/events_kind";
import TagSchemas from "@/core/schemas/entities/tag";
import Utils from "@/core/schemas/utils/typeof";
import PropsSchema from "@/core/schemas/entities/props";


const Validator = {
    ...KindSchemas,
    ...TagSchemas,
    ...EventActionsSchemas,
    ...EventKindSchemas,
    ...Utils,
    ...PropsSchema,
}

export default Validator;