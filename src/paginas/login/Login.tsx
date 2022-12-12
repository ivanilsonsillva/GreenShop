import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import React, { ChangeEvent, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import UserLogin from "../../model/User";
import "./Login.css";
import { login } from "../../services/Service";
import { useDispatch } from "react-redux";
import { addToken } from "../../store/tokens/action";

function Login() {

  
  let navigate = useNavigate();
  const [token, setToken] = useState('');
  const dispatch = useDispatch()
  const [userLogin, setUserLogin] = useState<UserLogin>(
      {
        usuario: '',
        senha: ''
      }
      )
      function updatedModel(e: ChangeEvent<HTMLInputElement>) {

          setUserLogin({
              ...userLogin,
              [e.target.name]: e.target.value
          })
      }

          useEffect(()=>{
              if(token != ''){
                  dispatch(addToken(token));
                  navigate('/home')
              }
          }, [token])

      async function onSubmit(e: ChangeEvent<HTMLFormElement>){
          e.preventDefault();
          try{
              await login(`/auth/logar`, userLogin, setToken)
          }catch(error){
              alert('Usuario não encontrado!');
          }
      }

  
  return (
    <>
      <Grid container justifyContent="center" alignContent="center" className="fullScreen">
        <Grid sm={6} item className="loginStyle">
          <Typography variant="h3" align="center">Entrar</Typography>
          <form onSubmit={onSubmit}>

            <TextField
              variant="outlined"
              label="Usuário"
              fullWidth
              margin="normal"
              id="usuario"
              name='usuario'
              value={userLogin.usuario}
              onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
             >
            </TextField>
          
            <TextField

              variant="outlined"
              label="Senha"
              fullWidth
              margin="normal"
              id="Senha"
              name='senha'
              type='password'
              onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}

            >
            </TextField>

            <Box textAlign="center">
              <Button variant="contained" type="submit" className="btnLogin">Enviar</Button>
            </Box>
          </form>
          <Box className="flex">
            <Typography>Não tem cadastro?</Typography>
            <Link to='/cadastro' className="linkStyle">
              <Typography>Cadastre-se</Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;