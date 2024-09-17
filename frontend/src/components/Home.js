import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
// import { Redirect } from 'react-router-dom';
import IconButton from "@mui/icons-material/IosShare";
import CloseIcon from "@mui/icons-material/IosShare";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { GET_ALL_PRODUCTS, DELETE_PRODUCT_ID } from "../api/apiService";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
    marginLeft: -325,
  },
  paper: {
    width: 1500,
    margin: "auto",
  },
  removeLink: {
    textDecoration: "none",
  },
}));
export default function Home() {
  const classes = useStyles();
  const [products, setProducts] = useState({});
  const [checkDeleteProduct, setCheckDeleteProduct] = useState(false);
  const [close, setClose] = React.useState(false);

  useEffect(() => {
    GET_ALL_PRODUCTS(`products`).then((item) => setProducts(item.data));
  }, []);

  const RawHTML = (body, className) => (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: body.replace(/\n/g, "<br />") }}
    />
  );

  const deleteProductID = (id) => {
    DELETE_PRODUCT_ID(`products/${id}`).then((item) => {
      console.log(item);
      if (item.data === 1) {
        setCheckDeleteProduct(true);
        setProducts(products.filter((key) => key.idProduct !== id));
      }
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {checkDeleteProduct && (
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setClose(true);
                      setCheckDeleteProduct(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {" "}
                Delete successfully
              </Alert>
            )}
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="center">Body</TableCell>
                    <TableCell align="center">Slug</TableCell>
                    <TableCell align="center">Category</TableCell>
                    <TableCell align="center">Modify</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.length > 0 &&
                    products.map((row) => (
                      <TableRow key={row.idProduct}>
                        <TableCell component="th" scope="row">
                          {row.title}
                        </TableCell>
                        <TableCell align="left">
                          {RawHTML(row.body, "body")}
                        </TableCell>
                        <TableCell align="center">{row.slug}</TableCell>
                        <TableCell align="center">
                          {row.category.name}
                        </TableCell>
                        <TableCell align="center">
                          <Link
                            to={`/edit/product/${row.idProduct}`}
                            className={classes.removeLink}
                          >
                            <Button
                              size="small"
                              variant="contained"
                              color="primary"
                            >
                              Edit
                            </Button>
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={() => deleteProductID(row.idProduct)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
