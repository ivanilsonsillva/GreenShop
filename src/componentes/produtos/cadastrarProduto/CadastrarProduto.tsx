import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText, Box, Grid } from "@material-ui/core"
import './CadastrarProduto.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { busca, buscaId, post, put } from '../../../services/Service';
import { useSelector } from "react-redux";
import TokenState from "../../../store/tokens/tokenReducer";
import Categoria from '../../../model/Categoria';
import Produtos from '../../../model/Produto';


function CadastroProduto() {

    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [categorias, setCategorias] = useState<Categoria[]>([])
     const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      )

   /*  useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado")
            navigate("/login")
        }
    }, [token]) */

    const [categoria, setCategoria] = useState<Categoria>(
        {
            id_categoria: 0,
            moveis: '',
            ambiente: '',
            produto: null
        })
    const [produto, setProduto] = useState<Produtos>({
        id_produto: 0,
        nome: '',
        descricao: '',
        valor: 0,
        peso: 0,
        foto: '',
        usuario: null,
        categoria: null
    })

    useEffect(() => { 
        setProduto({
            ...produto,
            categoria: categoria
        })
    }, [categoria])

    useEffect(() => {
        getCategorias()
        if (id !== undefined) {
            findByIdCategoria(id)
        }
    }, [id])

    async function getCategorias() {
        await busca("/categoria", setCategorias, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function findByIdCategoria(id_categoria: string) {
        await buscaId(`produtos/${id_categoria}`, setProduto, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedProduto(e: ChangeEvent<HTMLInputElement>) {

        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            put(`/produtos`, produto, setProduto, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Produto atualizado com sucesso!');
        } else {
            post(`/produtos`, produto, setProduto, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Produto cadastrado com sucesso!');
        }
        back()

    }
    function back() {
        navigate('/produtos')
    }

    return (
        <>
        <Grid container direction='row' justifyContent='center' alignItems='center'>
                    <Grid item xs={6} alignItems='center' className='container'>
                        <Box paddingX={10}>
                            <form onSubmit={onSubmit}>
                                <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2'>Cadastrar Produtos</Typography>


                                {/* <TextField value={produto.categoria} onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    updatedProduto(e)} id='categoria' label='categoria' variant='outlined' name='categoria' margin='normal' fullWidth /> */}

                                <TextField value={produto.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)} id='nome' label='nome' variant='outlined' name='nome' margin='normal' fullWidth />

                               {/*  <TextField value={produto.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)} id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal' fullWidth /> */}

                                <TextField value={produto.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)} id='descricao' label='descricao' variant='outlined' name='descricao' margin='normal' fullWidth />

                                <TextField value={produto.peso} onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    updatedProduto(e)} id='peso' label='peso' variant='outlined' name='peso' margin='normal' fullWidth />

                                <TextField value={produto.peso} onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    updatedProduto(e)} id='valor' label='valor' variant='outlined' name='valor' margin='normal' fullWidth />


                                <TextField value={produto.foto} onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    updatedProduto(e)} id='foto' label='foto' variant='outlined' name='foto' margin='normal' fullWidth />

                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    onChange={(e) => buscaId(`/categoria/${e.target.value}`, setCategoria, {
                                        headers: {
                                            'Authorization': token
                                        }
                                    })}>
                                    {
                                        categorias.map(categoria => (
                                            <MenuItem value={categoria.id_categoria}>{categoria.moveis}</MenuItem>
                                        ))
                                    }
                                </Select>


                                <Box marginTop={2} textAlign='center'>
                                    <Link to='/login' className='text-decorator-none'>
                                        <Button variant='contained' color='secondary' className='btnCancelar'>
                                            Cancelar
                                        </Button>
                                    </Link>
                                    <Button type='submit' variant='contained' color='primary'>
                                        Cadastrar
                                    </Button>
                                </Box>

                             



                            </form>
                        </Box>
                    </Grid>
                </Grid>
        </>
    )
}
export default CadastroProduto;