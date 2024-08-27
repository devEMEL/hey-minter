import React, { useEffect, useState } from 'react'

const MintSuccessNotification = ({ isVisible, setVisibility }) => {

    // const [fadeOut, setFadeOut] = useState(false);
    if (isVisible) {
        console.log("hi")
    };
    useEffect(() => {
        // If isVisible, After 5 seconds setVisibility(false);
        
        // if(isVisible) {
        //     setTimeout(() => {
        //         setVisibility(false)
        //     }, 3000);
        // }
    })
    return (
        // Design the popup
        <div
                        className="fixed z-40 overflow-y-auto top-0 w-full left-0 font-roboto"
                        id="modal"
                    >
            {
                isVisible  && (
                    <div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore cum error incidunt adipisci quisquam id voluptates eius, rem officiis voluptas ipsam beatae cumque molestiae similique doloribus, exercitationem nobis culpa provident.
                    </div>
                    <button onClick={() => {
                        setVisibility(false)
                    }}>close</button>
                    </div>
                )
            }
        </div>
    )
}

export default MintSuccessNotification;