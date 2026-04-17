import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductDetails from "../components/ProductDetails";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../features/productApi";
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { isPending, error, search, products } = useSelector(state => state.products)
    const [selectedId, setSelectedId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { t } = useTranslation()
    const columns = [
        { id: "image", label: (t('table.product')), width: "10%" },
        { id: "title", label: (t('table.title')), width: "20%" },
        { id: "description", label: (t('table.description')), width: "50%" },
        { id: "price", label: (t('table.price')), width: "10%", align: "right" },
        { id: "delete", label: "", width: "10%", align: "center" },
    ];

    const dispatch = useDispatch()

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filtered = products

    return (
        <div>
            {error && <div>{error}</div>}
            {isPending && <div className="loading">{t('table.loading')}</div>}

            {filtered.length > 0 && (
                <Paper sx={{ width: "100%" }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="products table" style={{ tableLayout: "fixed" }}>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ width: column.width }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filtered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((product) => (
                                        <TableRow hover tabIndex={-1} key={product.id}>
                                            <TableCell>
                                                <img
                                                    src={product.images?.[0]}
                                                    alt={`Image of ${product.title}`}
                                                    className="product-image"
                                                    onClick={() => setSelectedId(product.id)}
                                                    style={{ cursor: "pointer" }}
                                                />
                                            </TableCell>

                                            <TableCell
                                                className="product-title"
                                                onClick={() => setSelectedId(product.id)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {product.title}
                                            </TableCell>

                                            <TableCell>{product.description}</TableCell>

                                            <TableCell align="right">${product.price}</TableCell>

                                            <TableCell align="center">
                                                <IconButton
                                                    onClick={() => dispatch(deleteProduct(product.id))}
                                                    size="small"
                                                    aria-label="delete-button">
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={filtered.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            )}

            {filtered.length === 0 && !isPending && <div>No products found</div>}

            {selectedId && (
                <ProductDetails id={selectedId} onClose={() => setSelectedId(null)} />
            )}
        </div>
    );
};

export default Home;