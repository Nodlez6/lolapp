import React from 'react';

import { IonBackButton, IonButtons, IonContent, IonGrid, IonHeader, IonPage, IonRouterOutlet, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import {IonCard , IonCardHeader,IonButton, IonCardSubtitle, IonCardTitle , IonCardContent, IonCol} from '@ionic/react';

/* Usando fetch */
const Fetching = async () => {
  const ret = await fetch('http://localhost:25000/perfiles');
  const json = await ret.json();
  return json;
}

/* Usando Axios */
// const RequestToMyApi = () => {
//   return axios({
//     url: 'http://localhost:25000/perfiles',
//     method: 'get'
//   }).then(response => {
//     return response.data;
//   })
// };

const Tab1: React.FC = () => {

  
  
  // React.useEffect(() => {
  //   RequestToMyApi().then(data => setPlayers(data))
  // }, []);

   return (
    <IonPage >
      <IonHeader>
        <IonToolbar>
          
          <IonTitle className='text-custom'>League of Legends</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='fondo' >

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton routerLink='/tab2'  expand="block">Perfiles</IonButton>
            </IonCol>
            <IonCol>
            <IonButton routerLink='/tab3' expand="block">Partidas</IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
          <IonCol>
            <IonButton color='danger' routerLink='/Campeones' expand="block">Campeones</IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
            <IonButton color='warning' routerLink='/Consultas' expand="block">Consultas</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
    
  
      </IonContent>

    </IonPage>
  );
};

export default Tab1;
