import React, { useEffect } from "react";
import { Grid } from '@material-ui/core';
import Product from "./Product/Product";
import useStyles from './styles';
import noResImg from '../../assets/nores.png';


const Products = ({ products, onAddToCart, fetchProducts }) => {

  const classes = useStyles();
  useEffect(() => {
    fetchInitialProducts();

  }, [])

  const fetchInitialProducts = () => {
    fetchProducts();
  }





  if (products.length == 0) {
    return (<div>loading..</div>
    )
  }

  let prod = Object.values(products)[0].id === "noResults" ? <div style={{ marginTop: 100 }}>
    <img src={noResImg} alt='no res' height={300} width={300} />
  </div> :
    products.map((product) => (
      <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} >
        <Product product={product} onAddToCart={onAddToCart} />
      </Grid>
    ));



  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify='center' spacing={8}>
        {prod}
      </Grid>
    </main >
  );
}

export default Products;
