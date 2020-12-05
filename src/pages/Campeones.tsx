import React, { Fragment } from 'react'
import { IonContent, IonCard, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonCardSubtitle, IonCardTitle, IonCardContent, IonImg } from '@ionic/react';
import axios from "axios";
import useState from 'react';
import './Campeones.css';

const getCampeones = () => {
    return axios({
      url: "http://localhost:25000/campeones",
      method: "get",
    }).then((response) => {
      return response.data;
    });
  };
export const Campeones = () => {

    const [campeones, setCampeones] = React.useState([]);

    React.useEffect(() => {
        getCampeones().then(data => setCampeones(data));
      }, []);


    return (
        <Fragment>
            <IonPage >
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref='/' text='regresar' />
            </IonButtons>
          <IonTitle>Campeones</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className='ion-padding' fullscreen>
          {campeones.map((campeon ,i) => ( 
              <IonCard key={i}>
                  <IonImg src={'/assets/Campeones/'+campeon['nombre']+'_1.jpg' } />
                  <IonCardSubtitle className='ion-margin ion-text-center'>
                    {campeon['rol']}
                  </IonCardSubtitle>

                  <IonCardTitle className='bold-title ion-text-center'>
                    {campeon['nombre']}
                  </IonCardTitle>

                  <IonCardContent className='ion-text-center'>
                      {'Q : '+campeon['q']}<br/>
                      {'W : '+campeon['w']}<br/>
                      {'E : '+campeon['e']}<br/>
                      {'R : '+campeon['r']}<br/>
                      <br/>
                      <div className='bold'>
                        {campeon['historia']}
                      </div>
                      

                  </IonCardContent>
              </IonCard>
          ))}
     
      </IonContent>
    </IonPage>
            
        </Fragment>
    )
}
