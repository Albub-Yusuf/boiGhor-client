import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideNav from '../SideNav/SideNav';
import './AddBook.css';

const AddBook = () => {

    const { register, handleSubmit, watch, errors } = useForm();

    const [status, setStatus] = useState(0);

    const [imageUrl, setImageUrl] = useState(null);

    const [visible, setVisible] = useState(0);

    const [spinner, setSpinner] = useState(null);

    const [spinnerdataUpload, setSpinnerdataUpload] = useState(null);







    const onSubmit = data => {

        if (status === 1) {

            const bookInfo = {
                name: data.name,
                writer: data.writer,
                price: data.price,
                imageURL: imageUrl
            }

            setSpinnerdataUpload(1);
            fetch('https://mighty-fjord-75782.herokuapp.com/addBook', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(bookInfo)
            })
                .then(res => {
                    setVisible(0);
                    setStatus(0);
                    setSpinnerdataUpload(null);
                })

        } else {
            alert('Please wait until the image is uploaded, Thanks!')
        }

    }


    const handleImageUpload = (event) => {

        setSpinner(1);
        setVisible(1);
        const imageData = new FormData();
        imageData.set('key', 'd48b393f4f16b3633b01f37ce4e0c8b5');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(async function (response) {
                setImageUrl(response.data.data.display_url);
                await setStatus(1);
                setSpinner(null);
            })
            .catch(function (error) {
                console.log(error);
                alert(error, 'Please try again with different image')
            });

    }

    return (

        <div>
            <div className="Adminwrapper" style={{ display: 'flex' }}>
                <div className="snav"><SideNav></SideNav></div>
                <div className="content" style={{ background: '#fff', width: '100%', minHeight: '100%' }}>

                    <div style={{ width: '90%', margin: '10px', borderRadius: '5px', boxShadow: '5px 5px 10px lightgrey', padding: '15px', background: '#fff' }} className="topPanel">
                        <h3>Add Book</h3>
                    </div>


                    {/* code goes here */}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ width: '90%', margin: '40px 10px', borderRadius: '5px', boxShadow: '5px 5px 10px lightgrey', padding: '15px', background: '#fff' }} className="mainPanel">


                            <div style={{ display: 'flex' }}>
                                <div className="input-wrapper">
                                    <label><strong>Book Name</strong></label><br />
                                    <input className="inputStyle" name="name" placeholder="Book Name" ref={register({ required: true })} />
                                    {errors.name && <span>This field is required</span>}
                                </div>

                                <div className="input-wrapper">
                                    <label><strong>Author Name</strong></label><br />
                                    <input className="inputStyle" name="writer" placeholder="Author Name" ref={register({ required: true })} />
                                    {errors.writer && <span>This field is required</span>}
                                </div>
                            </div>



                            <div style={{ display: 'flex' }}>
                                <div className="input-wrapper">
                                    <label><strong>Add Price</strong></label><br />
                                    <input className="inputStyle" name="price" type="number" placeholder="price" ref={register({ required: true })} />
                                    {errors.price && <span>This field is required</span>}
                                </div>

                                <br />
                                <div className="input-wrapper">
                                    <label><strong>Add Cover Photo</strong></label><br />
                                    <input className="inputStyle" type="file" name="image" onChange={handleImageUpload} id="" />
                                    <br />

                                    {
                                        visible ? status ? <p><span style={{ color: 'green' }}>image uploaded successfully... Please proceed now</span></p>





                                            : <p><span style={{ color: 'red' }}>image uploading...</span></p>
                                            : <p></p>
                                    }
                                    {
                                        spinner &&

                                        <Spinner style={{ margin: '0px auto' }} animation="grow" role="status" variant="warning">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>

                                    }
                                    <br />
                                </div>
                            </div>

                            {
                                spinnerdataUpload &&

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Spinner style={{ margin: '0px auto', textAlign: 'center' }} animation="grow" role="status" variant="warning">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                    <span style={{ color: 'red' }}>Uploading...</span>
                                </div>

                            }

                        </div>

                        <div style={{ width: '90%', margin: '10px', borderRadius: '5px', padding: '15px', display: 'flex', justifyContent: 'flex-end' }} className="topPanel">
                            <input className="btn-add-to-cart" style={{ padding: '15px', width: '80px', borderRadius: '5px' }} type="submit" value="Save" />

                        </div>
                    </form>


                </div>
            </div>
        </div>







    );
};

export default AddBook;