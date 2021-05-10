
import React, { useEffect, useState } from 'react'
import Tesseract from 'tesseract.js';
import ImageWrapper from  '../components/ImageWrapper';
import axios from 'axios'
import TextWrapper from '../components/TextWrapper';

const DashBoard = () => {
  const pattern = /([0-9]{1,2})[:|°]([0-9]{1,2})[:|'|′]?([0-9]{1,2}(?:\.[0-9]+){0,1})?["|″]([N|S]),([0-9]{1,3})[:|°]([0-9]{1,2})[:|'|′]?([0-9]{1,2}(?:\.[0-9]+){0,1})?["|″]([E|W])/g;
  const [imageUrl, setImageUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [ text , setText] = useState(null)
  const [ coordinate ,setCordinate] = useState(null)

//convert image to text

  const convertImageToText = async () => {
    setLoading(true)
    const result = await Tesseract.recognize(imageUrl, 'eng'
      , { logger: m => console.log(m) }
    )
    // console.log(result);
    const found = result.data.text.match(pattern)
    setText(result.data.text)
    // console.log(found);
    setCordinate(found)
    setLoading(false)
  }

  useEffect(()=>{
     if(imageUrl != null){
       convertImageToText();
     }
  }, [imageUrl])

  // image upload 

  const uploadFile = async e => {
    setLoading(true)
    const formData = new FormData();
    formData.append('image', e.target.files[0])

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    const res = await axios.post("https://api.imgbb.com/1/upload?expiration=600&key=b9a345054c123a27e2117a9d1e9aaf1a", formData, config)
    // console.log(res);
    setImageUrl(res.data.data.url)
    setLoading(false)
  }


console.log(text)

  return (
    <div>
      <h1 className = 'text-center mb-5 text-primary mt-5'> Latitude Longitude Recognition</h1>
    
          <div class="container">
              <div class="row">
                  <div class="col-sm">
                      <ImageWrapper uploadFile={uploadFile} />
                      <img src={imageUrl} className= "img-fluid p-5"    />
                  </div>
                  <div class="col-sm">
                     {loading && <div class="spinner-border text-primary" role="status" style={{position:'relative' , top:'120px' , left:'220px'}}> </div>}
                       <TextWrapper coordinate={coordinate} />
                   </div>
              </div>
          </div>

    
    </div>
  )
}

export default DashBoard