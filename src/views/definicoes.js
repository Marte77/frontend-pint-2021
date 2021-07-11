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
    listlocaisoutdoor:[]
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
                        <Form.Control
                          defaultValue=""
                          placeholder="Nome" 
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Telefone</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Número telefone"
                          type="number"
                        ></Form.Control>
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
                      <input style={{width:'115%'}} type="number" id="InstituicaoPouco" name="InstituicaoPouco"></input>

                  </Col>
                 
                  <Col md="2">
                  <p3>Moderado</p3>
                      <br></br>
                      <input style={{width:'115%'}} type="number" id="InstituicaoPouco" name="InstituicaoPouco"></input>
                  </Col>
                  
                  <Col md="2">
                  <p3>Elevado</p3>
                      <br></br>
                      <input style={{width:'115%'}} type="number" id="InstituicaoPouco" name="InstituicaoPouco"></input>
                  </Col>
                </Row>
                
              </Card.Body>
                </Col>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Descrição</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Texto"
                          type="text"
                        ></Form.Control>
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
                <Card.Title as="h4">Locais Exterior</Card.Title>
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
                      <th className="border-0">Local</th>
                      <th className="border-0">Total Reports</th>
                      
                    </tr>
                  </thead>
                   <tbody id="table-scroll">
                    <tr>
                    <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                            <Form.Check.Input    defaultValue=""   type="checkbox" ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                      </td>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>738</td>
                    </tr>
                    <tr>
                    <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                            <Form.Check.Input    defaultValue=""   type="checkbox" ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                      </td>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>789</td>
                    </tr>
                    <tr>
                    <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                            <Form.Check.Input    defaultValue=""   type="checkbox" ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                      </td>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>142</td>
                    </tr>
                    <tr>
                    <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input  defaultValue=""   type="checkbox"></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                      </td>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>735</td>
                    </tr>
                    <tr>
                    <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input    defaultValue=""   type="checkbox" ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                      </td>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>542</td>
                    </tr>
                    <tr>
                    <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input defaultValue="" type="checkbox"></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                      </td>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>615</td>
                    </tr>
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
                      <th></th>
                      <th className="border-0">ID Alerta</th>
                      <th className="border-0">ID Admin</th>
                      <th className="border-0">Local Exterior</th>
                      <th className="border-0">Tipo de Alerta</th>
                      <th className="border-0">Descrição</th>
                      <th className="border-0">Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                    <td></td>
                      <td>1</td>
                       <td>2</td>
                      <td>palacio gelo</td>
                      <td>Desinfecao</td>
                       <td>nada</td>
                       <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-21130535">Remover</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                              onClick={()=>this.onDelete()}
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                    </tr>
                    <tr>
                    <td></td>
                      <td>1</td>
                       <td>2</td>
                      <td>palacio gelo</td>
                      <td>Desinfecao</td>
                       <td>nada</td>
                       <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-21130535">Remover</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                              onClick={()=>this.onDelete()}
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                    </tr>
                    <tr>
                    <td></td>
                      <td>1</td>
                       <td>2</td>
                      <td>palacio gelo</td>
                      <td>Desinfecao</td>
                       <td>nada</td>
                       <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-21130535">Remover</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                              onClick={()=>this.onDelete()}
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                    </tr>
                    <tr>
                    <td></td>
                      <td>1</td>
                       <td>2</td>
                      <td>palacio gelo</td>
                      <td>Desinfecao</td>
                       <td>nada</td>
                       <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-21130535">Remover</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                              onClick={()=>this.onDelete()}
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                    </tr>

                    
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
                    Guardar local exterior 
                  </Button>
                  
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
}

export default definicoes;
