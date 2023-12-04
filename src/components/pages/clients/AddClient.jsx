import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { db } from "../../../firebase-config"; // importamos la conexion a firebase
import { collection, addDoc, getDocs } from "firebase/firestore"; // importamos los metodos de firebase para agregar, actualizar y eliminar documentos
import Swal from 'sweetalert2';
import { useAppStore } from '../../../appStore'; // importamos el store de zustand: useAppStore


export default function AddClient({ closeEvent }) {

    const [identificador, setIdentificador] = useState('')
    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const setRows = useAppStore((state) => state.setRows); // traer los datos de firebase y guardarlos en rows  
    const empCollectionRef = collection(db, "client"); // referencia a la coleccion de firebase


    const handleIdentificadorChange = (e) => {
        setIdentificador(e.target.value)
    }

    const handleNombreChange = (e) => {
        setNombre(e.target.value)
    }

    const handleDireccionChange = (e) => {
        setDireccion(e.target.value)
    }

    const getClientes = async () => { // traer los datos de firebase y guardarlos en rows
        const data = await getDocs(empCollectionRef);  // getDocs: lee todos los documentos de una colección  getDocs(collection(db, "users"));
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const createClient = async () => {
        await addDoc(empCollectionRef, {
            identificador: identificador,
            nombre: nombre,
            direccion: direccion,
        });
        getClientes();
        closeEvent();
        Swal.fire("Success", "Cliente agregado correctamente", "success");
    }

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>
                Agregar cliente
            </Typography>
            <IconButton
                style={{ position: 'absolute', right: '0', top: '0' }}
                onClick={closeEvent}
            >
                <CloseIcon />
            </IconButton>
            <Box height={20} />
            <Grid container spacing={2}>
                <Grid item xs={6} >
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Identificador"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: "100%" }}
                        value={identificador}
                        onChange={handleIdentificadorChange}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Nombre"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: "100%" }}
                        value={nombre}
                        onChange={handleNombreChange}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Direccion"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: "100%" }}
                        value={direccion}
                        onChange={handleDireccionChange}
                    />
                </Grid>
                <Grid item xs={12} >
                    <Typography variant='h5' align='center'>
                        <Button
                            variant="contained"
                            sx={{ minWidth: "100%" }}
                            onClick={createClient}
                        >
                            Agregar
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 4 }} />

        </>
    )
}
