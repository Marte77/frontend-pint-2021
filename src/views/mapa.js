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
     
      if(local.densidadeMedia === 1)
      {
        const cityCircle = new google.maps.Circle({
        
        strokeOpacity: 1,
        strokeWeight: 2,
        fillOpacity: 0.45,
        map: map,
        center:  new google.maps.LatLng(local.Latitude,local.Longitude),
        radius: 70,     
        fillColor: "#00ff00",
        strokeColor: "#00ff00",
        
      });
      }
      else if(local.densidadeMedia === 2)
        {
       const cityCircle = new google.maps.Circle({
        
        strokeOpacity: 1,
        strokeWeight: 2,
        
        fillOpacity: 0.45,
        map: map,
        center: new google.maps.LatLng(local.Latitude,local.Longitude),
        radius: 70,     
        fillColor: "#e0e000",
        strokeColor: "#ffff00",
        
      });
      }
      else if(local.densidadeMedia == 3)
        {
       const cityCircle = new google.maps.Circle({
        
        strokeOpacity: 1,
        strokeWeight: 2,
        
        fillOpacity: 0.45,
        map: map,
        center:  new google.maps.LatLng(local.Latitude,local.Longitude),
        radius: 70,     
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
    

    </>
  );
}

export default Maps;
