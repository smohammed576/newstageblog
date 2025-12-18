import { useState } from "react";

function MovieCastTab({data}){
    const [showAll, setShowAll] = useState(false);

    return (
         <div className="film__tabs--cast">
            {
                data.length < 30 || showAll ?
                data.map((item, index) => 
                    <a href={route('person.show', item.id)} title={item.character} key={index} className="film__tabs--cast-item">
                        {item.name}
                    </a>
                ) : 
                Array.from({length: 30}, (_, index) => 
                    index == 29 ? 
                    <button key={index} onClick={() => setShowAll(true)} className="film__tabs--cast-item">
                        Show All...
                    </button>
                    :
                    <a href={route('person.show', data[index].id)} title={data[index].character} key={index} className="film__tabs--cast-item">
                        {data[index].name}
                    </a>
                )
            }
        </div>
    );
}

export default MovieCastTab;