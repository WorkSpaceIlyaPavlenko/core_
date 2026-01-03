
import {ActionTypeTest} from "@/render/render/type";
import {onSignal, RuntimeButtonRegister} from "@ilyapavlenko/core";


export default function ButtonUI({data, action}:{data:RuntimeButtonRegister, action:ActionTypeTest}){

    const props= data.props
    const id= data.id

    const SvgCp = props?.svg;
    const className_ = props.className
        + (props?.disabled ? 'buttonDisable' : '')
        + (props?.importance ? (props.importance === 'main' && 'main') : '')
    return (
        <button
            className={`${className_.trim()}`}
            style={{
                display:`${!props.visible && 'none'}`,
                backgroundColor:`${props.backgroundStyle}`
            }}

            id={id}

            onClick={() => {
                if (action.events.includes('onClick'))
                    onSignal(action.signalId, 'onClick');
            }}
        >
            {(props.img || SvgCp) && 
                <div
                className={props.classNameImgWp}
                style={{
                    order:`${props.imgLocation === "left" && 3}`
                  }}>
                    {SvgCp && 
                        <SvgCp
                        className={props.classNameSvg}
                        />
                    }
                    {props.img && <img
                    src={props.img}
                    className={props.classNameImg}
                    width={props.imgWidth}
                    height={props.imgHeight}
                    alt="" />}
                </div>
            }
            {props.text && 
                <p>
                    {props.text}
                </p>
            } 
        </button>
    )
}