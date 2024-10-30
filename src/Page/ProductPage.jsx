import {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import FourOf4 from './FourOf4'
function ProductPage() {
  const [product,setProducts] = useState([]);
  // console.log(useParams());
  const {productID} = useParams();
  // console.log(productID);
  useEffect(() =>{
    fetch("/iphone.json")
    .then((res) => res.json())
    .then ((data) => {
        const productList = data;
        // console.log(productList);
        const singleProduct = productList.filter((product) => product.product_url === productID
        );
        setProducts(singleProduct);
    }).catch(() => console.log("Error: unable to fetch!!"));
  },[productID])

  console.log('from product page',product);
  if(product.length){
  return (
    <div>
        <section className="internal-page-wrapper top-100">
          <div className="container">
            {product?.map((product) => {
              return(
                <div key={product.product_id}>
                  <div className="row justify-content-center text-center bottom-50">
                    <div className="col-12 mt-5 pt-5">
                      <div className="title-wraper font-weight-bold">{product.product_name}</div>
                      <div className="brief-description">{product.product_brief_description}</div>
                    </div>
                  </div>

                  <div className="row justify-content-center text-center product-holder h-100">
                    <div className={`col-sm-12 col-md-6 my-auto`}>
                      <div className="starting-price">
                        {`Starting at ${product.starting_price}`}
                      </div>
                      <div className="monthly-price">{product.price_range}</div>
                      <div className="product-details">{product.product_description}</div>
                    </div>

                    <div className={`col-sm-12 col-md-6`}>
                      <div className="prodict-image">
                        <img src={product.product_img} />
                      </div>
                    </div>
                  </div>
                </div>
              );
              return productDiv;
            })}
          </div>
        </section>
    </div>
  )
}
else{
  return <FourOf4/>
}
}

export default ProductPage
