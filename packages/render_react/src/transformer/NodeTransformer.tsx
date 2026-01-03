
import {Validator} from "@ilyapavlenko/core";
import LeafIndex from "@/render/transformer/LeafIndex";
import CompositeIndex from "@/render/transformer/CompositeIndex";
import {IdKindProps} from "@/render/transformer/type";

export default function NodeTransformer({id, kind}: IdKindProps): React.ReactElement
{

    if (Validator.EntitiesKindElements.safeParse(kind).success)
        return <LeafIndex id={id} kind={kind} />;

    if (Validator.EntitiesKindBlocks.safeParse(kind).success)
        return <CompositeIndex id={id} kind={kind}/>

    throw Error(`Unknown kind "${kind}"`);

}

