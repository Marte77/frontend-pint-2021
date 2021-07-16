import React from "react";
import ChartistGraph from "react-chartist";
import './style_auxiliar.css';
import './style_popup.css';
import './stylesD.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import axios from 'axios';
import { Link } from "react-router-dom";
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
import { CardBody } from "reactstrap";

class definicoes extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    idatualizarlocal:0,
    
    camponome:"",
    campoemail:"",
    campotelefone:"",
    campopoucoinst:"",
    campomoderadoinst:"",
    campoelevadoinst:"",
    campodescricao:"",
    listlocaisoutdoor:[],
    listlocaisindoor:[],
    listaalertas:[],
    listainstituicoes:[],
    listatipoalertas:[],
    
    //Criar local exterior
    camponomeCriar:"",
    campocodpostalCriar:"",
    campodescricaoCriar:"",
    campourlimgCriar:"",
    campolocaliCriar:"",
    campolongitude:"",
    campolatitude:"",

    //Criar local interior
    camponomeCriarindoor:"",
    campodescricaoCriarindoor:"",
    campopisocriar:"",
    

    //editar local exterior
    camponomeedit:"",
    campocodpostaledit:"",
    campodescricaoedit:"",
    campourlimgedit:"",
    campolocaliedit:"",
    campolongitudeedit:"",
    campolatitudeedit:"",

     //editar local interior
     camponomeeditint:"",
     campodescricaoeditint:"",
     campopisoeditint:"",
     
     //criar alerta
     campodescricaoalertacriar:"",

     //editar alerta
     campoalertaeditar:"",
    }
  }
 
    componentDidMount(){

      this.Loaddeletealerta()
      this.LoadLocaisDelete()
      this.LoadLocaisintDelete()
      this.loadFillDatatipoalerta_option()
      const idlocal=localStorage.getItem('idinstituicao');
      const idad=localStorage.getItem('idadmin');
      const idinst=localStorage.getItem('idinstituicao');
      console.log("idlocal",idlocal);
      console.log("idadmin",idad);
      console.log("idinst",idinst);

      const url4="https://pint2021.herokuapp.com/Instituicao/get_instituicoes/"+idinst;
      const url3="https://pint2021.herokuapp.com/Alertas/listalertas/"+idinst;
      const url2 = "https://pint2021.herokuapp.com/Locais/listlocaisindoor/"+idinst;
      const url = "https://pint2021.herokuapp.com/Locais/listlocaisout/"+idinst;
      const url5="http://localhost:3000/Alertas/gettipoalerta";
      console.log('url4',url4);
      axios.get(url).then(res => {
      if(res.data.status==200){
      const data = res.data.LocaisInst;
      this.setState({ listlocaisoutdoor:data });
      }else{
      alert("Error Web Service!");
      }
      console.log(res)
      })
      .catch(error => {
      alert(error)
      });

      //lista de locais indoor
        axios.get(url2).then(res => {
        if(res.data.status==200){  
        const data2=res.data.LocaisIndor;
        this.setState({ listlocaisindoor:data2});
        }else{
        alert("Error Web Service!");
        
        }
        console.log(res)
        })
        .catch(error => {
        alert(error)
        });

        
    //lista de alertas
      axios.get(url3).then(res => {
        if(res.data.status==200){  
        const data3=res.data.Alertas;
        this.setState({ listaalertas:data3});
      }else{
      alert("Error Web Service!");
      }
      console.log(res)
      })
      .catch(error => {
      alert(error)
      });
      
      //Lista tipo alertas
      axios.get(url5).then(res => {
        if(res.status==200){  
        const data5=res.data.ListipoAlertas;
        this.setState({ listatipoalertas:data5});
      }else{
      alert("Error Web Service!");
      }
      console.log(res)
      })
      .catch(error => {
      alert(error)
      });

    
      // Instituição pelo ID
      /*axios.get(url4).then(res => {
        if(res.status==200){  
        console.log("Entrou",1);
        const data4=res.data.Instituicoes;
        this.setState({ listainstituicoes:data4});
      }else{
      alert("Error Web Service!");
      }
      console.log(res)
      })
      .catch(error => {
      alert(error)
      });*/

        //apresentar definições da instituição
        axios.get(url4).then(res => {
          if(res.status==200){ 
             const data=res.data.Instituicoes[0];
             
             this.setState({
               
               camponome:data.Nome,
               campoemail:data.Email,
               campotelefone:data.Telefone,
               campopoucoinst:data.Lotacao_Pouco,
               campomoderadoinst:data.Lotacao_Moderado,
               campoelevadoinst:data.Lotacao_Elevado,
               campodescricao:data.Descricao,
               
             })
             console.log('camponome',this.state.camponome);
          }
          else {
            alert("Error web service")
            }
        })
        .catch(error=>{
          alert("Error server: "+error)
          })
      }

   render(){
    

  return (
    <>
      <Container fluid>
 <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Atualizar Instituição</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Instituição</label>
                        <Form.Control value={this.state.camponome} onChange={(value)=>this.setState({camponome:value.target.value})} placeholder="Nome" type="text"></Form.Control>

                      </Form.Group>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control value={this.state.campoemail} onChange={(value)=>this.setState({campoemail:value.target.value})} placeholder="Email" type="email"></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Telefone</label>
                        <Form.Control value={this.state.campotelefone} onChange={(value)=>this.setState({campotelefone:value.target.value})} placeholder="Número telefone" type="number"></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Col md="8">
           
                
              <Card.Body>
                <Row style={{marginRight:'0%', marginLeft:'-4%'}}>
                <Col md="5" ><br/><p3>Limites de lotação da instituição:</p3></Col>
                  <Col md="2" >
                      <p3>Pouco</p3>
                      <br></br>
                      <input style={{width:'115%'}} value={this.state.campopoucoinst} onChange={(value)=>this.setState({campopoucoinst:value.target.value})} type="number" id="InstituicaoPouco" name="InstituicaoPouco"></input>

                  </Col>
                 
                  <Col md="2">
                  <p3>Moderado</p3>
                      <br></br>
                      <input style={{width:'115%'}} value={this.state.campomoderadoinst} onChange={(value)=>this.setState({campomoderadoinst:value.target.value})} type="number" id="InstituicaoPouco" name="InstituicaoPouco"></input>
                  </Col>
                  
                  <Col md="2">
                  <p3>Elevado</p3>
                      <br></br>
                      <input style={{width:'115%'}}  value={this.state.campoelevadoinst} onChange={(value)=>this.setState({campoelevadoinst:value.target.value})} type="number" id="InstituicaoPouco" name="InstituicaoPouco"></input>
                  </Col>
                </Row>
                
              </Card.Body>
                </Col>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Descrição</label>
                        <Form.Control value={this.state.campodescricao} onChange={(value)=>this.setState({campodescricao:value.target.value})} placeholder="Texto" type="text"></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{paddingLeft:'2%'}}>                 
                  <form class="row row-cols-lg-auto g-3 align-items-center">
                    <div class="col-12">
                      <p>
                        
                        <div class="input-group">
                        <b style={{paddingRight:'5%', paddingTop:'1.5%'}}>Imagem:</b>

                          <div class="input-group-text"><i class="fas fa-file-image"></i></div>
                          <button onClick={()=>this.importData()}>
                          <i class="fas fa-plus-circle"  style={{color:'black'}}></i><b style={{color:'black', paddingLeft:'5%'}} >Adicionar</b></button>

                        </div>
                        </p>
                    </div>
                </form>
                </Row>
               
                  <br/>
                  <Button  className="btn-fill pull-right" type="submit" variant="info" onClick={()=>this.saveInstituicao()}> Atualizar Dados</Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Locais </Card.Title>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_style_utilizadorespendentes">
                    Ordenar &nbsp;
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Ascendente</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Descendente</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <div id="table-scroll">
                <Table className="table-hover" id="table-scroll">
               
                  <thead>
                    <tr>
                      <th className="border-0">Nº Local</th>
                      <th className="border-0">Local</th>
                      <th className="border-0">cod_postal</th>
                      <th className="border-0">Desc</th>
                      <th className="border-0">URL Imagem</th>
                      <th className="border-0">Localização</th>
                      <th className="border-0">Longitude</th>
                      <th className="border-0">Latitude</th>
                      <th>Editar</th>
                      <th>Eliminar</th>

                    </tr>
                  </thead>
                   <tbody id="table-scroll">
                   {this.loadFillDataLocaisExt()}
                  </tbody>
                </Table>
                </div>
                <a class="button7" href="#popup3"><i class="fas fa-plus-circle" ></i>Adicionar</a>
                 
                <br/>
                <br/>
                
                        
              </Card.Body>
            </Card>
          </Col>
          </Row>
    <Row>
                   <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Locais Interior</Card.Title>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_style_utilizadorespendentes">
                    Ordenar &nbsp;
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Ascendente</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Descendente</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <div id="table-scroll">
                <Table className="table-hover" id="table-scroll">
               
                  <thead>
                    <tr>
                      
                      <th className="border-0">Nº Local</th>
                      <th className="border-0">Nome</th>
                      <th className="border-0">Descrição</th>
                      <th className="border-0">Piso</th>
                      <th className="border-0">Local</th>
                      <th className="border-0">Editar</th>
                      <th className="border-0">Eliminar</th>

                      
                    </tr>
                  </thead>
                   <tbody id="table-scroll">
                   {this.loadFillDataLocaiInt()}
                  </tbody>
                </Table>
                </div>
                <a class="button7" href="#popup1"><i class="fas fa-plus-circle" ></i>Adicionar</a>
                  
                <br/>
                <br/>

              </Card.Body>
            </Card>
          </Col>
          </Row>



          <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Lista de Alertas</Card.Title>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_style_utilizadorespendentes">
                    Ordenar por:
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Data Asc.</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Data Desc.</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
               <div id="table-scroll">
                <Table className="table-hover" id="table-scroll">
                  <thead>
                    <tr>
                      
                      <th className="border-0">ID Alerta</th>
                      <th className="border-0">Descrição</th>
                      <th className="border-0">Data</th>
                      <th className="border-0">Local</th>
                      <th className="border-0">Admin</th>
                      <th className="border-0">Tipo de Alerta</th>
                      <th className="border-0">Remover</th>

                    </tr>
                  </thead>
                  <tbody>
                  {this.loadalertas()}

                    
                  </tbody>
                </Table>
                <br/>
                </div>
                <a class="button7" href="#popupalertaCriar"><i class="fas fa-plus-circle" ></i>Adicionar</a>
               

<div id="popup1" class="overlay">
  <div class="popup">
    <h2>Adicionar local</h2>
    <a class="close" href="#">&times;</a>
    <div class="content">
      <p>Preencha os dados do local interior :</p>
    </div>
    <Form>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Local Interior</label>
                        <Form.Control  defaultValue="" value={this.state.camponomeCriarindoor} onChange={(value)=>this.setState({camponomeCriarindoor:value.target.value})}   placeholder="Nome local interior"    type="text" ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Descrição</label>
                        <Form.Control  defaultValue="" value={this.state.campodescricaoCriarindoor} onChange={(value)=>this.setState({campodescricaoCriarindoor:value.target.value})} placeholder="Descricao"  type="text" ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Piso</label>
                        <Form.Control  defaultValue="" value={this.state.campopisocriar} onChange={(value)=>this.setState({campopisocriar:value.target.value})} placeholder="Ex. 1,2" type="text"   ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="10">
                    <Form.Group>
                        <label>Pertence ao local Exterior :</label>
                        <br/>
                  <select id="optionlocalindoor">
                  {this.loadFillDataLocaisExt_option()}

                  </select>
                 
                
                      </Form.Group>

                    </Col>
                  </Row>
               <br/>
                  <Button className="btn-fill pull-left"   type="submit" variant="info" onClick={()=>this.sendSaveLocaisIndoor()}>Guardar local interior </Button>
                  
                  </Form>
  </div>
</div>
<div id="popup2" class="overlay">
  <div class="popup">
    <h2>Alterar Local</h2>
    <a class="close" href="#">&times;</a>
    <div class="content">
      <p>Altere os dados do local interior :</p>
    </div>
    <Form>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Local Interior</label>
                        <Form.Control defaultValue="" defaultValue="" value={this.state.camponomeeditint} onChange={(value)=>this.setState({camponomeeditint:value.target.value})} placeholder="Nome local interior"  type="text" ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Descrição</label>
                        <Form.Control defaultValue="" defaultValue="" value={this.state.campodescricaoeditint} onChange={(value)=>this.setState({campodescricaoeditint:value.target.value})} placeholder="Descricao"   type="text"></Form.Control>
                      </Form.Group>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Piso</label>
                        <Form.Control defaultValue="" defaultValue="" value={this.state.campopisoeditint} onChange={(value)=>this.setState({campopisoeditint:value.target.value})} placeholder="Ex. 1,2" type="text" ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

               <br/>
                  <Button
                    className="btn-fill pull-left" onClick={()=>this.saveAtualizarLocalInt()}  type="submit"  variant="info" >
                    Efetuar alteração
                  </Button>
                  
                  </Form>
  </div>
</div>



<div id="popup3" class="overlay">
  <div class="popup">
    <h2>Adicionar local exterior</h2>
    <a class="close" href="#">&times;</a>
    <div class="content">
      <p>Preencha os dados do local exterior :</p>
    </div>
    <Form>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Local Exterior</label>
                        <Form.Control defaultValue="" value={this.state.camponomeCriar} onChange={(value)=>this.setState({camponomeCriar:value.target.value})} placeholder="Nome local exterior" type="text" ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                  </Row> 
                 <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Código Postal</label>
                        <Form.Control defaultValue=""  value={this.state.campocodpostalCriar} onChange={(value)=>this.setState({campocodpostalCriar:value.target.value})} placeholder="ex: 2340200" type="text"></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Descrição</label>
                        <Form.Control  defaultValue="" value={this.state.campodescricaoCriar} onChange={(value)=>this.setState({campodescricaoCriar:value.target.value})} placeholder="Descricao" type="text"></Form.Control>
                      </Form.Group>
                    </Col>  
                  </Row>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>URL Imagem</label>
                        <Form.Control defaultValue="" value={this.state.campourlimgCriar} onChange={(value)=>this.setState({campourlimgCriar:value.target.value})} placeholder="http://imagem.com" type="text"></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Localização</label>
                        <Form.Control defaultValue=""  value={this.state.campolocaliCriar} onChange={(value)=>this.setState({campolocaliCriar:value.target.value})} placeholder="ex: viseu" type="text"></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Longitude</label>
                        <Form.Control defaultValue="" value={this.state.campolongitude} onChange={(value)=>this.setState({campolongitude:value.target.value})} placeholder="-7.9128371289" type="text" ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Latitude</label>
                        <Form.Control defaultValue="" value={this.state.campolatitude} onChange={(value)=>this.setState({campolatitude:value.target.value})} placeholder="40.3871233" type="text"   ></Form.Control>
                      </Form.Group>
                    </Col>  
                    
                  </Row>
               <br/>
                  <Button className="btn-fill pull-left"   type="submit"  variant="info" onClick={()=>this.sendSaveLocais()}>Guardar local exterior </Button>
                  
                  </Form>
  </div>
</div>

<div id="popupalertaCriar" class="overlay">
  <div class="popup">
    <h2>Adicionar Alerta</h2>
    <a class="close" href="#">&times;</a>
    <div class="content">
      <p>Preencha os dados do alerta :</p>
    </div>
    <Form>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Descrição</label>
                        <Form.Control defaultValue="" value={this.state.campodescricaoalertacriar} onChange={(value)=>this.setState({campodescricaoalertacriar:value.target.value})}  placeholder="Nome local exterior" type="text" ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                  </Row> 
                 
                  
                  <Row>
                  <Col className="pr-1" md="10">
                    <Form.Group>
                        <label>Local do alerta :</label>
                        <br/>
                  <select id="optionlocalalerta">
                  {this.loadFillDataalertaLocal_option()}

                  </select>
                 
                
                      </Form.Group>

                    </Col>
                    
                  </Row>

                  <Row>
                  <Col className="pr-1" md="10">
                    <Form.Group>
                        <label>Tipo do alerta :</label>
                        <br/>
                  <select id="optiontioalerta">
                    {this.loadFillDatatipoalerta_option()}

                  </select>
                  
                
                      </Form.Group>

                    </Col>
                    
                  </Row>
               <br/>
                  <Button className="btn-fill pull-left"   type="submit"  variant="info" onClick={()=>this.sendsavealertas()}>Guardar Alerta </Button>
                  
                  </Form>
  </div>
</div>




<div id="popup4" class="overlay">
  <div class="popup">
    <h2>Atualizar local exterior</h2>
    <a class="close" href="#">&times;</a>
    <div class="content">
      <p>Atualizar dados do local exterior :</p>
    </div>
    <Form>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Local Exterior</label>
                        <Form.Control defaultValue="" value={this.state.camponomeedit} onChange={(value)=>this.setState({camponomeedit:value.target.value})}  placeholder="Nome local exterior"  type="text" ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                  </Row> 
                 <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Código Postal</label>
                        <Form.Control defaultValue="" value={this.state.campocodpostaledit} onChange={(value)=>this.setState({campocodpostaledit:value.target.value})}  placeholder="ex: 2340200"  type="text" ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Descrição</label>
                        <Form.Control    defaultValue="" value={this.state.campodescricaoedit} onChange={(value)=>this.setState({campodescricaoedit:value.target.value})}  placeholder="Descricao"     type="text" ></Form.Control>
                      </Form.Group>
                    </Col>  
                  </Row>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>URL Imagem</label>
                        <Form.Control defaultValue="" value={this.state.campourlimgedit} onChange={(value)=>this.setState({campourlimgedit:value.target.value})} placeholder="http://imagem.com" type="text" ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Localização</label>
                        <Form.Control  defaultValue="" value={this.state.campolocaliedit} onChange={(value)=>this.setState({campolocaliedit:value.target.value})}  placeholder="ex: viseu"  type="text" ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Longitude</label>
                        <Form.Control defaultValue="" value={this.state.campolongitudeedit} onChange={(value)=>this.setState({campolongitudeedit:value.target.value})}  placeholder="-7.9128371289"  type="text"  ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Latitude</label>
                        <Form.Control defaultValue="" value={this.state.campolatitudeedit} onChange={(value)=>this.setState({campolatitudeedit:value.target.value})}  placeholder="40.3871233"  type="text" ></Form.Control>
                      </Form.Group>
                    </Col>  
                    
                  </Row>
               <br/>
                  <Button  className="btn-fill pull-left"    type="submit" variant="info" onClick={()=>this.saveAtualizarLocal()} >  Atualizar local exterior   </Button>
                  
                  </Form>
  </div>
</div>

<div id="popupatualizaralerta" class="overlay">
  <div class="popup">
    <h2>Atualizar local exterior</h2>
    <a class="close" href="#">&times;</a>
    <div class="content">
      <p>Atualizar dados do alerta :</p>
    </div>
    <Form>
                  
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Descrição</label>
                     <Form.Control defaultValue="" value={this.state.campolongitudeedit} onChange={(value)=>this.setState({campolongitudeedit:value.target.value})}  placeholder="Pequena Descrição"  type="text"  ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                  <Form.Group>
                        <label>Local do alerta :</label>
                        <br/>
                  <select id="optionlocalalerta">
                  {this.loadFillDataalertaLocal_option()}

                  </select>
                 
                
                      </Form.Group>
                  </Row>
               <br/>
                  <Button  className="btn-fill pull-left"    type="submit" variant="info" onClick={()=>this.saveAtualizarLocal()} >  Atualizar local exterior   </Button>
                  
                  </Form>
  </div>
</div>





              </Card.Body>
            </Card>
          </Col>
          </Row>
      </Container>
    </>
  );
}


saveInstituicao()
{
  
    
    const idinst=localStorage.getItem('idinstituicao');
    const url="https://pint2021.herokuapp.com/Instituicao/updateinstituicao/"+idinst
    const datapost={
      nomeinst:this.state.camponome,
      emailinst:this.state.campoemail,
      telefoneinst:this.state.campotelefone,
      poucoinst:this.state.campopoucoinst,
      moderadoinst:this.state.campomoderadoinst,
      elevadoinst:this.state.campoelevadoinst,
      descrinst:this.state.campodescricao,
      

    }

    axios.post(url,datapost)
    .then(response=>{
    if (response.data.success===true) {
    alert(response.data.message)
    window.location.replace("http://localhost:3001/admin/definicoes")
    }
    else {
    alert(response.data.message)
    }
    }).catch(error=>{
    alert("Error 34 "+error)
    })
    

     
  
}

sendsavealertas()
{
  var a=document.getElementById("optionlocalalerta");
  var idlocal=a.value;

  var b=document.getElementById("optiontioalerta");
  var idtipoalerta=b.value

  var datetime=new Date();
  if(this.state.campodescricaoalertacriar==="")
  {
    alert("Insira a descrição do alerta")
  }
  else{
    const idad=localStorage.getItem('idadmin');
    const url="https://pint2021.herokuapp.com/Alertas/createalertaweb"
    const datapost={
      Descricao:this.state.campodescricaoalertacriar,
      dataalerta:datetime,
      LocalIDLocal:idlocal,
      AdminIDAdmin:idad,
      TipoAlertaIDTipoAlerta:idtipoalerta
    }
    axios.post(url,datapost)
      .then(response=>{
      if (response.data.success===true) {
      alert(response.data.message)
      window.location.replace("http://localhost:3001/admin/definicoes")
      }
      else {
      alert(response.data.message)
      }
      }).catch(error=>{
      alert("Error 34 "+error)
      })
  }
}
sendSaveLocaisIndoor()
{
  console.log("testebutton")
  var e=document.getElementById("optionlocalindoor");
  var idlocalis=e.value;
  if(this.state.camponomeCriarindoor==="")
  {
    alert("Insira o nome do local indoor")
  }
  if(this.state.campodescricaoCriarindoor==="")
  {
    alert("Insira a descrição do local indoor")
  }
  if(this.state.campopoucoinst==="")
  {
    alert("Insira o piso do local indoor")
  }
  else{

    const idinst=localStorage.getItem('idinstituicao');
    const url="https://pint2021.herokuapp.com/Locais/criarLocalWebINDOOR"
    const datapost={
      nome:this.state.camponomeCriarindoor,
      descricao:this.state.campodescricaoCriarindoor,
      piso:this.state.campopisocriar,
      idlocal:idlocalis

    }
     axios.post(url,datapost)
      .then(response=>{
      if (response.data.success===true) {
      alert(response.data.message)
      window.location.replace("http://localhost:3001/admin/definicoes")
      }
      else {
      alert(response.data.message)
      }
      }).catch(error=>{
      alert("Error 34 "+error)
      })
      }
}



sendSaveLocais()
{
  if(this.state.camponomeCriar==="")
  {
    alert("Insira o nome do local")
  }
  if(this.state.campocodpostalCriar==="")
  {
    alert("Insira o código postal do local")
  }
  if(this.state.campodescricaoCriar==="")
  {
    alert("Insira a descrição do local")
  }
  if(this.state.campourlimgCriar==="")
  {
    alert("Insira o url da imagem do local")
  }
  if(this.state.campolocaliCriar==="")
  {
    alert("Insira a localização do local")
  }
  if(this.state.campolongitude==="")
  {
    alert("Insira a longitude do local")
  }
  if(this.state.campolatitude==="")
  {
    alert("Insira a latitude do local")
  }
  else{
    const idinst=localStorage.getItem('idinstituicao');
    const url="https://pint2021.herokuapp.com/Locais/criarLocalWeb"
    const datapost={
      nome:this.state.camponomeCriar,
      codigopostal:this.state.campocodpostalCriar,
      descricao:this.state.campodescricaoCriar,
      urlimagem:this.state.campourlimgCriar,
      localizacao:this.state.campolocaliCriar,
      longitude:this.state.campolongitude,
      latitude:this.state.campolatitude,
      idinstituicao:idinst
    }
     axios.post(url,datapost)
      .then(response=>{
      if (response.data.success===true) {
      alert(response.data.message)
      window.location.replace("http://localhost:3001/admin/definicoes")
      }
      else {
      alert(response.data.message)
      }
      }).catch(error=>{
      alert("Error 34 "+error)
      })
      }
  }

  loadFillDataLocaisExt_option()
  {
    return this.state.listlocaisoutdoor.map((data, index)=>{
      return(
        
          <option  key={index} value={data.ID_Local}>{data.Nome}</option>
        
      )
      });
      }
      loadFillDatatipoalerta_option()
      {
        return this.state.listatipoalertas.map((data, index)=>{
          return(
            
              <option  key={index} value={data.ID_TipoAlerta}>{data.Tipo_Alerta}</option>
            
          )
          });
          }

 loadFillDataalertaLocal_option()
      {
        return this.state.listlocaisoutdoor.map((data, index)=>{
          return(
            
              <option  key={index} value={data.ID_Local}>{data.Nome}</option>
            
          )
          });
          }



loadFillDataLocaisExt()
{
  return this.state.listlocaisoutdoor.map((data, index)=>{
    return(
    <tr key={index}>
        
        <th>{data.ID_Local}</th>
        <td>{data.Nome}</td>
        <td>{data.Codigo_Postal}</td>
        <td>{data.Descricao}</td>
        <td>{data.URL_Imagem}</td>
        <td>{data.Localizacao}</td>
        <td>{data.Longitude}</td>
        <td>{data.Latitude}</td>
        <td><a class="" href="#popup4" onClick={()=>this.getlocal(data.ID_Local)} ><i class="fas fa-edit"></i></a></td>
        <td><a class=""  onClick={()=>this.onDeleteLocal(data.ID_Local)}><i class="far fa-trash-alt"></i></a></td>      

    </tr>
    )
    });
    }
    onDeleteLocal(id)
    {
      Swal.fire({ title: 'Tem a certeza?',  text: 'Não poderá voltar a recuperar o Local',  type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, Apagar !',
        cancelButtonText: 'Não, Manter!'
        }).then((result) => {
          if (result.value) {
          this.sendDeleteLocal(id)
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelado',
               'O Local não foi apagado',
              'error'
              )
              }
              })
    }
    onDeleteLocalint(id)
    {
      Swal.fire({ title: 'Tem a certeza?',  text: 'Não poderá voltar a recuperar o Local',  type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, Apagar !',
        cancelButtonText: 'Não, Manter!'
        }).then((result) => {
          if (result.value) {
          this.sendDeleteLocalint(id)
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelado',
               'O Local não foi apagado',
              'error'
              )
              }
              })
    }
    ondeleteAlerta(id)
    {
      Swal.fire({ title: 'Tem a certeza?',  text: 'Não poderá voltar a recuperar o ALERTA',  type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, Apagar !',
        cancelButtonText: 'Não, Manter!'
        }).then((result) => {
          if (result.value) {
          this.senddeletalerta(id)
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelado',
               'O Local não foi apagado',
              'error'
              )
              }
              })
    }
    senddeletalerta(userid)
    {
       // url do backend
       const baseUrl = "https://pint2021.herokuapp.com/Alertas/deletalerta"
       // network
       axios.post(baseUrl,{id:userid })
       .then(response =>{
       if (response.data.success) {
       Swal.fire(
       'Apagado!',
       'O alerta foi apagado com sucesso',
       'success'
       )
       this.Loaddeletealerta();

       }
       })
       .catch ( error => {
       alert("Error 325 ")
       })
    }
    sendDeleteLocalint(userId)
    {
        // url do backend
        const baseUrl = "https://pint2021.herokuapp.com/Locais/deleteLocalInt"
        // network
        axios.post(baseUrl,{id:userId })
        .then(response =>{
        if (response.data.success) {
        Swal.fire(
        'Apagado!',
        'O Local foi apagado com sucesso',
        'success'
        )
        this.LoadLocaisintDelete();

        }
        })
        .catch ( error => {
        alert("Error 325 ")
        })
    }
    sendDeleteLocal(userId)
    {
          // url do backend
          const baseUrl = "https://pint2021.herokuapp.com/Locais/deleteLocal"
          // network
          axios.post(baseUrl,{id:userId })
          .then(response =>{
          if (response.data.success) {
          Swal.fire(
          'Apagado!',
          'O Local foi apagado com sucesso',
          'success'
          )
          this.LoadLocaisDelete();

          }
          })
          .catch ( error => {
          alert("Error 325 ")
          })
    }

    Loaddeletealerta()
    {
      const idlocal=localStorage.getItem('idinstituicao');
      const idad=localStorage.getItem('idadmin');
      const idinst=localStorage.getItem('idinstituicao');
      const url3="https://pint2021.herokuapp.com/Alertas/listalertas/"+idinst;

      axios.get(url3).then(res => {
        if(res.data.status==200){  
        const data3=res.data.Alertas;
        this.setState({ listaalertas:data3});
      }else{
      alert("Error Web Service!");
      }
      console.log(res)
      })
      .catch(error => {
      alert(error)
      });

    }

    LoadLocaisintDelete()
    {
      const idlocal=localStorage.getItem('idinstituicao');
      const idad=localStorage.getItem('idadmin');
      const idinst=localStorage.getItem('idinstituicao');
      console.log("idlocal",idlocal);
      console.log("idadmin",idad);
      console.log("idinst",idinst);
      const url2 = "https://pint2021.herokuapp.com/Locais/listlocaisindoor/"+idinst;
      axios.get(url2).then(res => {
        if(res.data.status==200){  
        const data2=res.data.LocaisIndor;
        this.setState({ listlocaisindoor:data2});
        }else{
        alert("Error Web Service!");
        
        }
        console.log(res)
        })
        .catch(error => {
        alert(error)
        });
    }
    LoadLocaisDelete()
    {
      const idlocal=localStorage.getItem('idinstituicao');
      const idad=localStorage.getItem('idadmin');
      const idinst=localStorage.getItem('idinstituicao');
      console.log("idlocal",idlocal);
      console.log("idadmin",idad);
      console.log("idinst",idinst);
      const url = "https://pint2021.herokuapp.com/Locais/listlocaisout/"+idinst;
      axios.get(url).then(res => {
        if(res.data.status==200){
        const data = res.data.LocaisInst;
        this.setState({ listlocaisoutdoor:data });
        }else{
        alert("Error Web Service!");
        }
        console.log(res)
        })
        .catch(error => {
        alert(error)
        });
    }
    saveAtualizarLocal()
    {
      let id=this.state.idatualizarlocal;
      const url="https://pint2021.herokuapp.com/Locais/updatelocais/"+id
      const datapost = {
        nome : this.state.camponomeedit,
        cp : this.state.campocodpostaledit,
        descri : this.state.campodescricaoedit,
        urlimg : this.state.campourlimgedit,
        locali : this.state.campolocaliedit,
        long : this.state.campolongitudeedit,
        lati : this.state.campolatitudeedit,
        }
        axios.post(url,datapost)
        .then(response=>{
          if (response.data.success===true) {
          alert(response.data.message)
          window.location.replace("http://localhost:3001/admin/definicoes")

        }
        else {
          alert("Error")
        }
        }).catch(error=>{
          alert("Error 34 "+error)
        })
    }

    saveAtualizarLocalInt()
    {
      let id=this.state.idatualizarlocal;
      const url="https://pint2021.herokuapp.com/Locais/updatelocaisindoor/"+id
      const datapost = {
        nome : this.state.camponomeeditint,
        descri : this.state.campodescricaoeditint,
        piso:this.state.campopisoeditint,
        }
        axios.post(url,datapost)
        .then(response=>{
          if (response.data.success===true) {
          alert(response.data.message)
          window.location.replace("http://localhost:3001/admin/definicoes")

        }
        else {
          alert("Error")
        }
        }).catch(error=>{
          alert("Error 34 "+error)
        })
    }

    getlocal(idlocal)
    {
        this.state.idatualizarlocal=idlocal;
        const url="https://pint2021.herokuapp.com/Locais/getlocal/"+idlocal
        axios.get(url)
          .then(res=>{
          if (res.data.success) {
              const data = res.data.data[0]
              this.setState({
              datalocal:data,
              camponomeedit: data.Nome,
              campocodpostaledit:data.Codigo_Postal,
              campodescricaoedit:data.Descricao,
              campourlimgedit:data.URL_Imagem,
              campolocaliedit:data.Localizacao,
              campolongitudeedit:data.Longitude,
              campolatitudeedit:data.Latitude
          })
            console.log(JSON.stringify(data))
          }
          else {
            alert("Error web service")
          }
          })
            .catch(error=>{
            alert("Error server: "+error)
          })
    }
    getlocalint(idlocal)
    {
      this.state.idatualizarlocal=idlocal;
      const url="https://pint2021.herokuapp.com/Locais/getlocalint/"+idlocal
      console.log("url int",url)
      axios.get(url)
        .then(res=>{
        if (res.data.success) {
            const data = res.data.data[0]

            this.setState({
            datalocal:data,
            camponomeeditint:data.Nome,
            campodescricaoeditint:data.Descricao,
            campopisoeditint:data.Piso,
        })
          console.log(JSON.stringify(data))
        }
        else {
          alert("Error web service")
        }
        })
          .catch(error=>{
          alert("Error server: "+error)
        })
    }



    loadFillDataLocaiInt()
    {
      return this.state.listlocaisindoor.map((data2, index)=>{
        return(
        <tr key={index}>
           
            <th>{data2.ID_Local_Indoor}</th>
            <td>{data2.Nome}</td>
            <td>{data2.Descricao}</td>
            <td>{data2.Piso}</td>
            <td>{data2.Local.Nome}</td>
            <td><a class="" href="#popup2" onClick={()=>this.getlocalint(data2.ID_Local_Indoor)}  ><i class="fas fa-edit"></i></a></td>
           <td><a class="" onClick={()=>this.onDeleteLocalint(data2.ID_Local_Indoor)}><i class="far fa-trash-alt"></i></a></td>   
            
        </tr>
        )
        });
      
    }


    loadalertas()
    {
      return this.state.listaalertas.map((data2, index)=>{
        return(
        <tr key={index}>
            <th>{data2.ID_alerta}</th>
            <td>{data2.Descricao}</td>
            <td>{data2.Data}</td>
            <td>{data2.Local.Nome}</td>
            <td>{data2.AdminIDAdmin}</td>
            <td>{data2.Tipo_Alerta.Tipo_Alerta}</td>
           <td><a class="" onClick={()=>this.ondeleteAlerta(data2.ID_alerta)}><i class="far fa-trash-alt"></i></a></td>   
            
        </tr>
        )
        });
      
    }
     importData() {
      let input = document.createElement('input');
      input.type = 'file';
      input.onchange = _ => {
        // you can use this method to get file and perform respective operations
                let files =   Array.from(input.files);
                console.log(files);
            };
      input.click();
      
    }
}

export default definicoes;
