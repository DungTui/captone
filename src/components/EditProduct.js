import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { storage, db } from '../config/Config'

export default class EditProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ProductID: '',
            ProductName: '',
            ProductPrice: '',
            ProductImg: ''
        };
        this.state = { error: '' };
    }

    componentDidMount() {
        const ref = db.collection('Products').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                const product = doc.data();
                this.setState({
                    ProductID: doc.id,
                    ProductName: product.ProductName,
                    ProductPrice: product.ProductPrice,
                    ProductImg: product.ProductImg
                });
            } else {
                console.log("No such document!");
            }
        });
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({ product: state });
    }
    productImgHandler = (e) => {
        const types = ['image/png', 'image/jpeg'];
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            this.setState({
                ProductImg: selectedFile
            });
            this.setState({
                error: ''
            })
        }
        else {
            this.setState({
                ProductImg: null
            });
            this.setState({
                error: 'Please select a valid image type png or jpeg'
            });
        }
    }
    onSubmit = (e) => {
        e.preventDefault();

        const { ProductName, ProductPrice, ProductImg } = this.state;

        const uploadTask = storage.ref(`product-images/${ProductImg.name}`).put(ProductImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => {
            this.setState({
                error: err.message
            })
        }, () => {
            //getting product url and if success then storing the product in db
            storage.ref('product-images').child(ProductImg.name).getDownloadURL().then(url => {
                const updateRef = db.collection('Products').doc(this.state.ProductID);
                updateRef.set({
                    ProductName,
                    ProductPrice,
                    ProductImg: url
                }).then((docRef) => {
                    this.setState({
                        ProductID: '',
                        ProductName: '',
                        ProductPrice: '',
                        ProductImg: ''
                    });
                    this.props.history.push("/productmanager")
                    window.location.reload()
                })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            })
        })
    }
    render() {
        return (
            <div>
                <form className='form-group' onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label for="ProductName">Product Name:</label>
                        <input type="text" className="form-control" name="ProductName"
                            value={this.state.ProductName} onChange={this.onChange} placeholder="ProductName" />
                    </div>
                    <div className="form-group">
                        <label for="ProductPrice">Product Price:</label>
                        <input type="text" className="form-control" name="ProductPrice"
                            value={this.state.ProductPrice} onChange={this.onChange} placeholder="ProductPrice" />
                    </div>
                    <div className="form-group">
                        <label for="ProductImg">Product Img:</label>
                        <input type="file" className="form-control" name="ProductImg"
                            onChange={this.productImgHandler} id='file' />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        )
    }
}
