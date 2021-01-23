import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import ProductCard from './ProductCard';
import {
  fetchAsyncGetNews,
  selectNews
} from "./financialnewsSlice"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const ProductList = () => {
  const classes = useStyles();
  const products = useSelector(selectNews);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.localJWT) {
        await dispatch(fetchAsyncGetNews());
      }
    };
    fetchBootLoader();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              lg={6}
              md={6}
              xs={12}
            >
              <ProductCard
                className={classes.productCard}
                products={products.filter(product => product.publisher === 1)}
                publisher='Bloomberg'
                media='/static/images/avatars/bloomberg_image.png'
              />
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              xs={12}
            >
              <ProductCard
                className={classes.productCard}
                products={products.filter(product => product.publisher === 2)}
                publisher='Reuters'
                media='/static/images/avatars/Reuters_logo_300.png'
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
        </Box>
      </Container>
    </Page>
  );
};

export default ProductList;
