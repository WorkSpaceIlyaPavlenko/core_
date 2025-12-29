
export type SystemSignalType =
    | 'open'
    | 'close'
    | 'setVisible'
    | 'setDisabled'
    | 'setActive'
    | 'setLoading';


const Events = {
    UI:{
        onClick:'onClick',
        onMouseEnter:'onMouseEnter',
        onMouseLeave:'onMouseLeave',
        onFocus: 'onFocus',
        onBlur:'onBlur',
        onKeyDown:'onKeyDown',
        onKeyUp:'onKeyUp',
    },

    Systems:{
        open:'open',
        close:'close',
        setVisible:'setVisible',
        setDisabled:'setDisabled',
        setActive:'setActive',
        setLoading:'setLoading',
    },

    Kind:{
        ui:'ui',
        system:'system',
    }

};


export default Events;