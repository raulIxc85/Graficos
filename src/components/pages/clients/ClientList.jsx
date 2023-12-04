import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { useState, useEffect } from 'react';


import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../../../firebase-config"; // importamos la conexion a firebase 
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore"; // importamos los metodos de firebase para agregar, actualizar y eliminar documentos
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from '@mui/material/Modal';
import AddProducts from './AddClient';
import EditProducts from './EditClient';
import { useAppStore } from '../../../appStore'; // importamos el store de zustand: useAppStore y setRows zustand store: estado global de la aplicacion 
import Skeleton from '@mui/material/Skeleton';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function ClientList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // 10, 25, 100 // cantidad de filas por pagina
  const empCollectionRef = collection(db, "client"); // referencia a la coleccion de firebase
  const [formid, setFormid] = useState("");
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const handleOpen = () => setOpen(true); // funcion para abrir el modal
  const handleEditOpen = () => setEditOpen(true); // funcion editar 
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);

  const setRows = useAppStore((state) => state.setRows); // traer los datos de firebase y guardarlos en rows
  const rows = useAppStore((state) => state.rows); // traer los datos de firebase y guardarlos en rows

  useEffect(() => {
    getClientes();
  }, []);

  const getClientes = async () => { // traer los datos de firebase y guardarlos en rows
    const data = await getDocs(empCollectionRef);  // getDocs: lee todos los documentos de una colección  getDocs(collection(db, "users"));
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Esta seguro de borrar?",
      text: "No podra revertir la operación!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    const userDoc = doc(db, "client", id); // referencia al documento de firebase que queremos eliminar ej: doc(db, "users", id) 
    await deleteDoc(userDoc); // deleteDoc: elimina un documento de una colección
    Swal.fire("Borrado!", "El cliente fue borrado.", "success"); // alerta de sweetalert2
    getClientes(); // actualizar la lista de usuarios
  };


  const filterData = (v) => { // filtrar los datos de la tabla
    if (v) { // si el valor es diferente de vacio entonces filtrar
      setRows([v]); // guardar el valor en rows para mostrarlo en la tabla
    } else {
      setRows([]); // si el valor es vacio entonces mostrar todos los datos
      getClientes(); // actualizar la lista de usuarios
    }
  };

  // -------------- Editar datos -----------------

  const editData = (id, identificador, nombre, direccion) => {
    const data = { // guardar los datos en un objeto para enviarlos al componente EditUsers
      id: id,
      identificador: identificador,
      nombre: nombre,
      direccion: direccion
    }
    setFormid(data);
    handleEditOpen();
  }

  return (
    <>
      <div>
        {/* Modal para Crear cliente */}
        <Modal
          open={open}
          //onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddProducts closeEvent={handleClose} />
          </Box>
        </Modal>

        {/* Modal para Editar cliente */}
        <Modal
          open={editopen}
          //onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditProducts closeEvent={handleEditClose} fid={formid} />
          </Box>
        </Modal>
      </div>

      {rows.length > 0 && (
        <Paper sx={{ width: '98%', overflow: 'hidden', padding: "12px" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Clientes
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.nombre || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Buscar clientes" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
              Agregar
            </Button>
          </Stack>
          <Box height={10} />

          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align='left'
                    style={{ minWidth: "100px" }}
                  >
                    Identificador
                  </TableCell>
                  <TableCell
                    align='left'
                    style={{ minWidth: "100px" }}
                  >
                    Nombre
                  </TableCell>
                  <TableCell
                    align='left'
                    style={{ minWidth: "100px" }}
                  >
                    Direccion
                  </TableCell>
                  <TableCell
                    align='left'
                    style={{ minWidth: "100px" }}
                  >
                    Acciones
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}  >
                        <TableCell align='left'>
                          {row.identificador}
                        </TableCell>
                        <TableCell align='left'>
                          {row.nombre}
                        </TableCell>
                        <TableCell align='left'>
                          {row.direccion}
                        </TableCell>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "darkblue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              onClick={() =>
                                editData(row.id, row.identificador, row.nombre, row.direccion)
                              }
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteUser(row.id);
                              }}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      {
        rows.length === 0 && (
          <>
            <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
              <Box height={20} />
              <Skeleton variant='retangular' width={'100%'} height={30} />
              <Box height={40} />
              <Skeleton variant='retangular' width={'100%'} height={60} />
              <Box height={20} />
              <Skeleton variant='retangular' width={'100%'} height={60} />
              <Box height={20} />
              <Skeleton variant='retangular' width={'100%'} height={60} />
              <Box height={20} />
              <Skeleton variant='retangular' width={'100%'} height={60} />
              <Box height={20} />
              <Skeleton variant='retangular' width={'100%'} height={60} />
              <Box height={20} />
            </Paper>
          </>
        )
      }
    </>
  );
}