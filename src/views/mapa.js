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

const tempoDensidadeMedia = 5
const tipoTempoDensidadeMedia = "dd"//tipotempo = hh - horas, mm - minutos, dd - dias

async function obterListaLocaisEDensidadeMedia(){
  let idinst = localStorage.getItem('idinstituicao')
  const urlgetlocais = "https://pint2021.herokuapp.com/Locais/listlocaisout/"+idinst;//todo obter id inst
  const urlgetdensidademedia = "https://pint2021.herokuapp.com/Report/get_densidade_media_local/";
  const jsonfinal ={}
  var listalocaisfinal = await axios.get(urlgetlocais).then(async res=>{
    //console.log(res)
    if(res.status !== 200){
      alert('Erro de conexao')
      return;
    }
    var arrayListaLocais = new Array()
    var arraylocais = res.data.LocaisInst
    for(let local of arraylocais){
      let nomelocal, idlocal, latitude,longitude
      nomelocal = local.Nome;
      idlocal = local.ID_Local;
      latitude = local.Latitude;
      longitude = local.Longitude;
      arrayListaLocais.push({Nome:nomelocal, IDLocal:idlocal, Latitude:latitude, Longitude:longitude})
    }
    for(let local of arrayListaLocais){
      let resultadodensidade = await axios.put(urlgetdensidademedia+local.IDLocal,{tempo:tempoDensidadeMedia,tipoTempo:tipoTempoDensidadeMedia})
      if(resultadodensidade.status !==200)
        break;
      if(resultadodensidade.data.numeroReports === 0)
        local.densidadeMedia = 0
      else local.densidadeMedia = resultadodensidade.data.media
    }
    return arrayListaLocais
  }).catch(err=>{alert("Erro: "+ err);console.log(err)})
  jsonfinal.Lista = listalocaisfinal
  return jsonfinal
}

function Maps() {
  const mapRef = React.useRef(null);
  React.useEffect(async () => {
    let google = window.google;
    let map = mapRef.current;
    //rota para a lat e long ser a central / principal

    
    
    var listalocais =await obterListaLocaisEDensidadeMedia();
    console.log(listalocais.Lista[2])

    //listalocais.Lista.push({
    //  IDLocal:11,Latitude:40.6467634,Longitude:-7.9173397, densidadeMedia:1,Nome: "ola"
    //})
    //listalocais.Lista.push({
    //  IDLocal:12,Latitude:40.6454794,Longitude:-7.9151064, densidadeMedia:1,Nome: "ola"
    //})
    //listalocais.Lista.push({
    //  IDLocal:13,Latitude:40.6387692,Longitude:-7.9166592, densidadeMedia:1,Nome: "ola"
    //})
    var latitudetotal = 0, longitudetotal=0 //calcular ponto medio entre locais
    let nlocais = 0
    for (let city in listalocais.Lista) {
      let local = listalocais.Lista[city]
      if(local.Latitude>=-90 && local.Latitude <= 90 && local.Longitude>=-180 && local.Longitude<=180){
        latitudetotal = latitudetotal + local.Latitude
        longitudetotal = longitudetotal + local.Longitude
        nlocais++
      }
    }
    latitudetotal = latitudetotal / nlocais//listalocais.Lista.length
    longitudetotal = longitudetotal / nlocais //listalocais.Lista.length
    const myLatlng = new google.maps.LatLng(latitudetotal, longitudetotal);
    const mapOptions = {
      zoom: 15,
      center: myLatlng,
      scrollwheel: false,
      zoomControl: true,
    };

    map = new google.maps.Map(map, mapOptions);
    for (let city in listalocais.Lista) {
      let local = listalocais.Lista[city]
      if(local.Latitude<-90 && local.Latitude > 90 && local.Longitude<-180 && local.Longitude>180){
        break
      }
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(local.Latitude,local.Longitude),
        map:map,
        animation: google.maps.Animation.DROP,
        title: local.Nome,
      })
      if(local.IDLocal ===4)
        local.densidadeMedia = 2
      if(local.densidadeMedia === 1)
      {
        const cityCircle = new google.maps.Circle({
        
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.35,
        map: map,
        center:  new google.maps.LatLng(local.Latitude,local.Longitude),
        radius: 50,     
        fillColor: "#00ff00",
        strokeColor: "#00ff00",
        
      });
      }
      else if(local.densidadeMedia === 2)
        {
       const cityCircle = new google.maps.Circle({
        
        strokeOpacity: 0.8,
        strokeWeight: 2,
        
        fillOpacity: 0.35,
        map: map,
        center: new google.maps.LatLng(local.Latitude,local.Longitude),
        radius: 50,     
        fillColor: "#e0e000",
        strokeColor: "#ffff00",
        
      });
      }
      else if(local.densidadeMedia == 3)
        {
       const cityCircle = new google.maps.Circle({
        
        strokeOpacity: 0.8,
        strokeWeight: 2,
        
        fillOpacity: 0.35,
        map: map,
        center:  new google.maps.LatLng(local.Latitude,local.Longitude),
        radius: 50,     
        fillColor: "#e60000",
        strokeColor: "#e60000",
        
      });
      }
    }
    const contentString =
      '<div class="info-window-content"><h2>Light Bootstrap Dashboard PRO React</h2>' +
      "<p>A premium Admin for React-Bootstrap, Bootstrap, React, and React Hooks.</p></div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    
   
  }, []);
  return (
    <>

      <div className="map-container">
        <div id="map" ref={mapRef}></div>
      </div>
     <br/>
     <Container fluid>
     <Row>
          <Col md="12">
            <Card className="card-tasks">
              <Card.Header>
                <p className="first_titulo_esquerda">Lista de Locais existentes: 
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
 
                <p className="card-category">Faça a gestão de locais indoor</p>
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
                        
                      </tr>
                    </tbody>
                  </Table>
                </div>

 <a class="button2" href="#popup1">Adicionar local</a>
<a class="button3" href="#popup2">Alterar local selecionado</a>


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
                <br/><br/>
              </Card.Body>
              
            </Card>
          </Col>
          </Row>
     </Container>

    </>
  );
}

export default Maps;
