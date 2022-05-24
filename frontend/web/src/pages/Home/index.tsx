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

const rows = [
    {
        text: "Teste",
        text1: "TESTE 1",
        text2: "TEste 2",
        text3: "TEste 3",
        text4: "Teste 4",

    },


]


const baseurl = "http://localhost:5000/";

function Home() {

    const { persons, getAllPessoas } = usePessoas();

    const [open, setOpen] = useState(false)
    const [opencreate, setOpencreate] = useState(false)
    const [read, setRead] = useState<Pessoa>()


    const [id, setId] = useState(0);
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

        setRead(get_pessoa.data.pessoa)

        setId(get_pessoa.data.pessoa.id)
        setName(get_pessoa.data.pessoa.name);
        setRua(get_pessoa.data.pessoa.endereco.andress);
        setBairro(get_pessoa.data.pessoa.endereco.bairro)
        setNumber(get_pessoa.data.pessoa.endereco.number);
        setComplemento(get_pessoa.data.pessoa.endereco.complemento);
        setCep(get_pessoa.data.pessoa.endereco.cep);
        setCity(get_pessoa.data.pessoa.endereco.city);
        setUf(get_pessoa.data.pessoa.endereco.uf);


        setOpen(true);


    }

    const Create = async () => {
        const body_create = {
            name,
            cpf,
            andress,
            bairro,
            number,
            complemento,
            cep,
            city,
            uf

        }
        console.log(body_create)

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
            const send_pessoa = await axios.put(`${baseurl}api/person/${id}`, body_pessoa);


            const send_endereco = await axios.put(`${baseurl}api/endereco/${id}`, body_endereco);
        }
        catch (error) {
            console.log(error);
        }
        setOpen(false);

    }



    const handleClose = () => {
        setOpen(false);
        setOpencreate(false);

    }

    return (
        <>
            <Button variant='contained' color={'success'} onClick={(e) => { setOpencreate(true) }}>CREATE</Button>

            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Nome</StyledTableCell>
                            <StyledTableCell align="center">CPF</StyledTableCell>
                            <StyledTableCell align="center">Rua</StyledTableCell>
                            <StyledTableCell align="center">Bairro</StyledTableCell>
                            <StyledTableCell align="center">Número</StyledTableCell>
                            <StyledTableCell align="center">CEP</StyledTableCell>
                            <StyledTableCell align="center">Cidade</StyledTableCell>
                            <StyledTableCell align="center">Estado</StyledTableCell>
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
                                <StyledTableCell align="center">{pessoa.endereco.andress}</StyledTableCell>
                                <StyledTableCell align="center">{pessoa.endereco.bairro}</StyledTableCell>
                                <StyledTableCell align="center">{pessoa.endereco.number}</StyledTableCell>
                                <StyledTableCell align="center">{pessoa.endereco.cep}</StyledTableCell>
                                <StyledTableCell align="center">{pessoa.endereco.city}</StyledTableCell>
                                <StyledTableCell align="center">{pessoa.endereco.uf}</StyledTableCell>
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


            {read ? (
                <Dialog open={open}>
                    <DialogTitle>{read.name}</DialogTitle>
                    <DialogContent>
                        <FormGroup>
                            <FormLabel> Name</FormLabel>
                            <Input type="text" placeholder={read.name} onChange={(e) => { setName(e.target.value) }} />
                            <FormLabel> CPF </FormLabel>
                            <Typography variant='h6'>{read.cpf}</Typography>
                            <FormLabel> Rua:</FormLabel>
                            <Input type="text" placeholder={read.endereco.andress} onChange={(e) => { setRua(e.target.value) }} />
                            <FormLabel> Bairro:</FormLabel>
                            <Input type="text" placeholder={read.endereco.bairro} onChange={(e) => { setBairro(e.target.value) }} />
                            <FormLabel> Número:</FormLabel>
                            <Input type="text" placeholder={read.endereco.number} onChange={(e) => { setNumber(e.target.value) }} />
                            <FormLabel> Complemento:</FormLabel>
                            <Input type="text" placeholder={read.endereco.complemento} onChange={(e) => { setComplemento(e.target.value) }} />
                            <FormLabel> CEP:</FormLabel>
                            <Input type="text" placeholder={read.endereco.cep} onChange={(e) => { setCep(e.target.value) }} />
                            <FormLabel> Cidade:</FormLabel>
                            <Input type="text" placeholder={read.endereco.city} onChange={(e) => { setCity(e.target.value) }} />
                            <FormLabel> Estado:</FormLabel>
                            <Input type="text" placeholder={read.endereco.uf} onChange={(e) => { setUf(e.target.value) }} />

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
                        <TextField required variant='outlined' type="text" onChange={(e) => { setName(e.target.value) }} />
                        <FormLabel> CPF </FormLabel>
                        <TextField required variant='outlined' type="text" onChange={(e) => { setCPF(e.target.value) }} />
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