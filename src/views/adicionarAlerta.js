import React from "react";
import ChartistGraph from "react-chartist";
import './style_auxiliar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import DropdownButton from 'react-bootstrap/DropdownButton'
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
                <button class="button_criaralerta">Criar Alerta</button>
                <button class="button_alteraralerta">Alterar Alerta</button>
                <button class="button_removeralerta">Remover Alerta</button>
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
                
<button class="button_adicionarv2">Alertar zonas selecionadas</button>


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
export default alertas;
