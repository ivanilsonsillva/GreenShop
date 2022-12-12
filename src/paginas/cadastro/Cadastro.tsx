import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import UserCadastro from "../../model/UserCadastro";
import { cadastroUsuario } from "../../services/Service";
import { Grid, Typography, Button, TextField } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./Cadastro.css";

function CadastroUsuario() {
  
  let navigate = useNavigate();
  const [confirmarSenha, setConfirmarSenha] = useState<String>("");
  const [user, setUser] = useState<UserCadastro>({
    id_usuario: 0,
    usuario: "",
    nome: "",
    senha: "",
    foto: "",
  });

  const [userResult, setUserResult] = useState<UserCadastro>({
    id_usuario: 0,
    usuario: "",
    nome: "",
    senha: "",
    foto: "",
  });

  useEffect(() => {
    if (userResult.id_usuario != 0) {
      navigate("/login");
    }
  }, [userResult]);

  function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try{
      if (confirmarSenha == user.senha) {
        await cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult);
        alert("Usuario cadastrado com sucesso");
      } else {
        alert(
          "Dados inconsistentes. Favor verificar as informações de cadastro."
        );
      }
  }catch(error){
      alert('Dados incorretos!')
  }
}


  return (
    <>
     <Grid container direction="row" justifyContent="center" alignContent="center">
        <Grid sm={6} item  className="cadastroStyle">
          <Typography variant="h3" align="center">Cadastre-se</Typography>
          <form onSubmit={onSubmit}>
            <TextField
              value={user.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              variant="outlined"
              name="nome"
              label="Nome"
              fullWidth
              margin="normal"
            >
            </TextField>

            <TextField
              value={user.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              variant="outlined"
              label="E-mail"
              name="usuario"
              fullWidth
              margin="normal"
            >
            </TextField>

            <TextField
              value={user.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              variant="outlined"
              label="Senha"
              name="senha"
              fullWidth
              margin="normal"
            >
            </TextField>
            <Box className=""></Box>

            <TextField
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
              confirmarSenhaHandle(e) 
              }
              variant="outlined"
              label="Confirmar Senha"
              name="confirmarSenha"
              fullWidth
              margin="normal"
            >
            </TextField>
            <Box className=""></Box>

            <Box marginTop={2} textAlign="center" className="botoes">
              <Button variant="outlined" className="btnCancelar">
                  Cancelar
              </Button>
              <Link to="/login" className="text-decorator-none">
              <Button type="submit" variant="contained" className="btn-cadastrar">
                Cadastrar
              </Button>
              </Link>
            </Box>
          </form>
        </Grid>
        <Grid sm={6} item>
            
        </Grid>
      </Grid>
    </>
  )
}
export default CadastroUsuario;