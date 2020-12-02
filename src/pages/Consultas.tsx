import React, { Fragment, useState } from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonButton } from '@ionic/react';
import axios from 'axios';

const RequestToMyApi = () => {
    return axios({
      url: 'http://localhost:25000/partidas',
      method: 'get'
    }).then(response => {
      return response.data;
    })
  };

export const Consultas = () => {
    

    const [partidas, setPartidas] = useState([]);

    const Consult = () => {
        console.log(partidas);
        return(
            <Fragment>
                
            </Fragment>
        )
    }
    React.useEffect(() => {
        RequestToMyApi().then(data => setPartidas(data));
        
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

        <IonButton onClick={Consult} className='ion-margin' expand="full" >
            Promedio de duración de partida <br/>en un rango de fecha
        </IonButton>

        <IonButton onClick={Consult} className='ion-margin' expand="full" >
            Campeon más utilizado por los profesionales
        </IonButton>

        <IonButton onClick={Consult} className='ion-margin' expand="full" >
            Items más utilizados por un campeon
        </IonButton>

        <IonButton onClick={Consult} className='ion-margin' expand="full" >
            Runas más utilizadas por un campeon
        </IonButton>

        <IonButton onClick={Consult} className='ion-margin' expand="full" >
            Campeon más jugado en un rango de tiempo
        </IonButton>

        <IonButton onClick={Consult} className='ion-margin' expand="full" >
            Campeon más jugado por los demás <br/> en un rango de tiempo
        </IonButton>
        
      </IonContent>
    </IonPage>
    )
}
