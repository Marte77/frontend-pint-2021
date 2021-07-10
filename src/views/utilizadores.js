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
class utilizadores extends React.Component{
     onDelete(id){
        Swal.fire({
        title: 'Tem a certeza?',
        text: 'O utilizador será removido',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, quero remover !',
        cancelButtonText: 'Não, manter utilizador.'
        }).then((result) => {
        if (result.value) {
        this.sendDelete(id)
        } else if (result.dismiss === 
        Swal.DismissReason.cancel) {
        Swal.fire(
        'Cancelado',
        'O utilizador continua na instituição.'
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
        'O utilizador foi removido com sucesso!'
        )
        this.loadFilme()
        }
        })
        .catch ( error => {
        alert("Error 325 ")
        })    
    } 
   render(){
  return (
    <>
      <Container fluid>
      <Row>
          <Col md="5">  {/*coluna Estatisticas Diárias*/}
            <Card className="card-stats">
              <Card.Body>
              
                <Row>
                  <Row><p className="first_titulo">Estatísticas:</p></Row>
                <Col lg="6" sm="12">  {/*coluna Estatisticas Diárias*/}
                    <div className="numbers">
                      
                      <p className="secound_titulo">Utilizadores Registados: </p>
                      <Card.Title><h3 className="aligncenter">3</h3></Card.Title>    
                    
                      <p className="secound_titulo">À espera de aprovação: </p>
                      <Card.Title><h3 className="aligncenter">3</h3></Card.Title>
                      
                    </div>
                  </Col>
                  <Col lg="6" sm="12">  {/*coluna Estatisticas Diárias*/}
                
                    <div className="numbers">
                      
                      <p className="secound_titulo">Ativos últimas 24 horas: </p>
                      <Card.Title><h3 className="aligncenter">3</h3></Card.Title>    
                    
                      <p className="secound_titulo">Registados em 24 horas: </p>
                      <Card.Title><h3 className="aligncenter">3</h3></Card.Title>
                      
                    </div>
                
                </Col>
                  </Row>
                </Card.Body>  
            </Card>
          </Col>

          
          </Row>

<Row>
          <Col md="12">
            <Card className="card-tasks">
              <Card.Header>
                <p className="first_titulo_esquerda">Utilizadores da Instituição:
              <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_style_utilizadorespendentes">
    Ordenar por
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Data Asc.</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Data Desc.</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>    
</p>
 
                <br/>
                <div class="input-group">
                      <div class="form-outline">
                        <input id="search-input" type="search" id="form1" class="form-control" placeholder="Search"></input>
                     </div>
                      <button id="search-button" type="button" class="btn btn-primary">
                        <i class="fas fa-search"></i>
                     </button>
                    </div>
              </Card.Header>

              <Card.Body>
                <div id="table-scroll">
                  <Table id="table-scroll">
                    <tbody id="table-scroll">
                    <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>Pontuação</th>
                        <th>Ranking</th>
                        <th>Email</th>
                        <th>Cidade</th>
                        <th>Excluir</th>

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
                        <td>
                          Palácio do gelo
                        </td>
                        <td>
                          1234
                        </td>
                        <td>
                          12
                        </td>
                        <td>
                          3
                        </td>
                        <td>
                          1
                        </td>
                         
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
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input defaultValue="" type="checkbox"></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Palácio do gelo
                        </td>
                        <td>
                          1234
                        </td>
                        <td>
                          12
                        </td>
                        <td>
                          3
                        </td>
                        <td>
                          1
                        </td>
                         
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
                      </tr><tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input defaultValue="" type="checkbox"></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Palácio do gelo
                        </td>
                        <td>
                          1234
                        </td>
                        <td>
                          12
                        </td>
                        <td>
                          3
                        </td>
                        <td>
                          1
                        </td>
                         
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

}
export default utilizadores;
