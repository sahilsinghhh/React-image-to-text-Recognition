import React from 'react'

const TextArea = ({coordinate}) => {
    return (
        <div>
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title text-primary">Coordinates</h5>
                    <p class="card-text">{coordinate}</p>
                </div>
            </div>
        </div>
    )
}

export default TextArea
