import React from "react";
import ChartistGraph from "react-chartist";
import './style_auxiliar.css';
import './style_popup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import axios from 'axios';
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
import { actions } from "react-table";
class utilizadores extends React.Component{
  constructor(props){
    super(props);
    this.state = {
     listautilizadores:[],
     campocountverifu:"",
     campocountNOverifu:"",
     
    }
  }
  componentDidMount(){
    this.loadutilizadores()
    
    
    
      
      const idlocal=localStorage.getItem('idinstituicao');
      const idad=localStorage.getItem('idadmin');
      const idinst=localStorage.getItem('idinstituicao');
      console.log("idlocal",idlocal);
      console.log("idadmin",idad);
      console.log("idinst",idinst);
  
      const url="https://pint2021.herokuapp.com/Utilizadores/countUtilVerify/"+idinst
  
      axios.get(url).then(res => {
        if(res.data.status==200){  
          this.setState({
            campocountverifu:res.data.NumeroUtilizadores
          })
          console.log("data",res.data.NumeroUtilizadores)
        }else{
          alert("Error Web Service!");
        
        }
          console.log(res)
        })
        .catch(error => {
          alert(error)
        }); 

        const url2="https://pint2021.herokuapp.com/Utilizadores/countUtilNOVerify/"+idinst
  
      axios.get(url2).then(res => {
        if(res.data.status==200){  
          this.setState({
            campocountNOverifu:res.data.NumeroUtilizadores
          })
          console.log("data",res.data.NumeroUtilizadores)
        }else{
          alert("Error Web Service!");
        
        }
          console.log(res)
        })
        .catch(error => {
          alert(error)
        }); 

  }
     
   render(){
  return (
    <>
      <Container fluid>
      <Row style={{paddingLeft:'30%'}}>
          <Col md="5">  {/*coluna Estatisticas Diárias*/}
            <Card style={{height:'100%'}} className="card-stats">
              <Card.Body>
              
                <Row>
                  <Row ><p className="first_titulo">Estatísticas:</p></Row>
                <Col lg="12" sm="12">  {/*coluna Estatisticas Diárias*/}
                    <div  className="numbers">
                      
                      <p   className="secound_titulo">Utilizadores Registados: </p>
                      <Card.Title><h3   onChange={(value)=>this.setState({campocountverifu:value.target.value})} className="aligncenter">{this.state.campocountverifu}</h3></Card.Title>    
                    
                      <p className="secound_titulo">À espera de aprovação: </p>
                      <Card.Title><h3  onChange={(value)=>this.setState({campocountNOverifu:value.target.value})} className="aligncenter">{this.state.campocountNOverifu}</h3></Card.Title>
                      
                    </div>
                  </Col>
                 
                  </Row>
                </Card.Body>  
            </Card>
          </Col>

          
          </Row>


<Row style={{paddingTop:'4%'}}>
          <Col md="12">
            <Card  className="card-tasks">
              <Card.Header>
                <p className="first_titulo_esquerda">Utilizadores da Instituição:    
</p>
 
                <br/>
               
              </Card.Header>

              <Card.Body >
                <div id="table-scroll">
                  <Table id="table-scroll">
                  <thead>
                    <tr>
                        
                        <th>Nome</th>
                        <th>Data Nasc</th>
                        <th>Codigo Postal</th>
                        <th>Cidade</th>
                        <th>Locallização</th>
                        <th>Email</th>
                        <th>Pontos</th>
                        <th>Ranking</th>
                        <th>Excluir</th>
                  
                    </tr> 
                    </thead>
                  <tbody id="table-scroll">
                      {this.loadfillutilizadores()}
                  </tbody>
                  </Table>
                </div>

                <br/><br/>
              </Card.Body>
              
            </Card>
          </Col>
          </Row>
      </Container>
    </>
  );
}




loadfillutilizadores()
{
  return this.state.listautilizadores.map((data, index)=>{
    return(
    <tr key={index}>
       
        <td>{data.Pessoa.PNome + " "+ data.Pessoa.UNome}</td>
        <td>{data.Pessoa.Data_Nascimento}</td>
        <td>{data.Pessoa.Codigo_Postal}</td>
        <td>{data.Pessoa.Cidade}</td>
        <td>{data.Pessoa.Localização}</td>
        <td>{data.Pessoa.Email}</td>
        <td>{data.Pontos}</td>
        <td>{data.Ranking}</td>
        <td><Button className="btn-simple btn-link p-1" type="button" variant="danger" onClick={()=>this.onDelete(data.ID_Util)}> <i className="fas fa-times"></i></Button></td>
        
    </tr>
    )
    });
    }

    onDelete(id)
    {
      Swal.fire({ title: 'Tem a certeza?',  text: 'Não poderá voltar a recuperar o utilizador',  type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, Apagar !',
        cancelButtonText: 'Não, Manter!'
        }).then((result) => {
          if (result.value) {
          this.senddeleteutil(id)
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelado',
               'O Utilizador não foi apagado',
              'error'
              )
              }
              })
    }

    senddeleteutil(userId)
    {
          // url do backend
          const baseUrl = "https://pint2021.herokuapp.com/Utilizadores/deleteutil"
          // network
          axios.post(baseUrl,{id:userId })
          .then(response =>{
          if (response.data.success) {
          Swal.fire(
          'Apagado!',
          'O Utilizador foi apagado com sucesso',
          'success'
          )
          this.loadutilizadores();

          }
          })
          .catch ( error => {
          alert("Error 325 ")
          })
    }


    loadutilizadores()
    {
      const idlocal=localStorage.getItem('idinstituicao');
      const idad=localStorage.getItem('idadmin');
      const idinst=localStorage.getItem('idinstituicao');
      console.log("idlocal",idlocal);
      console.log("idadmin",idad);
      console.log("idinst",idinst);
  
      const url = "https://pint2021.herokuapp.com/Utilizadores/listutilizadores/"+idinst;
  
      //listar utilizadores
      axios.get(url).then(res => {
        if(res.data.status==200){  
          const data=res.data.ListaUtilizadores;
          this.setState({ listautilizadores:data});
        }else{
          alert("Error Web Service!");
        
        }
          console.log(res)
        })
        .catch(error => {
          alert(error)
        }); 
    }
    
}

export default utilizadores;
