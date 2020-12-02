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

  const [players, setPlayers] = useState([{}]);
  const [showPopover, setShowPopover] = useState(false);
  const [tipo, setTipo] = useState('');
  const [server, setServer] = useState('');
  const [nombre, setNombre] = useState('');
  const [div, setDiv] = useState('');

  React.useEffect(() => {
    RequestToMyApi().then(data => setPlayers(data))
  }, []);
 

  const Agregar= () => {
    const obj = { 
       'id_perfil': players.length,
       'tipo': tipo ,
       'servidor': server ,
       'division': div ,
       'nombre': nombre 
    };
    
  
    
    setShowPopover(false);
  }

 
  


  return (
    <IonPage >
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref='/' text='regresar' />
            </IonButtons>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding' fullscreen>
       {players.map((player, i) => console.log())}
         <IonPopover
        isOpen={showPopover}
        cssClass='my-custom-class'
        onDidDismiss={e => setShowPopover(false)}
      >
        
        <IonItem >
            <IonInput  value={tipo} placeholder="Enter Input" onIonChange={e => setTipo(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem >
            <IonInput  value={server} placeholder="Enter Input" onIonChange={e => setServer(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem >
            <IonInput  value={nombre} placeholder="Enter Input" onIonChange={e => setNombre(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem >
            <IonInput  value={div} placeholder="Enter Input" onIonChange={e => setDiv(e.detail.value!)}></IonInput>
        </IonItem>

        <IonButton onClick={Agregar}>Agregar</IonButton>
        
      </IonPopover>
      <IonButton expand='block' onClick={() => setShowPopover(true)}>Agregar perfil</IonButton>
      
        
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
