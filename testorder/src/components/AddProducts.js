import React, { useState } from 'react'
import { storage, db } from '../config/Config'

export const AddProducts = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg'];

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('');
        }
        else {
            setProductImg(null);
            setError('Please select a valid image type png or jpeg');
        }
    }

    //add product
    const addProduct = (e) => {
        e.preventDefault();
        console.log(productName,productPrice,productImg);
        //storing the image
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => {
            setError(err.message)
        }, () => {
            //getting product url and if success then storing the product in db
            storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                db.collection('Products').add({
                    ProductName: productName,
                    ProductPrice: Number(productPrice),
                    ProductImg: url
                }).then(() => {
                    setProductName('');
                    setProductPrice(0);
                    setProductImg('');
                    setError('');
                    document.getElementById('file').value = '';
                }).catch(err => setError(error.message));
            })
        })
    }

    return (
        <div className='container'>
            <br />
            <h2>ADD PRODUCTS</h2>
            <hr />
            <form autoComplete="off" className='form-group' onSubmit={addProduct}>
                <label htmlFor="product-name">Product Name</label>
                <br />
                <input type="text" className='form-control' required
                    onChange={(e) => setProductName(e.target.value)} value={productName} />
                <label htmlFor="product-price">Product Price</label>
                <br />
                <input type="number" className='form-control' required
                    onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                <br />
                <label htmlFor="product-img">Product Image</label>
                <br />
                <input type="file" className='form-control' onChange={productImgHandler} id='file' />
                <br />
                <button type='submit' className='btn btn-success btn-md mybtn'>ADD</button>
            </form>
            {error && <span>{error}</span>}
        </div>
    )
}
