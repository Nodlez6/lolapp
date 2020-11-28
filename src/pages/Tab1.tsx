import React from 'react';
import axios from 'axios';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

/* Usando fetch */
const Fetching = async () => {
  const ret = await fetch('http://localhost:25000/perfiles');
  const json = await ret.json();
  console.log(json);
}

/* Usando Axios */
const RequestToMyApi = () => {
  return axios({
    url: 'http://localhost:25000/perfiles',
    method: 'get'
  }).then(response => {
    return response.data;
  })
};

const Tab1: React.FC = () => {

  const [players, setPlayers] = React.useState([]);
  
  React.useEffect(() => {
    RequestToMyApi().then(data => setPlayers(data));
  }, []);

   return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
