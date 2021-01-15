import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import ProductCard from './ProductCard';
// import data from './data';
import {
  fetchNewsStart,
  fetchNewsEnd,
  selectIsLoadingNews,
  fetchAsyncGetNews,
  selectNews
} from "./financialnewsSlice"
import { selectIsLoadingAuth } from '../auth/authSlice';

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
  // const [products] = useState(data);
  // const products = useSelector(selectNews);
  //仮データ
  const products = [
    {publisher: 'Bloomberg', title: 'bloomberg_title', detail:'bloomberg_detail'},
    {publisher: 'Reuters', title: 'reuters_title', detail:'reuters_detail'},
  ]
  const isLoadingNews = useSelector(selectIsLoadingAuth);
  const dispatch = useDispatch();
  // productsはuseSelectoerを用いて、storeからとってくる
  // useEffect(() => {
  //   const fetchBootLoader = async () => {
  //     if (localStorage.localJWT) {
  //       // dispatch(resetOpenSignIn());
  //       // const result = await dispatch(fetchAsyncGetMyProf());
  //       // if (fetchAsyncGetMyProf.rejected.match(result)) {
  //       //   dispatch(setOpenSignIn());
  //       //   return null;
  //       // }
  //       await dispatch(fetchAsyncGetNews());
  //       // await dispatch(fetchAsyncGetProfs());
  //       // await dispatch(fetchAsyncGetComments());
  //     }
  //   };
  //   //useeffectはprefetch的な役割をになっている? 
  //   //dispatchが呼ばれたときだけ実行される
  //   fetchBootLoader();
  // }, [dispatch]);

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
                products={products.filter(product => product.publisher === 'Bloomberg')}
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
                products={products.filter(product => product.publisher === 'Reuters')}
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
