import React, { Fragment, useState } from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonButton } from '@ionic/react';
import axios from 'axios';


export const Consultas = () => {
  const promedioPartida = () => {
    return axios({
      url: 'http://localhost:25000/avgp_dates',
       method: 'post',
       headers: {}, 
      data: {
        'date1': fecha1,
        'date2': fecha2,
    }
     }).then(response => {
       return response.data;
     })
   };


    
    
    //Promedio duracion partida
    const [fecha1, setFecha1] = useState('')
    const [fecha2, setFecha2] = useState('')

    const Consult = () => {
        
        return(
            <Fragment>
                
            </Fragment>
        )
    }
    React.useEffect(() => {
        
        
    }, []);

    

    return (
        <IonPage>
      <IonHeader>
        <IonToolbar>

            <IonButtons slot="start">
              <IonBackButton defaultHref='/' text='regresar' />
            </IonButtons>
          <IonTitle>Consultas</IonTitle>
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
