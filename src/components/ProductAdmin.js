import React, { useContext } from 'react'
import { ProductsContext } from '../global/ProductsContext'
import { db } from '../config/Config'
import { Link } from 'react-router-dom';

export const ProductAdmin = () => {

    const { products } = useContext(ProductsContext);
    console.log(products);

    const onChangeDelete = (id) => {
        db.collection('Products').doc(id).delete().then(() => {
            this.props.history.push("/")
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    return (
        <div>
            <div className='products-container'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {products.map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.ProductImg} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                            Price {product.ProductPrice}.00 $
                        </div>
                        <div>
                        <Link to={`/editproduct/${product.ProductID}`} class="btn btn-success">Edit</Link>&nbsp;
                        <button onClick={onChangeDelete.bind(this, product.ProductID)} class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
