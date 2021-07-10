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


class alertas extends React.Component{

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
        'O pedido foi apagado com sucesso'
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
<Row>
<Col md="6">
            <Card>
              <Card.Header>

              <p className="first_titulo_esquerda">&nbsp;&nbsp;&nbsp;&nbsp;Total de Desinfeções:
              <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_style">
    Periodo de Tempo
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Tempo real</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Hoje</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Esta semana</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Este mês</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Últimos 3 meses</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown></p>

                
                <p className="card-category">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Filtrar por intervalo de tempo)</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: [
                        "cantina",
                        "patio",
                        "sala12",
                        "auditorio",
                       
                      ],
                      series: [
                        [
                          542,
                          443,
                          320,
                          100,
                        ],
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <p className="first_titulo_esquerda">Definições de alertas
               
              </p>
                <p className="card-category">Faça a gestão do tipo de alertas</p>
              </Card.Header>
              <Card.Body>
                <div id="table-scroll">
                  <Table id="table-scroll">
                    <tbody id="table-scroll">
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
                          Alerta com baixa lotação
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
                          Alerta com lotação media
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
                          Alerta com lotação alta
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
                          Alerta Desinfeção urgente
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <a class="button2" href="#popup1">Criar Alerta</a>
                <a class="button4" href="#popup2">Alterar Alerta</a>

                <button class="button_removeralerta" onClick={()=>this.onDelete()}>Remover Alerta</button>

                <br/><br/>
                
              </Card.Body>
              
            </Card>
          </Col>
</Row>




      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-tasks">
              <Card.Header>
              <br/>
                <p className="first_titulo_esquerda">&nbsp;&nbsp;&nbsp;Últimos Alertas / Desinfeções
                <Dropdown>
               <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_stylev2">
                 Tipo
               </Dropdown.Toggle>
               <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Todos</Dropdown.Item>
                 <Dropdown.Item href="#/action-1">Desinfeção</Dropdown.Item>
                 <Dropdown.Item href="#/action-2">Pouco populado</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Muito populado</Dropdown.Item>
                   <Dropdown.Item href="#/action-2">Extremante populado</Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>    
              <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_style_utilizadorespendentes">
    Ordenar por
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Asc.</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Desc.</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>    
</p>                
              </Card.Header>
<br/>
              <Card.Body>
                <div id="table-scroll">
                  <Table id="table-scroll">
                    <tbody id="table-scroll">
                    <tr>
                        
                        <th className="th">Data</th>
                        <th>Local</th>
                        <th>Tipo alerta</th>
                        

                    </tr>
                      <tr>  
                        <td>
                          30/02/2021
                        </td>
                        <td>
                          IPV
                        </td>
                        <td>
                          Desinfeção
                        </td>
                      </tr>
                       <tr>  
                        <td>
                          30/02/2021
                        </td>
                        <td>
                          1234
                        </td>
                        <td>
                         Desinfeção
                        </td>
                      </tr>
                       <tr>  
                        <td>
                          30/02/2021
                        </td>
                        <td>
                          1234
                        </td>
                        <td>
                         Desinfeção
                        </td>
                      </tr>
                       <tr>  
                        <td>
                          30/02/2021
                        </td>
                        <td>
                          1234
                        </td>
                        <td>
                          Pouco populado
                        </td>
                      </tr>
                       <tr>  
                        <td>
                          30/02/2021
                        </td>
                        <td>
                          1234
                        </td>
                        <td>
                          Pouco populado
                        </td>
                      </tr>
                       <tr>  
                        <td>
                          30/02/2021
                        </td>
                        <td>
                          1234
                        </td>
                        <td>
                          Pouco populado
                        </td>
                      </tr>
                       <tr>  
                        <td>
                          30/02/2021
                        </td>
                        <td>
                          1234
                        </td>
                        <td>
                         Pouco populado
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                

              </Card.Body>
            </Card>
          </Col>
        </Row>

<Row>
          <Col md="12">
            <Card className="card-tasks">
              <Card.Header>
                <p className="first_titulo_esquerda">Alertar Locais existentes: 
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
 
                <p className="card-category">Faça a emissão de alertas (densidade / desinfeção)</p>

              </Card.Header>

              <Card.Body>
                <div id="table-scroll">
                  <Table id="table-scroll">
                    <tbody id="table-scroll">
                    <tr>
                        <th></th>
                        <th>Local</th>
                        <th>Total Alertas</th>
                        <th>Pouco populado</th>
                        <th>Muito populado</th>
                        <th>Extemamente populado</th>
                        <th>Data última desinfeção</th>
                        <th></th>

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
                         <td>
                           23/03/2019
                        </td>
                        <td></td>
                       <td></td>
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
                         <td>
                           23/03/2019
                        </td>
                       <td></td>
                       <td></td>
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
                         <td>
                           23/03/2019
                        </td>
                       <td></td>
                       <td></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                 <a class="button_adicionarv2" href="#popup3">Alertar zonas selecionadas</a>
                <br/><br/>


      <div id="popup1" class="overlay">
  <div class="popup">
    <h2>Tipo de alerta</h2>
    <a class="close" href="#">&times;</a>
    <div class="content">
      <p>Adicionar um novo tipo de alerta:</p>
    </div>
    <Form>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Tipo de alerta</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Nome tipo de alerta"
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
                    Inserir
                  </Button>
                  
                  </Form>
  </div>
</div>
<div id="popup2" class="overlay">
  <div class="popup">
    <h2>Atualizar alerta</h2>
    <a class="close" href="#">&times;</a>
    <div class="content">
      <p>Altere o nome do alerta:</p>
    </div>
    <Form>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Tipo de alerta</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Nome tipo de alerta"
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
                    Atualizar
                  </Button>
                  
                  </Form>
  </div>
</div>
<div id="popup3" class="overlay">
  <div class="popup">
    <h2>Alertar locais</h2>
    <a class="close" href="#">&times;</a>
    <div class="content">
      <p>Alertar zonas selecionadas:</p>
    </div>
    <Form>
                 
                   <Row>
                    <Col className="pr-1" md="10">
                    <Form.Group>
                        <label>Tipo de alertas:</label>
                        <br/>
                   <select>
                     <option value="1">Alerta baixa lotacao</option>
                    <option  value="2">Alerta baixa lotacao</option>
                    <option  value="3">Alerta baixa lotacao</option>
                  </select>
                
                      </Form.Group>

                    </Col>
                  </Row>
                   <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Descricao</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Descricao do alerta"
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
                    Alertar locais
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
}
export default alertas;
