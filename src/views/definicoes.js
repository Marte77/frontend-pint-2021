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

class definicoes extends React.Component{
  constructor(props){
    super(props);
    this.state = {
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

    camponomeCriar:"",
    campocodpostalCriar:"",
    campodescricaoCriar:"",
    campourlimgCriar:"",
    campolocaliCriar:"",
    campolongitude:"",
    campolatitude:"",
    
    }
  }
  onDelete(id){
        Swal.fire({
        title: 'Tem a certeza?',
        text: 'O alerta vai ser apagado',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, quero apagar !',
        cancelButtonText: 'Não, manter o alerta.'
        }).then((result) => {
        if (result.value) {
        this.sendDelete(id)
        } else if (result.dismiss === 
        Swal.DismissReason.cancel) {
        Swal.fire(
        'Cancelado',
        'O alerta continua seguro.'
        )
        }
        })
        }
        sendDelete(userId)
        {
        const baseUrl = "http://localhost:3000/Filme/delete" 
        axios.post(baseUrl,{
        id:userId
        })
        .then(response =>{
        if (response.data.success) {
        Swal.fire(
        'Apagado!',
        'O alerta foi apagado com sucesso'
        )
        this.loadFilme()
        }
        })
        .catch ( error => {
        alert("Error 325 ")
        })    
    } 

    componentDidMount(){

   
    
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
                        <Form.Control value={this.state.camponome} placeholder="Nome" type="text"></Form.Control>
                      </Form.Group>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control value={this.state.campoemail} placeholder="Email" type="email"></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Telefone</label>
                        <Form.Control value={this.state.campotelefone} placeholder="Número telefone" type="number"></Form.Control>
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
                      <input style={{width:'115%'}} value={this.state.campopoucoinst} type="number" id="InstituicaoPouco" name="InstituicaoPouco"></input>

                  </Col>
                 
                  <Col md="2">
                  <p3>Moderado</p3>
                      <br></br>
                      <input style={{width:'115%'}} value={this.state.campomoderadoinst} type="number" id="InstituicaoPouco" name="InstituicaoPouco"></input>
                  </Col>
                  
                  <Col md="2">
                  <p3>Elevado</p3>
                      <br></br>
                      <input style={{width:'115%'}}  value={this.state.campoelevadoinst} type="number" id="InstituicaoPouco" name="InstituicaoPouco"></input>
                  </Col>
                </Row>
                
              </Card.Body>
                </Col>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Descrição</label>
                        <Form.Control value={this.state.campodescricao} placeholder="Texto" type="text"></Form.Control>
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
                          <button >
                          <i class="fas fa-plus-circle" style={{color:'black'}}></i><b style={{color:'black', paddingLeft:'5%'}} >Adicionar</b></button>

                        </div>
                        </p>
                    </div>
                </form>
                </Row>
               
                  <br/>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Atualizar Dados
                  </Button>
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
                      <th></th>
                      <th className="border-0">Nº Local</th>
                      <th className="border-0">Local</th>
                      <th className="border-0">cod_postal</th>
                      <th className="border-0">Desc</th>
                      <th className="border-0">URL Imagem</th>
                      <th className="border-0">Localização</th>
                      <th className="border-0">Longitude</th>
                      <th className="border-0">Latitude</th>

                    </tr>
                  </thead>
                   <tbody id="table-scroll">
                   {this.loadFillDataLocaisExt()}
                  </tbody>
                </Table>
                </div>
                <a class="button7" href="#popup3"><i class="fas fa-plus-circle" ></i>Adicionar</a>
                  <a class="button8" href="#popup4"><i class="fas fa-edit"></i>Alterar</a>
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
                      <th></th>
                      <th className="border-0">Nº Local</th>
                      <th className="border-0">Nome</th>
                      <th className="border-0">Descrição</th>
                      <th className="border-0">Piso</th>
                      <th className="border-0">Local</th>

                      
                    </tr>
                  </thead>
                   <tbody id="table-scroll">
                   {this.loadFillDataLocaiInt()}
                  </tbody>
                </Table>
                </div>
                <a class="button7" href="#popup1"><i class="fas fa-plus-circle" ></i>Adicionar</a>
                  <a class="button8" href="#popup2"><i class="fas fa-edit"></i>Alterar</a>
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
                    </tr>
                  </thead>
                  <tbody>
                  {this.loadalertas()}

                    
                  </tbody>
                </Table>
                <br/>
                </div>

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
                        <Form.Control
                          defaultValue=""
                          placeholder="Nome local interior"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Descrição</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Descricao"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Piso</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Ex. 1,2"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="10">
                    <Form.Group>
                        <label>Pertence ao local Exterior :</label>
                        <br/>
                   <select>
                     <option value="1">palacio do gelo</option>
                    <option  value="2">visabeira</option>
                    <option  value="3">parque</option>
                  </select>
                
                      </Form.Group>

                    </Col>
                  </Row>
               <br/>
                  <Button
                    className="btn-fill pull-left" 
                    type="submit"
                    variant="info"
                  >
                    Guardar local interior 
                  </Button>
                  
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
                        <Form.Control
                          defaultValue=""
                          placeholder="Nome local interior"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Descrição</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Descricao"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Piso</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Ex. 1,2"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

               <br/>
                  <Button
                    className="btn-fill pull-left" 
                    type="submit"
                    variant="info"
                  >
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
                        <Form.Control
                          defaultValue=""
                          placeholder="Nome local exterior"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                  </Row> 
                 <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Código Postal</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="ex: 2340200"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Descrição</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Descricao"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>  
                  </Row>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>URL Imagem</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="http://imagem.com"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Localização</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="ex: viseu"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Longitude</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="-7.9128371289"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Latitude</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="40.3871233"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>  
                    
                  </Row>
               <br/>
                  <Button
                    className="btn-fill pull-left" 
                    type="submit"
                    variant="info"
                  >
                    Atualizar local exterior 
                  </Button>
                  
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



loadFillDataLocaisExt()
{
  return this.state.listlocaisoutdoor.map((data, index)=>{
    return(
    <tr key={index}>
       <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                            <Form.Check.Input    defaultValue=""   type="checkbox" ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                      </td>
        <th>{data.ID_Local}</th>
        <td>{data.Nome}</td>
        <td>{data.Codigo_Postal}</td>
        <td>{data.Descricao}</td>
        <td>{data.URL_Imagem}</td>
        <td>{data.Localizacao}</td>
        <td>{data.Longitude}</td>
        <td>{data.Latitude}</td>
    </tr>
    )
    });
    }

    loadFillDataLocaiInt()
    {
      return this.state.listlocaisindoor.map((data2, index)=>{
        return(
        <tr key={index}>
           <td>
                              <Form.Check className="mb-1 pl-0">
                                <Form.Check.Label>
                                <Form.Check.Input    defaultValue=""   type="checkbox" ></Form.Check.Input>
                                  <span className="form-check-sign"></span>
                                </Form.Check.Label>
                              </Form.Check>
                          </td>
            <th>{data2.ID_Local_Indoor}</th>
            <td>{data2.Nome}</td>
            <td>{data2.Descricao}</td>
            <td>{data2.Piso}</td>
            <td>{data2.Local.Nome}</td>
            
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
            
        </tr>
        )
        });
      
    }
}

export default definicoes;
