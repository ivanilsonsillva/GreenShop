import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './componentes/estaticos/footer/Footer';
import Navbar from './componentes/estaticos/navbar/Navbar';
import CadastroUsuario from './paginas/cadastro/Cadastro';
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import SobreNos from './paginas/sobreNos/SobreNos';
import CadastroProduto from './componentes/produtos/cadastrarProduto/CadastrarProduto';
import ListarProdutos from './componentes/produtos/listaProdutos/Produtos';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <>
    <Provider store = {store}>
    <Router>
      <Navbar/>
        <Routes>
          <Route path='/home' element={<Home/>} />

          <Route path='/' element={<Home/>} />

          <Route path='/sobrenos' element={<SobreNos/>} />

          <Route path='/cadastro' element={<CadastroUsuario/>}/>

          <Route path='/login' element={<Login/>}/>

          <Route path='/produtos' element={<ListarProdutos/>}/> 

          <Route path='/cadastrarProduto' element={<CadastroProduto/>}/> 
          
        </Routes>
        <Footer/>
      </Router>
      </Provider>
    </>
  );
}

export default App;
