import { useEffect, useState } from 'react';
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
    FormLabel
} from '@mui/material';

import { MaskCEP, MaskCPF } from '../../utils/mask'

import axios from 'axios'

import { Pessoa } from '../../@types'

import usePessoas from '../../services/usePessoa'
import ModalRead from '../../components/Modals/ModalRead';


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




const baseurl = "http://localhost:5000/";

function Home() {

    const { persons, getAllPessoas } = usePessoas();

    const [open, setOpen] = useState(false)
    const [opencreate, setOpencreate] = useState(false)
    const [openend, setOpenend] = useState(false);
    const [read, setRead] = useState<Pessoa>()


    const [id, setId] = useState(0);
    const [endid, setEndid] = useState(0);
    const [cpf, setCPF] = useState('');
    const [name, setName] = useState('');
    const [andress, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [number, setNumber] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');




    useEffect(() => {
        getAllPessoas();

    }, [persons])

    const DeletePerson = async (id: number) => {
        const delete_person = await axios.delete(`${baseurl}api/person/${id}`, {});


        alert(`${delete_person.data.message}!
    Nome:${delete_person.data.pessoa.name}`);
    }

    const ReadModal = async (id: number) => {
        const get_pessoa = await axios.get(`${baseurl}api/person/find/${id}`, {});
        console.log(get_pessoa);
        console.log("Get pessoa", get_pessoa.data)
        setRead(get_pessoa.data.pessoa)

        setId(get_pessoa.data.pessoa.id)
        setName(get_pessoa.data.pessoa.name);
        setRua(get_pessoa.data.pessoa.Endereco.andress);
        setBairro(get_pessoa.data.pessoa.Endereco.bairro)
        setNumber(get_pessoa.data.pessoa.Endereco.number);
        setComplemento(get_pessoa.data.pessoa.Endereco.complemento);
        setCep(get_pessoa.data.pessoa.Endereco.cep);
        setCity(get_pessoa.data.pessoa.Endereco.city);
        setUf(get_pessoa.data.pessoa.Endereco.uf);


        setOpen(true);


    }

    const Create = async () => {
        const body_create = {
            name,
            cpf,
            endereco: [
                {
                    andress,
                    bairro,
                    number,
                    complemento,
                    cep,
                    city,
                    uf
                }
            ]
        };





        try {
            const create_pessoa = await axios.post(`${baseurl}api/person/`, body_create);
            alert(create_pessoa.data.message)
            setOpencreate(false);

        } catch (error) {
            console.log(error);
        }
    }




    const Update = async (id: number) => {

        const body_pessoa = { name };

        /* const body_endereco = {
            andress,
            number,
            bairro,
            complemento,
            cep,
            city,
            uf
        } */
        try {
            const send_pessoa = await axios.put(`${baseurl}api/person/${id}`, body_pessoa);


            // const send_endereco = await axios.put(`${baseurl}api/endereco/${id}`, body_endereco);
            alert(send_pessoa.data.message);
            setOpen(false);
        }
        catch (error) {
            console.log(error);
        }

    }

    /* const UpdateEndereco = async (id: any) => {

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

        }
        catch (error) { console.log(error) }

    } */


    const handleClose = () => {
        setOpen(false);
        setOpencreate(false);

    }

    return (
        <>
            <Button variant='contained' color={'success'} onClick={(e) => { setOpencreate(true) }}>CADASTRAR PESSOA</Button>
            {/* <Button variant='contained' color={'success'} onClick={(e) => { setOpenend(true) }}>CRIAR ENDEREÇO</Button> */}

            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Nome</StyledTableCell>
                            <StyledTableCell align="center">CPF</StyledTableCell>
                            <StyledTableCell align="center">Endereço 1</StyledTableCell>
                            <StyledTableCell align="center">Endereço 2</StyledTableCell>
                            {/* <StyledTableCell align="center">Endereço 3</StyledTableCell> */}

                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {persons.map((pessoa, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="center" component="th" scope="row">
                                    {pessoa.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{pessoa.cpf}</StyledTableCell>
                                {pessoa.Endereco.map((endereco, index) => (
                                    <StyledTableCell key={index} align="center">
                                        {endereco.andress},
                                        {endereco.bairro},  {endereco.number},
                                        {endereco.cep},  {endereco.city},{endereco.uf}</StyledTableCell>
                                ))}
                                {/* <StyledTableCell align="center">{pessoa.Endereco[0].andress}</StyledTableCell>
                                <StyledTableCell align="center">{pessoa.Endereco[0].bairro}</StyledTableCell>
                                <StyledTableCell align="center">{pessoa.Endereco[0].number}</StyledTableCell>
                                <StyledTableCell align="center">{pessoa.Endereco[0].cep}</StyledTableCell>
                                <StyledTableCell align="center">{pessoa.Endereco[0].city}</StyledTableCell>
                                <StyledTableCell align="center">{pessoa.Endereco[0].uf}</StyledTableCell> */}
                                <StyledTableCell align="center">
                                    <ButtonGroup variant={'contained'} size={'large'}>
                                        <Button onClick={(e) => { ReadModal(pessoa.id) }} color={'primary'}>
                                            READ
                                        </Button>
                                        {/* <Button color={'warning'}>
                                            UPDATE
                                        </Button> */}
                                        <Button color={'error'} onClick={(e) => { DeletePerson(pessoa.id) }} >
                                            DELETE
                                        </Button>
                                    </ButtonGroup>


                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {console.log(read)}
            {
                read ? (
                    <Dialog open={open}>
                        <DialogTitle>{read.name}</DialogTitle>
                        <DialogContent>
                            <FormGroup>
                                <FormLabel> Name</FormLabel>
                                <Input type="text" placeholder={read.name} onChange={(e) => { setName(e.target.value) }} />
                                <FormLabel> CPF </FormLabel>
                                <Typography variant='h6'>{read.cpf}</Typography>
                                <FormLabel> Rua:</FormLabel>
                                <Typography variant='h6'>{read.Endereco[0].andress}</Typography>
                                <FormLabel> Bairro:</FormLabel>
                                <Typography variant='h6'>{read.Endereco[0].bairro}</Typography>
                                <FormLabel> Número:</FormLabel>
                                <Typography variant='h6'>{read.Endereco[0].number}</Typography>
                                <FormLabel> Complemento:</FormLabel>
                                <Typography variant='h6'>{read.Endereco[0].complemento}</Typography>
                                <FormLabel> CEP:</FormLabel>
                                <Typography variant='h6'>{read.Endereco[0].cep}</Typography>
                                <FormLabel> Cidade:</FormLabel>
                                <Typography variant='h6'>{read.Endereco[0].city}</Typography>
                                <FormLabel> Estado:</FormLabel>
                                <Typography variant='h6'>{read.Endereco[0].uf}</Typography>

                            </FormGroup>


                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>

                                <Button onClick={(e) => { Update(id) }} variant='contained' color={'warning'}>UPDATE</Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>

                )


                    : (
                        <Dialog open={open}>
                            <DialogTitle></DialogTitle>
                            <DialogContent>

                            </DialogContent>

                        </Dialog>
                    )}
            <Dialog open={opencreate}>
                <DialogTitle>Create Person</DialogTitle>
                <DialogContent>
                    <FormGroup>
                        <FormLabel> Name</FormLabel>
                        <TextField required={true} variant='outlined' type="text" onChange={(e) => { setName(e.target.value) }} />
                        <FormLabel> CPF </FormLabel>
                        <TextField required={true} helperText="999.999.999-99" variant='outlined' type="text" onFocus={(e) => { MaskCPF(e.target.value) }} onChange={(e) => { setCPF(MaskCPF(e.target.value)) }} />
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

                        <Button variant={'contained'} onClick={(e) => { Create() }} color={'success'}>CREATE</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            <Dialog open={openend}>
                <DialogTitle>Create Andress</DialogTitle>
                <DialogContent>
                    <FormGroup>
                        <FormLabel> Pessoa</FormLabel>
                        <TextField required variant='outlined' type="text" onChange={(e) => { setName(e.target.value) }} />
                        <FormLabel> Rua:</FormLabel>
                        <TextField required variant='outlined' type="text" onChange={(e) => { setRua(e.target.value) }} />
                        <FormLabel> Bairro:</FormLabel>
                        <TextField required variant='outlined' type="text" onChange={(e) => { setBairro(e.target.value) }} />
                        <FormLabel> Número:</FormLabel>
                        <TextField required variant='outlined' type="text" onChange={(e) => { setNumber(e.target.value) }} />
                        <FormLabel> Complemento:</FormLabel>
                        <TextField required variant='outlined' type="text" onChange={(e) => { setComplemento(e.target.value) }} />
                        <FormLabel> CEP:</FormLabel>
                        <TextField required variant='outlined' type="text" onChange={(e) => { setCep(e.target.value) }} />
                        <FormLabel> Cidade:</FormLabel>
                        <TextField required variant='outlined' type="text" onChange={(e) => { setCity(e.target.value) }} />
                        <FormLabel> Estado:</FormLabel>
                        <TextField required variant='outlined' type="text" onChange={(e) => { setUf(e.target.value) }} />

                    </FormGroup>


                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>

                        <Button variant={'contained'} onClick={(e) => { Create() }} color={'success'}>CREATE</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>


        </>




    );




}
export default Home