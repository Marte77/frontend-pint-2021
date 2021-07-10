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


class opinioes extends React.Component{
   onDelete(id){
        Swal.fire({
        title: 'Tem a certeza?',
        text: 'A opinião vai ser eliminada',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, quero apagar !',
        cancelButtonText: 'Não, manter a opinião.'
        }).then((result) => {
        if (result.value) {
        this.sendDelete(id)
        } else if (result.dismiss === 
        Swal.DismissReason.cancel) {
        Swal.fire(
        'Cancelado',
        'A opinião continua segura.'
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
        'A opinião foi apagada com sucesso'
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
          <Col md="12">
            <Card className="card-tasks">
              <Card.Header>
                <p className="first_titulo_esquerda">Lista de Opiniões:
</p>
              </Card.Header>

              <Card.Body>
                <div id="table-scroll">
                  <Table id="table-scroll">
                    <tbody id="table-scroll">
                    <tr>
                        
                        <th>Utilizador</th>
                        <th>Total Pontos</th>
                        <th>Classificação (<i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>)</th>
                        <th>Comentário</th>

                        <th>Excluir Opinião</th>

                    </tr>
                      <tr>
                       
                        <td>
                          hugo
                        </td>
                        <td>
                          1234
                        </td>
                        <td>
                          2
                        </td>
                        <td>
                          não gostei
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
                          hugo
                        </td>
                        <td>
                          1234
                        </td>
                        <td>
                          2
                        </td>
                        <td>
                          não gostei
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
                          hugo
                        </td>
                        <td>
                          1234
                        </td>
                       <td>
                          2
                        </td>
                        <td>
                          não gostei
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

<Row>


<Col md="4">
            <Card>
              <Card.Header>
              
              <p className="first_titulo">Classificação Instituição</p>
                <hr></hr>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: ["5", "4","3","2","1"],
                      series: [50, 20,20,5,5],
                    }}
                    type="Pie"
                  />
                </div>
                  <div className="legend">
                  

                  5<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>&nbsp;&nbsp;
                  4<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><br/>
                  3<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>&nbsp;&nbsp;
                  2<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>&nbsp;&nbsp;
                  1<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><br/>
                  

                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md="6">
            <Card>
              <Card.Header>
               <p className="first_titulo_esquerda">Opiniões médias desta semana:</p>

              </Card.Header>
              <Card.Body>
                <div className="ct-chart" /*id="chartHours"*/>
                  <ChartistGraph
                    data={{
                      labels: [
                        "S",
                        "T",
                        "Q",
                        "Q",
                        "S",
                        "S",
                        "D",
                      ],
                      series: [
                        [3, 2.5, 2, 1, 4, , 3],
                        
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 5,
                      showArea: false,
                      height: "240px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 15,
                        left: -10
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
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
</Row>
      </Container>
    </>
  );
}
}
export default opinioes;
