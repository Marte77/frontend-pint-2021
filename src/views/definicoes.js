import React from "react";
import './stylesD.css';
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
                          <button style={{width:'74.5%', backgroundColor:'green'}} type="button" class="btn btn-success"><i class="fas fa-plus-circle" style={{color:'black'}}></i><b style={{color:'black', paddingLeft:'5%'}} >Adicionar</b></button>

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
          <Col md="6">
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
                <button class="btn btn-raised shadow my-button w-xs blue" style={{color:'black', width:'20%', paddingRight:'2%', marginLeft:'55%'}}><span></span><i class="fas fa-plus-circle" ></i>Adicionar</button>
                <span style={{ marginLeft:'2%'}}></span>
               <button class="btn btn-raised shadow my-button w-xs blue" style={{color:'black', width:'20%'}}><span></span><i class="fas fa-edit"></i>Alterar</button>
                        
              </Card.Body>
            </Card>
          </Col>
          
    
                   <Col md="6">
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
                <button class="btn btn-raised shadow my-button w-xs blue" style={{color:'black', width:'20%', paddingRight:'2%', marginLeft:'55%'}}><span></span><i class="fas fa-plus-circle" ></i>Adicionar</button>
                <span style={{ marginLeft:'2%'}}></span>
               <button class="btn btn-raised shadow my-button w-xs blue" style={{color:'black', width:'20%'}}><span></span><i class="fas fa-edit"></i>Alterar</button>
                        
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
                    Ordenar por nome: 
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
                      <th className="border-0">Nome do alerta</th>
                      <th className="border-0">Tipo de Alerta</th>
                      <th className="border-0">Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
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
                      <td>$36,738</td>
                      
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
                      <td>$23,789</td>
                      
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
                      <td>$56,142</td>
                      
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
                      <td>$38,735</td>
                      
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
                      <td>$63,542</td>
                      
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
                      <td>$78,615</td>
                      
                    </tr>
                  </tbody>
                </Table>
                </div>
                <br/>
                <button class="btn btn-raised shadow my-button w-xs blue" style={{color:'black', width:'10%', paddingRight:'2%', marginLeft:'75%'}}><span></span><i class="fas fa-plus-circle" ></i>Adicionar</button>
                <span style={{ marginLeft:'2%'}}></span>
               <button class="btn btn-raised shadow my-button w-xs blue" style={{color:'black', width:'10%'}}><span></span><i class="fas fa-trash-alt"></i>Remover</button>
                       
              </Card.Body>
            </Card>
          </Col>
          </Row>
      </Container>
    </>
  );
}
}
export default definicoes;
