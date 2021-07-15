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
  constructor(props){
    super(props);
    this.state = {
      listcomentarios:[],
      valor5:0,
      valor4:0,
      valor3:0,
      valor2:0,
      valor1:0,
      segunda:0,
      terça:0,
      quarta:0,
      quinta:0,
      sexta:0,
      sabado:0,
      domingo:0
    }
  }

  onDelete(iduser, idlocal){
      Swal.fire({
        title: 'Tem a certeza?',
        text: 'A opinião vai ser eliminada',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, quero apagar !',
        cancelButtonText: 'Não, manter a opinião.'
      })
      .then((result) => {
        if (result.value) {
          this.sendDelete(iduser, idlocal)
        } 
        else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
          'Cancelado',
          'A opinião continua segura.'
          )
        }
      })
  } 


  sendDelete(userId, localId) {
    const baseUrl = "http://localhost:3000/Comentarios/delete_comentario/"+localId+"/"+userId 
    axios.delete(baseUrl,{
      IDPessoa:userId,
      IDLocal: localId
    })
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
        'Apagado!',
        'A opinião foi apagada com sucesso'
        )
        this.loadlData();
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })    
  }

  componentDidMount(){
    this.loadlData();
  }

  loadlData(){
    const idinst=localStorage.getItem('idinstituicao');

    const url = "http://localhost:3000/Comentarios/opinioes/"+idinst;
    axios.get(url).then(res => {
      if(res.data){
        const data = res.data.data;
        this.setState({ listcomentarios:data });
      }
      else{
        alert("No data");
      }
      console.log(res)
    })
    .catch(error => {
      alert(error)
    });
  }

  loadFillData(){
    return this.state.listcomentarios.map((data, index)=>{
        return(
            <tr key={index}>
                <td>{data.Pessoa.PNome} {data.Pessoa.UNome}</td>  
                <td>{data.Local.Nome}</td>
                <td>{data.Classificacao}</td>
                <td>{data.Descricao}</td>
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
                        onClick={()=>this.onDelete(data.PessoaIDPessoa, data.LocalIDLocal )}
                      >
                        <i className="fas fa-times"></i>
                      </Button>
                    </OverlayTrigger>
                </td>
            </tr>
        )
    });
  }

  cont(){
    var valor5 = 0;
    var valor4 = 0;
    var valor3 = 0;
    var valor2 = 0;
    var valor1 = 0;
    var total=0;

    for(const p of this.state.listcomentarios){
      if(p.Classificacao === 5){
        valor5 = valor5 +  1;
      }
      else if(p.Classificacao === 4){
        valor4 = valor4 +  1;
      }
      else if(p.Classificacao === 3){
        valor3 = valor3 +  1;
      }
      else if(p.Classificacao === 2){
        valor2 = valor2 +  1;
      }
      else if(p.Classificacao === 1){
        valor1 = valor1 +  1;
      } 
    } 

    if (this.state.listcomentarios.length != 0)
      total = this.state.listcomentarios.length

    return(
      this.state.valor5 = (valor5*100)/total,
      this.state.valor4 = (valor4*100)/total,
      this.state.valor3 = (valor3*100)/total,
      this.state.valor2 = (valor2*100)/total,
      this.state.valor1 = (valor1*100)/total
    )
  }

  dias(){
    var domingo = 0;
    var segunda = 0;
    var terça = 0;
    var quarta =0;
    var quinta =0;
    var sexta = 0;
    var sabado = 0;
    var seg=0, terç= 0,  quart=0, quint=0, sext=0, sab=0, doming = 0;

    for(const p of this.state.listcomentarios){
      if(new Date(p.Data).getDay() === 0){
        domingo += p.Classificacao
        doming +=1
      } 
      else if (new Date(p.Data).getDay() === 1)
      {
        segunda += p.Classificacao
        seg +=1
      }
      else if (new Date(p.Data).getDay() === 2){
        terça += p.Classificacao
        terç +=1
      }  
      else if ((new Date(p.Data).getDay()) === 3){
        quarta = quarta + p.Classificacao;
        quart = quart + 1;
      }
      else if (new Date(p.Data).getDay() === 4){
        quinta += p.Classificacao
        quint +=1
      }
      else if (new Date(p.Data).getDay() === 5){
        sexta += p.Classificacao
        sext +=1
      }  
      else if (new Date(p.Data).getDay() === 6){
        sabado += p.Classificacao
        sab +=1
      }     
    }
    
    if (doming ==0)
      doming=1
    if (seg ==0)
      seg=1
    if (terç ==0)
      terç =1
    if (quart ==0)
      quart=1
    if (quint==0)
      quint=1
    if (sext ==0)
      sext=1
    if (sab==0)
      sab =1

    return(
      this.state.domingo = domingo/doming,
      this.state.segunda = segunda/seg,
      this.state.terça = terça/terç,
      this.state.quarta = quarta/quart,
      this.state.quinta = quinta/quint,
      this.state.sexta = sexta/sext,
      this.state.sabado = sabado/sab
    )
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
                      <th>Local</th>
                      <th>Classificação (<i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>)</th>
                      <th>Comentário</th>
                      <th>Excluir</th>
                    </tr>
                    {this.loadFillData()}
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
                <div className="ct-chart ct-perfect-fourth" id="chartPreferences" >
                  {this.cont()}
                  <ChartistGraph
                    data={{
                      labels: ["5", "4","3","2","1"],
                      series: [this.state.valor5, this.state.valor4,this.state.valor3,this.state.valor2,this.state.valor1],
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
               <p className="first_titulo_esquerda">Opiniões médias dias da semana:</p>

              </Card.Header>
              <Card.Body>
                <div className="ct-chart" /*id="chartHours"*/>
                  {this.dias()}
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
                        [this.state.segunda, this.state.terça, this.state.quarta, this.state.quinta, this.state.sexta, this.state.sabado, this.state.domingo],
                        
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
