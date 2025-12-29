
import Types from "@/core/types/types";
import {z} from "zod";


const AllKindsSchema = z.enum(Object.values(Types.Entities.Kind))

export type AllKindsSchemaType = z.infer<typeof AllKindsSchema>

const ButtonKindSchema =  z.enum
([
    Types.Entities.Kind.button,
    Types.Entities.Kind.link
])

const TextKindSchema =  z.literal(Types.Entities.Kind.text);

const ElementsKindSchema =  z.enum
([
    Types.Entities.Kind.button,
    Types.Entities.Kind.link,
    Types.Entities.Kind.text
])

const BlocksKindSchema =  z.enum
([
    Types.Entities.Kind.container,
])

const ContainerKindSchema =  z.literal(Types.Entities.Kind.container);

const KindSchemas = {
    EntitiesKindButton:ButtonKindSchema,
    EntitiesKindText:TextKindSchema,
    EntitiesKindContainer:ContainerKindSchema,
    EntitiesKindElements:ElementsKindSchema,
    EntitiesKindBlocks:BlocksKindSchema,
    EntitiesKindAll:AllKindsSchema,
};

export default KindSchemas;