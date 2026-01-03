import {Engine, NodeAstConfigType} from "@ilyapavlenko/core";
import NodeTransformer from "@/render/transformer/NodeTransformer";
import * as React from "react";


export function create(data:NodeAstConfigType):React.FC
{
    const engine = new Engine();

    //запускаем парс ast дерева
    engine.run(data);

    const {id, kind} = data.core;

    const cp: React.FC = () =>
        React.createElement(NodeTransformer, { id, kind });

    return cp;
}

export function dynamic(data:NodeAstConfigType | Array<NodeAstConfigType>)
{
    const engine = new Engine();
    engine.dynamic(data);
}
