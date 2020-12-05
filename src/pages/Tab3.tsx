import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

import "./Tab3.css";
import axios from "axios";
import { IonItem, IonInput, IonButton, IonPopover } from '@ionic/react';

const getPartidas = () => {
  return axios({
    url: "http://localhost:25000/partidas",
    method: "get",
  }).then((response) => {
    return response.data;
  });
};

const getCampeones = () => {
  return axios({
    url: "http://localhost:25000/campeones",
    method: "get",
  }).then((response) => {
    return response.data;
  });
};

const getPerfiles = () => {
  return axios({
    url: "http://localhost:25000/perfiles",
    method: "get",
  }).then((response) => {
    return response.data;
  });
};

const Tab3: React.FC = () => {
  let Perfil: any;
  let Campeon: any;

  const findPerfilandCampeon = (a : string , b : string) =>{
    perfiles.map(perfil => {
      if(perfil['nombre'] == a){
        Perfil = perfil['id_perfil'];
      }
    })

    campeones.map(campeon => {
      if(campeon['nombre'] == b){
        Campeon = campeon['id_campeon'];
      }
    })
  }

  const CrearPartida = () => {
    return axios({
      url: 'http://localhost:25000/crear_partida',
      method: 'post',
      headers: {}, 
      data: {
        "duracion": duracion,
        "id_campeon": parseInt(Campeon),
        "id_partida": partidas.length + 1,
        "id_perfil": parseInt(Perfil),
        'fechayhora':fechayhora,
        "winorlose": winorlose,
    }
    }).then(response => {
      return response.data;
    })
  };
  const [partidas, setPartida] = useState([[] as any]);
  const [perfiles, setPerfiles] = useState([[] as any]);
  const [campeones, setCampeones] = useState([[] as any]);


  const [showPopover, setShowPopover] = useState(false);
  const [duracion, setDuracion] = useState('');
  const [fechayhora, setFechayhora] = useState('');
  const [winorlose, setWinorlose] = useState('');
  const[perfil, setPerfil] = useState('');
  const[campeon, setCampeon] = useState('');
  
  const Agregar = () => {
    if(duracion == '' || fechayhora == '' || winorlose == ""){
      setShowPopover(false);
      setDuracion('');
      setFechayhora('');
      setWinorlose('');
      setPerfil('');
      setCampeon('');
      return;
    }
    setDuracion('');
    setFechayhora('');
    setWinorlose('');
    setPerfil('');
    setCampeon('');
    findPerfilandCampeon(perfil,campeon);
    const obj = {
      "duracion": duracion,
      "id_campeon": parseInt(Campeon),
      "id_partida": partidas.length + 1,
      "id_perfil": parseInt(Perfil),
      'fechayhora':fechayhora,
      "winorlose": winorlose,
    };
    const a = [...partidas, obj];
    setPartida(a);
   
    

    CrearPartida();
    setShowPopover(false);
  }

  React.useEffect(() => {
    getPartidas().then((data) => setPartida(data));
    getPerfiles().then(data => setPerfiles(data));
    getCampeones().then(data => console.log(data));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="regresar" />
          </IonButtons>
          <IonTitle>Partidas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding' fullscreen>
        {partidas.map((partida, i) => (
          <IonCard key={i}>
          <IonImg src={'/assets/images/'+partida['winorlose']+'.jpg'}/>
          
          <IonCardSubtitle className='ion-margin ion-text-center'>
            {'La partida duró '+partida['duracion']+" minutos"}
          </IonCardSubtitle>
          <IonCardTitle className='ion-text-center ion-text-capitalize'>
            {partida['winorlose']}
          </IonCardTitle>

          <IonCardContent className='ion-text-center'>
            {partida['fechayhora']}
          </IonCardContent>
        </IonCard>
        ))}

      <IonPopover
        isOpen={showPopover}
        cssClass='my-custom-class ion-padding'
        onDidDismiss={e => setShowPopover(false)}
      
      >
        
        <IonItem >
            <IonInput  value={duracion} placeholder="Duración de partida" onIonChange={e => setDuracion(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem >
            <IonInput  value={fechayhora} placeholder="AAAA-MM-DD" onIonChange={e => setFechayhora(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem >
            <IonInput  value={winorlose} placeholder="win or lose" onIonChange={e => setWinorlose(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem >
            <IonInput  value={perfil} placeholder="Perfil" onIonChange={e => setPerfil(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem >
            <IonInput  value={campeon} placeholder="Campeon" onIonChange={e => setCampeon(e.detail.value!)}></IonInput>
        </IonItem>
  

        <IonButton className='ion-margin'  onClick={Agregar}>Agregar</IonButton>
         
      </IonPopover>
      <IonButton expand='block' onClick={() => setShowPopover(true)}>Agregar partida</IonButton>
      
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
