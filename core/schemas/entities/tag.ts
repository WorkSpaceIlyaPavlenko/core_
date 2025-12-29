import z from "zod";
import Types from "@/core/types/types";


const TextTagSchema = z.enum(Object.values(Types.Entities.Tag.Text_));

const TagSchemas = {
    TextTagSchema
}

export default TagSchemas;