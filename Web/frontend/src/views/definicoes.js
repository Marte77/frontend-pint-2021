import React from "react";

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

function User() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
          <Card>
          <Card.Header>
                <Card.Title as="h4">Limites de lotação da instituição:</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row style={{marginLeft:'18%'}}>
                  <Col md="3" >
                      <p3>Pouco</p3>
                      <br></br>
                      <input style={{width:'115%'}} type="number" id="InstituicaoPouco" name="InstituicaoPouco"></input>
                  </Col>
                 
                  <Col md="3">
                  <p3>Moderado</p3>
                      <br></br>
                      <input style={{width:'115%'}} type="number" id="InstituicaoPouco" name="InstituicaoPouco"></input>
                  </Col>
                  
                  <Col md="3">
                  <p3>Elevado</p3>
                      <br></br>
                      <input style={{width:'115%'}} type="number" id="InstituicaoPouco" name="InstituicaoPouco"></input>
                  </Col>
                </Row>
                
              </Card.Body>
            
          <Card.Header style={{marginTop:'5%'}}>
                <Card.Title as="h4">Outras informações:</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row style={{paddingLeft:'2%'}}>                 
                  <form class="row row-cols-lg-auto g-3 align-items-center">
                    <div class="col-12">
                      <p>
                        
                        <div class="input-group">
                        <b style={{paddingRight:'5%', paddingTop:'1.5%'}}>Nome:</b>
                          <div class="input-group-text"><i class="fas fa-user-circle"></i></div>
                          <input  type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="Nome instituição" title="Nome da instituição"/>
                        </div>
                        </p>
                    </div>
                </form>
                </Row>
                <Row style={{paddingLeft:'2%'}}>                 
                  <form class="row row-cols-lg-auto g-3 align-items-center">
                    <div class="col-12">
                      <p>
                        
                        <div class="input-group">
                        <b style={{paddingRight:'5%', paddingTop:'1.5%'}}>Email:</b>
                          <div class="input-group-text"><i class="fas fa-envelope-open-text"></i></div>
                          <input  type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="Email instituição" title="Email da instituição"/>
                        </div>
                        </p>
                    </div>
                </form>
                </Row>

                <Row style={{paddingLeft:'2%'}}>                 
                  <form class="row row-cols-lg-auto g-3 align-items-center">
                    <div class="col-12">
                      <p>
                        
                        <div class="input-group">
                        <b style={{paddingRight:'5%', paddingTop:'1.5%'}}>Telefone:</b>
                       
                            <div class="input-group-text"><i class="fas fa-phone"></i></div>
                            <input  type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="Telefone da instituição" title="Telefone da instituição"/>
                          
                        </div>
                        </p>
                    </div>
                </form>
                </Row>
              
                <Row style={{paddingLeft:'2%'}}>                 
                  <form class="row row-cols-lg-auto g-3 align-items-center">
                    <div class="col-12">
                      <p>
                        
                        <div class="input-group">
                        <b style={{paddingRight:'5%', paddingTop:'1.5%'}}>Telemóvel:</b>
                          <div class="input-group-text"><i class="fas fa-mobile-alt"></i></div>
                          <input  type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="Telemóvel da instituição" title="Telemóvel da instituição"/>
                        </div>
                        </p>
                    </div>
                </form>
                </Row>

                <Row style={{paddingLeft:'2%'}}>                 
                  <form class="row row-cols-lg-auto g-3 align-items-center">
                    <div class="col-12">
                      <p>
                        
                        <div class="input-group">
                        <b style={{paddingRight:'5%', paddingTop:'1.5%'}}>Detalhes:</b>
                          <div class="input-group-text"><i class="fas fa-info-circle"></i></div>
                          <textarea class="form-control" id="exampleFormControlTextarea1" rows="6" cols="10" placeholder="Descrição da instituição" title="Descrição da instituição" ></textarea>
                        </div>
                        </p>
                    </div>
                </form>
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



                <Row style={{paddingTop:'2%'}}>
                  
                <button style={{width:'50%', backgroundColor:'green', marginLeft:'25%'}} type="button" class="btn btn-success"><i class="fa fa-save" style={{color:'black'}}></i><b style={{color:'black', paddingLeft:'5%'}} >Gravar Alterações</b></button>
                </Row>
              </Card.Body>
            </Card>
          </Col>


          <Col md="6">
          <Card>
          <Card.Header>
                <Card.Title as="h4">Horários de funcionamento:</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row style={{marginLeft:'32%'}}>
                  <p ><i class="fas fa-calendar-alt"></i><b style={{paddingLeft:'5%'}}>Período Manhã</b></p>
                  <div class="form-group">
                    <input style={{width:'50%'}} type="text" class="form-control" id="exampleFormControlInput1" placeholder="9:00 - 13:00"></input>
                  </div>
                  
                </Row>
                <Row style={{paddingTop:'2%',marginLeft:'32%'}}>
                <p><i class="fas fa-calendar-alt"></i><b style={{paddingLeft:'5%'}}>Período Almoço</b></p>
                <div class="form-group">
                    <input style={{width:'50%'}} type="text" class="form-control" id="exampleFormControlInput1" placeholder="13:00 - 14:00"></input>
                  </div>
                </Row>
                <Row style={{paddingTop:'2%',marginLeft:'32%'}}>
                <p><i class="fas fa-calendar-alt"></i><b style={{paddingLeft:'5%'}}>Período Tarde</b></p>
                <div class="form-group">
                    <input style={{width:'50%'}} type="text" class="form-control" id="exampleFormControlInput1" placeholder="14:00 - 18:00"></input>
                  </div>
                </Row>
                <Row style={{paddingTop:'2%'}}>
                  
                <button style={{width:'50%', backgroundColor:'green', marginLeft:'25%'}} type="button" class="btn btn-success"><i class="fa fa-save" style={{color:'black'}}></i><b style={{color:'black', paddingLeft:'5%'}} >Gravar</b></button>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>


        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Locais Outdoor</Card.Title>
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
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Salary</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">City</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          </Row>
      



















        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Company (disabled)</label>
                        <Form.Control
                          defaultValue="Creative Code Inc."
                          disabled
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          defaultValue="michael23"
                          placeholder="Username"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Last Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="City"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Country</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Country"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Postal Code</label>
                        <Form.Control
                          placeholder="ZIP Code"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        <Form.Control
                          cols="80"
                          defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                          that two seat Lambo."
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={
                    require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                      .default
                  }
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg").default}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
