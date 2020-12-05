import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButtons, IonBackButton, IonButton, IonImg, IonPopover, IonItem, IonInput } from '@ionic/react';

import './Tab2.css';
import axios from 'axios';

const RequestToMyApi = () => {
  return axios({
    url: 'http://localhost:25000/perfiles',
    method: 'get'
  }).then(response => {
    return response.data;
  })
};





const Tab2: React.FC = () => {

  const CrearPerfiles = () => {
    return axios({
      url: 'http://localhost:25000/crear_perfil',
      method: 'post',
      headers: {}, 
      data: {
        'id_perfil': players.length,
         'tipo': tipo ,
         'servidor': server ,
         'division': div ,
         'nombre': nombre 
    }
    }).then(response => {
      return response.data;
    })
  };

  const [players, setPlayers] = useState([] as any);
  const [showPopover, setShowPopover] = useState(false);
  const [tipo, setTipo] = useState('');
  const [server, setServer] = useState('');
  const [nombre, setNombre] = useState('');
  const [div, setDiv] = useState('');

  React.useEffect(() => {
    RequestToMyApi().then(data => setPlayers(data))
  }, []);
 

  const Agregar= () => {
    if(tipo == '' || server =='' || div == "" || nombre == ""){
      setShowPopover(false);
      setTipo('');
      setServer('');
      setNombre('');
      setDiv('');
      return;
    }
  
    setTipo('');
    setServer('');
    setNombre('');
    setDiv('');
    const obj = { 
       'id_perfil': players.length,
       'tipo': tipo ,
       'servidor': server ,
       'division': div ,
       'nombre': nombre 
    };

    const a = [ ...players, obj];
    setPlayers(a);
    setShowPopover(false);
    CrearPerfiles();
  }

 
  


  return (
    <IonPage >
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref='/' text='regresar' />
            </IonButtons>
          <IonTitle>Perfiles</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className='ion-padding' fullscreen>
       {players.map((player: any, i: any) => (
         <IonCard key={i}>
           <IonImg className='img-perfil' src={'/assets/images/'+player['division']+'.png'}/>
         <IonCardHeader>
         <IonCardSubtitle className='center'>{player['tipo']+' , '+player['servidor']}</IonCardSubtitle>
         <IonCardTitle className='center'>{player['nombre']}</IonCardTitle>
         </IonCardHeader>

         <IonCardContent className='center'>
          {player['division']}
        </IonCardContent>
       </IonCard>
       ))}
         <IonPopover
        isOpen={showPopover}
        cssClass='my-custom-class ion-padding'
        onDidDismiss={e => setShowPopover(false)}
      
      >
        
        <IonItem >
            <IonInput  value={tipo} placeholder="Tipo de perfil" onIonChange={e => setTipo(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem >
            <IonInput  value={server} placeholder="Servidor" onIonChange={e => setServer(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem >
            <IonInput  value={nombre} placeholder="Nombre" onIonChange={e => setNombre(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem >
            <IonInput  value={div} placeholder="Division" onIonChange={e => setDiv(e.detail.value!)}></IonInput>
        </IonItem>

        <IonButton className='ion-margin'  onClick={Agregar}>Agregar</IonButton>
         
      </IonPopover>
      <IonButton expand='block' onClick={() => setShowPopover(true)}>Agregar perfil</IonButton>
      
        
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
