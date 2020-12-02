import React ,{ useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonImg, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';

import './Tab3.css';
import axios from 'axios';

const RequestToMyApi = () => {
  return axios({
    url: 'http://localhost:25000/partidas',
    method: 'get'
  }).then(response => {
    return response.data;
  })
};

const Tab3: React.FC = () => {

  const [partida, setPartida] = useState([{}]);
  const obj = {
    duracion: 32,
    id_campeon: 1,
    id_partida: 2,
    id_perfil: 0,
    winorlose: 'win'
  }
  

  React.useEffect(() => {
    RequestToMyApi().then(data => console.log(data))
  }, []);

  


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>

            <IonButtons slot="start">
              <IonBackButton defaultHref='/' text='regresar' />
            </IonButtons>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

      
       
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
