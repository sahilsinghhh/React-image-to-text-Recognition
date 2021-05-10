import React from 'react'

const ImageWrapper = (props) => {
    return (
        <div>
            <form>
                <input type = 'file' name = 'image' onChange ={e=> props.uploadFile(e)} />
            </form>
        </div>
    )
}

export default ImageWrapper
