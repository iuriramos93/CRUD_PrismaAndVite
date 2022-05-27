import { useState, useEffect } from 'react'

import axios from 'axios'

import useEndereco from '../../services/useEndereco'
import usePessoas from '../../services/usePessoa'

import { EnderecoType } from '../../@types'

import { styled } from '@mui/material/styles';
import {
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    ButtonGroup,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormGroup,
    Input,
    TextField,
    Typography,
    FormLabel,
    Select,
    MenuItem,
    FormControl
} from '@mui/material';
import { MaskCEP } from '../../utils/mask'
import { Box } from '@mui/system'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));






function Endereco() {

    const { persons, getAllPessoas } = usePessoas();
    const { allandress, getAllAndress } = useEndereco();

    const [openend, setOpenend] = useState(false);
    const [openendupdate, setOpenendupdate] = useState(false);

    const [id_end, setIDEnd] = useState(0);
    const [id_person, setIDPerson] = useState(0);
    // const [list_pessoa, setListPessoa] = useState([]);

    const [andress, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [number, setNumber] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');



    const baseurl = "http://localhost:5000/";


    const DeleteAndress = async (id: number) => {

        try {
            const delete_andress = await axios.delete(`${baseurl}api/endereco/${id}`, {});

            alert(JSON.stringify(delete_andress.data));


        } catch (error) {
            console.log(error);
        }


    }
    const validate = () => {
        if (andress.length === 0 || number.length === 0 || bairro.length === 0 || complemento.length === 0 || cep.length === 0 || city.length === 0 || uf.length === 0) {
            return false;
        }
        else {
            return true;

        }

    }

    const createEndereco = async () => {
        const body_create = {
            pessoa: {

                id: id_person,
            },
            endereco: {
                andress,
                number,
                bairro,
                complemento,
                cep,
                city,
                uf


            }

        }
        console.log(body_create)
        if (validate() === true) {

            const create_endereco = await axios.post(`${baseurl}api/endereco`, body_create)

            setOpenend(false)
        }
        else {
            alert("Preencha todos os campos")
        }


    }
    const OpenUpdate = async (e: any) => {
        setIDEnd(e.target.value)


        if (id_end) {
            try {
                const selected_end = await axios.get(`${baseurl}api/endereco/?endereco_id=${id_end}`, {});

                setRua(selected_end.data.Endereço.andress)
                setNumber(selected_end.data.Endereço.number)
                setBairro(selected_end.data.Endereço.bairro)
                setComplemento(selected_end.data.Endereço.complemento)
                setCep(selected_end.data.Endereço.cep)
                setCity(selected_end.data.Endereço.city)
                setUf(selected_end.data.Endereço.uf)



                setOpenendupdate(true);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const UpdateEndereco = async (id: any) => {

        const body_endereco = {
            andress,
            number,
            bairro,
            complemento,
            cep,
            city,
            uf
        }
        try {
            const send_endereco = await axios.put(`${baseurl}api/endereco/?id=${id}`, body_endereco);

            alert(JSON.stringify(send_endereco.data.message));
            setOpenendupdate(false);

        }
        catch (error) { console.log(error) }

    }
    useEffect(() => {

        getAllPessoas();


    }, [])


    useEffect(() => {
        getAllAndress();

    }, [allandress])

    // console.log(allandress);

    const handleClose = () => {
        setOpenend(false);
        setOpenendupdate(false);

    }


    return (

        <>
            <Button variant='contained' color={'success'} onClick={(e) => { setOpenend(true) }}>CRIAR ENDEREÇO</Button>

            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Nome</StyledTableCell>
                            <StyledTableCell align="center">Endereço</StyledTableCell>
                            {/* <StyledTableCell align="center">Endereço 2</StyledTableCell> */}
                            {/* <StyledTableCell align="center">Endereço 3</StyledTableCell> */}

                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allandress.map((andress: any) => (
                            <StyledTableRow key={andress.id}>
                                <StyledTableCell align="center" component="th" scope="row">
                                    {andress.Pessoa.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {andress.andress},
                                    {andress.bairro},  {andress.number},
                                    {andress.cep},  {andress.city},{andress.uf}</StyledTableCell>

                                {/* <StyledTableCell align="center">{pessoa.Endereco[0].andress}</StyledTableCell>
                    <StyledTableCell align="center">{pessoa.Endereco[0].bairro}</StyledTableCell>
                    <StyledTableCell align="center">{pessoa.Endereco[0].number}</StyledTableCell>
                    <StyledTableCell align="center">{pessoa.Endereco[0].cep}</StyledTableCell>
                    <StyledTableCell align="center">{pessoa.Endereco[0].city}</StyledTableCell>
                    <StyledTableCell align="center">{pessoa.Endereco[0].uf}</StyledTableCell> */}
                                <StyledTableCell align="center">
                                    <ButtonGroup variant={'contained'} size={'large'}>

                                        <Button value={andress.id} onClick={OpenUpdate} color={'warning'}>
                                            UPDATE
                                        </Button>
                                        <Button color={'error'} onClick={(e) => { DeleteAndress(andress.id) }} >
                                            DELETE
                                        </Button>
                                    </ButtonGroup>


                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <Dialog open={openend}>
                <DialogTitle>Create Andress</DialogTitle>
                <DialogContent>
                    <FormGroup>
                        <FormControl>
                            <FormLabel> Pessoa</FormLabel>
                            <Select required={true} onChange={(e) => { setIDPerson(Number(e.target.value)) }}>
                                {persons.map((person: any) => (
                                    <MenuItem key={person.id} value={person.id}>{person.name}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                        {/* <TextField required={true} variant='outlined' type="text" onChange={(e) => { setName(e.target.value) }} /> */}
                        <FormLabel> Rua:</FormLabel>
                        <TextField required={true} variant='outlined' type="text" onChange={(e) => { setRua(e.target.value) }} />
                        <FormLabel> Bairro:</FormLabel>
                        <TextField required={true} variant='outlined' type="text" onChange={(e) => { setBairro(e.target.value) }} />
                        <FormLabel> Número:</FormLabel>
                        <TextField required={true} variant='outlined' type="text" onChange={(e) => { setNumber(e.target.value) }} />
                        <FormLabel> Complemento:</FormLabel>
                        <TextField required={true} variant='outlined' type="text" onChange={(e) => { setComplemento(e.target.value) }} />
                        <FormLabel> CEP:</FormLabel>
                        <TextField required={true} variant='outlined' type="text" onChange={(e) => { setCep(MaskCEP(e.target.value)) }} />
                        <FormLabel> Cidade:</FormLabel>
                        <TextField required={true} variant='outlined' type="text" onChange={(e) => { setCity(e.target.value) }} />
                        <FormLabel> Estado:</FormLabel>
                        <TextField required={true} variant='outlined' type="text" onChange={(e) => { setUf(e.target.value) }} />

                    </FormGroup>


                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>

                        <Button variant={'contained'} onClick={(e) => { createEndereco() }} color={'success'}>CREATE</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>


            <Dialog open={openendupdate}>
                <DialogTitle>Update Andress</DialogTitle>
                <DialogContent>
                    <FormGroup>
                        {/*  <FormControl>
                            <FormLabel> Pessoa</FormLabel>
                            <Select required={true} onChange={(e) => { setIDPerson(Number(e.target.value)) }}>
                                {persons.map((person: any) => (
                                    <MenuItem key={person.id} value={person.id}>{person.name}</MenuItem>
                                ))}

                            </Select>
                        </FormControl> */}
                        {/* <TextField required={true} variant='outlined' type="text" onChange={(e) => { setName(e.target.value) }} /> */}
                        <FormLabel> Rua:</FormLabel>
                        <TextField required={true} variant='outlined' placeholder={andress} type="text" onChange={(e) => { setRua(e.target.value) }} />
                        <FormLabel> Bairro:</FormLabel>
                        <TextField required={true} variant='outlined' placeholder={bairro} type="text" onChange={(e) => { setBairro(e.target.value) }} />
                        <FormLabel> Número:</FormLabel>
                        <TextField required={true} variant='outlined' placeholder={number} type="text" onChange={(e) => { setNumber(e.target.value) }} />
                        <FormLabel> Complemento:</FormLabel>
                        <TextField required={true} variant='outlined' placeholder={complemento} type="text" onChange={(e) => { setComplemento(e.target.value) }} />
                        <FormLabel> CEP:</FormLabel>
                        <TextField required={true} variant='outlined' placeholder={cep} type="text" onChange={(e) => { setCep(MaskCEP(e.target.value)) }} />
                        <FormLabel> Cidade:</FormLabel>
                        <TextField required={true} variant='outlined' placeholder={city} type="text" onChange={(e) => { setCity(e.target.value) }} />
                        <FormLabel> Estado:</FormLabel>
                        <TextField required={true} variant='outlined' placeholder={uf} type="text" onChange={(e) => { setUf(e.target.value) }} />

                    </FormGroup>


                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>

                        <Button variant={'contained'} onClick={(e) => { UpdateEndereco(id_end) }} color={'warning'}>UPDATE</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>



        </>)


}



export default Endereco