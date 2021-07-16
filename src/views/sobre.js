import React from "react";
import ChartistGraph from "react-chartist";
import './style_auxiliar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import DropdownButton from 'react-bootstrap/DropdownButton'
import axios from 'axios';
import logo from "./img/logo.png"; // import imagem
      // react-bootstrap components
import {
  Dropdown,
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";



class sobre extends React.Component{
  render(){
  return (
    <>
   


<Container fluid>

        <Row>
        <Col lg="3" sm="6"> 
            
                 
 <img src={logo} alt="logo" border="0" width="200" height="200" class="alinhar_centro"/>

                
          </Col>  
          <Col lg="9" sm="6"> 
            <Card className="card-stats">
              <Card.Body>
                <Row>
                       <h3>CrowdZero</h3>
<p>É uma solução
social que permita a cada um dos utilizadores fazer
uma avaliação em tempo real da densidade
populacional ao seu redor, com o intuito de alertar e aumentar a segurança dos espaços face à pandemia. Possuíndo assim uma
interface móvel para o efeito, sendo gerida por uma aplicação web por parte de administradores de cada instituição no sistema.</p>
<p>
Desta forma, e com o contributo de cada utilizador
registado ter-se uma visão “heatmap” das
zonas mais frequentadas e menos frequentadas ao
nosso redor, assim como controlo e gestão de desinfeções e alertas respetivos à população de cada espaço.
</p>
<p>
Desta forma, e com o contributo de cada utilizador
registado ter-se uma visão “heatmap” das
zonas mais frequentadas e menos frequentadas ao
nosso redor, assim como controlo e gestão de desinfeções e alertas respetivos à população de cada espaço.
</p>
<p>
Também, todo o utilizador da plataforma Web (Administrador de uma Instituição) possuí total autonomia para aceitar e remover pedidos de acesso:
tanto como administrador, como utilizador da aplicação móvel. 
Sendo que essa autonomia também perceptível no acesso a dados estatísticos e alterações do funcionamento da respetiva instituição na generalidade
como: (Definições e Alteração de limites de densidade).
</p>


                </Row>
              </Card.Body>  

            </Card>

         
            <Button className="btn btn-dark btn-lg btn-block" onClick={()=>window.open('https://estgv-my.sharepoint.com/:u:/g/personal/estgv18727_alunos_estgv_ipv_pt/ETBP_AGM0SBKkXsypom4pT0BekjwCMxJiGEPaLMpVwBR_A?e=hN2NMd')} >
                           <i class='fab fa-android'></i>&nbsp; Download app</Button>
          </Col>  

          

          </Row>

          </Container>
  </>
  );
}
}
export default sobre;


