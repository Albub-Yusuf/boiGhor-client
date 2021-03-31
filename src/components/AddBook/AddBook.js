import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddBook = () => {

    const { register, handleSubmit, watch, errors } = useForm();

   const [status, setStatus] = useState(0);

    const [imageUrl, setImageUrl] = useState(null);

    const [visible, setVisible] = useState(0);

   

    const onSubmit = data => {

       if(status === 1) {

        const bookInfo = {
            name : data.name,
            writer: data.writer,
            price: data.price,
            imageURL: imageUrl
        }

        console.log(bookInfo);

        fetch('http://localhost:5000/addBook', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(bookInfo)
        })
        .then(res=>{
            console.log('data sends = ', res);
            setVisible(0);
            setStatus(0);
        })

       }else{
           alert('Please wait until the image is uploaded, Thanks!')
       }

    }


    const handleImageUpload = (event) => {

        setVisible(1);
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', 'd48b393f4f16b3633b01f37ce4e0c8b5');
        imageData.append('image', event.target.files[0]);

         axios.post('https://api.imgbb.com/1/upload', imageData)
         .then(async function (response) {
          setImageUrl(response.data.data.display_url);
          await setStatus(1);
          console.log('image stored');
        })
        .catch(function (error) {
          console.log(error);
        });

    }

    return (
        <div>
            <h3>Add Book</h3>


    <form onSubmit={handleSubmit(onSubmit)}>
      
      
      <input name="name" placeholder="Book Name" ref={register({ required: true })} />
      {errors.name && <span>This field is required</span>}

      <br/>

      <input name="writer" placeholder="writer Name" ref={register({ required: true })} />
      {errors.writer && <span>This field is required</span>}

      <br/>

      <input name="price" type="number" placeholder="price" ref={register({ required: true })} />
      {errors.price && <span>This field is required</span>}

      <br/>

      <input type="file" name="image" onChange={handleImageUpload} id=""/>

      <br/>
        { 
           visible ? status ? <p><span style={{color:'green'}}>image uploaded successfully... Please proceed now</span></p> 
            : <p><span style={{color:'red'}}>image uploading...</span></p> 
            :<p></p>
        }
      <br/>
      
      <input type="submit" value="Add Book" />
    </form>

        </div>
    );
};

export default AddBook;