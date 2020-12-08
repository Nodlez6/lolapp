import React, { Fragment, useState } from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonButton, IonPopover, IonItem, IonInput, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import axios from 'axios';
const RequestToMyApi = () => {
  return axios({
    url: 'http://localhost:25000/perfiles',
    method: 'get'
  }).then(response => {
    return response.data;
  })
};


export const Consultas = () => {

  const [players, setPlayers] = useState([]);
  React.useEffect(() => {
    RequestToMyApi().then(data => setPlayers(data))
  }, []);
 

  const promedioPartida = () => {
    return axios({
      url: 'http://localhost:25000/avgp_dates',
       method: 'post',
       headers: {}, 
      data: {
        'date1': fecha1,
        'date2':  fecha2,
    }
     }).then(response => {
       return response.data;
     })
   };
   const promedioPartidaCampeon = () => {
    return axios({
      url: 'http://localhost:25000/mostplayedchamp_bypros',
       method: 'post',
       headers: {}, 
      data: {
        'date1': fecha1,
        'date2':  fecha2,
    }
     }).then(response => {
       return response.data;
     })
   };
   const ItemMasUtilizado = () => {
    return axios({
      url: 'http://localhost:25000/mostuseditem_bychamp',
       method: 'post',
       headers: {}, 
      data: {
        'champ': campeon,
    }
     }).then(response => {
       return response.data;
     })
   };
   const RunasMasUtilizadas = () => {
    return axios({
      url: 'http://localhost:25000/mostusedrunes_bychamp',
       method: 'post',
       headers: {}, 
      data: {
        'champ': 'Akali'
    }
     }).then(response => {
       return response.data;
     })
   };

   
   const CampeonMasJugado = () => {
    return axios({
      url: 'http://localhost:25000/mostusedchamp_byprofile',
       method: 'post',
       headers: {}, 
      data: {
        'id_perfil': ID,
        'date1': fecha1,
        'date2':  fecha2,
    }
     }).then(response => {
       return response.data;
     })
   };
   


   
   
   

   const CampeonMasJugadoPorLosDemas = () => {
    return axios({
      url: 'http://localhost:25000/mostusedchamp',
       method: 'post',
       headers: {}, 
      data: {
        'date1': fecha1,
        'date2':  fecha2,
    }
     }).then(response => {
       return response.data;
     })
   };

   

   //Resultados
    const [resultado1, setResultado1] = useState('')
    const [resultado2, setResultado2] = useState('')
    
    
    //Promedio duracion partida
    const [fecha1, setFecha1] = useState('')
    const [fecha2, setFecha2] = useState('')

    //Campeon
    const [campeon, setCampeon] = useState('');
    const [perfil, setperfil] = useState('');
    
    let ID: number;
   

    const [showPopover, setShowPopover] = useState(false);
    const [showPopover2, setShowPopover2] = useState(false)
    const [showPopover3, setShowPopover3] = useState(false)
    const [showPopover4, setShowPopover4] = useState(false)
    const [showPopover5, setShowPopover5] = useState(false)
    const [showPopover6, setShowPopover6] = useState(false)

    const ConsultUno = () => {
      setResultado1('');
      setResultado2('');
      setShowPopover(false);
      
      setResultado1('Promedio de duración de partida entre '+fecha1+' y '+fecha2);
      
      promedioPartida().then(data => setResultado2(data['avg']))
      setFecha1('');
      setFecha2('');
    }
    const ConsultDos = () => {
      setResultado1('');
      setResultado2('');
      setShowPopover2(false);
      
      setResultado1('Campeon más utilizado entre '+fecha1+' y '+fecha2);
      
      promedioPartidaCampeon().then(data => setResultado2(data['nombre']));
      setFecha1('');
      setFecha2('');
    }
    const ConsultTres = () => {
      setResultado1('');
      setResultado2('');
      setShowPopover3(false);
      
      setResultado1('Item más utilizado por '+campeon);
      
      ItemMasUtilizado().then(data => setResultado2(data['nombre']));
      setCampeon('');
    }

    const ConsultCuatro = () => {
      setResultado1('');
      setResultado2('');
      setShowPopover4(false);
      
      setResultado1('Runas más utilizadas por '+campeon);
      
      RunasMasUtilizadas().then(data => setResultado2(data['nombre']));
      setCampeon('');
    }
    const BuscarID = (nombre: string) => {
      let id;
      players.map(data => {
        if(data['nombre'] == nombre){
          id = data['id_perfil'] 
        }
      })
      return id;
    }

    const ConsultCinco = () => {
      setResultado1('');
      setResultado2('');
      setShowPopover5(false);
      ID = BuscarID(perfil) || 0;
      
      setResultado1('Campeon más jugado por '+perfil);
      CampeonMasJugado().then(data => setResultado2(data['nombre']));
      setFecha1('');
      setFecha2('');
      setperfil('');
    }

    

    const ConsultSeis = () => {
      setResultado1('');
      setResultado2('');
      setShowPopover6(false);
      
      
      setResultado1('Campeon más jugado por los demás');
      
      CampeonMasJugadoPorLosDemas().then(data => setResultado2(data['nombre']));
      setFecha1('');
      setFecha2('');

    }

    
  
    

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

        <IonButton onClick={() => setShowPopover(true)} className='ion-margin' expand="full" >
            Promedio de duración de partida <br/>en un rango de fecha
        </IonButton>

              <IonPopover
                  isOpen={showPopover}
                  cssClass='my-custom-class ion-padding'
                  onDidDismiss={e => setShowPopover(false)}
                
                >
                  <IonItem>
                    <IonInput  value={fecha1} placeholder="AAAA-MM-DD" onIonChange={e => setFecha1(e.detail.value!)}></IonInput>
                  </IonItem>
                  <IonItem >
                    <IonInput  value={fecha2} placeholder="AAAA-MM-DD" onIonChange={e => setFecha2(e.detail.value!)}></IonInput>
                  </IonItem>

                  <IonButton className='ion-margin'  onClick={ConsultUno}>Agregar</IonButton>
              </IonPopover>

              <IonPopover
                  isOpen={showPopover2}
                  cssClass='my-custom-class ion-padding'
                  onDidDismiss={e => setShowPopover2(false)}
                
                >
                  <IonItem>
                    <IonInput  value={fecha1} placeholder="AAAA-MM-DD" onIonChange={e => setFecha1(e.detail.value!)}></IonInput>
                  </IonItem>
                  <IonItem >
                    <IonInput  value={fecha2} placeholder="AAAA-MM-DD" onIonChange={e => setFecha2(e.detail.value!)}></IonInput>
                  </IonItem>

                  <IonButton className='ion-margin'  onClick={ConsultDos}>Agregar</IonButton>
              </IonPopover>

              <IonPopover
                  isOpen={showPopover3}
                  cssClass='my-custom-class ion-padding'
                  onDidDismiss={e => setShowPopover3(false)}
                
                >
                  <IonItem>
                    <IonInput  value={campeon} placeholder="Campeon" onIonChange={e => setCampeon(e.detail.value!)}></IonInput>
                  </IonItem>

                  <IonButton className='ion-margin'  onClick={ConsultTres}>Agregar</IonButton>
              </IonPopover>

              <IonPopover
                  isOpen={showPopover4}
                  cssClass='my-custom-class ion-padding'
                  onDidDismiss={e => setShowPopover4(false)}
                
                >
                  <IonItem>
                    <IonInput  value={campeon} placeholder="Campeon" onIonChange={e => setCampeon(e.detail.value!)}></IonInput>
                  </IonItem>

                  <IonButton className='ion-margin'  onClick={ConsultCuatro}>Agregar</IonButton>
              </IonPopover>

              <IonPopover
                  isOpen={showPopover5}
                  cssClass='my-custom-class ion-padding'
                  onDidDismiss={e => setShowPopover5(false)}
                
                >
                  <IonItem>
                    <IonInput  value={perfil} placeholder="Perfil" onIonChange={e => setperfil(e.detail.value!)}></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonInput  value={fecha1} placeholder="AAAA-MM-DD" onIonChange={e => setFecha1(e.detail.value!)}></IonInput>
                  </IonItem>
                  <IonItem >
                    <IonInput  value={fecha2} placeholder="AAAA-MM-DD" onIonChange={e => setFecha2(e.detail.value!)}></IonInput>
                  </IonItem>

                  <IonButton className='ion-margin'  onClick={ConsultCinco}>Agregar</IonButton>
              </IonPopover>

              <IonPopover
                  isOpen={showPopover6}
                  cssClass='my-custom-class ion-padding'
                  onDidDismiss={e => setShowPopover5(false)}
                
                >
                  <IonItem>
                    <IonInput  value={fecha1} placeholder="AAAA-MM-DD" onIonChange={e => setFecha1(e.detail.value!)}></IonInput>
                  </IonItem>
                  <IonItem >
                    <IonInput  value={fecha2} placeholder="AAAA-MM-DD" onIonChange={e => setFecha2(e.detail.value!)}></IonInput>
                  </IonItem>

                  <IonButton className='ion-margin'  onClick={ConsultSeis}>Agregar</IonButton>
              </IonPopover>
           

        <IonButton onClick={() => setShowPopover2(true)} className='ion-margin' expand="full" >
            Campeon más utilizado por los profesionales <br/>en un rango de fecha
        </IonButton>

        <IonButton onClick={() => setShowPopover3(true)} className='ion-margin' expand="full" >
            Items más utilizados por un campeon
        </IonButton>

        <IonButton onClick={() => setShowPopover4(true)} className='ion-margin' expand="full" >
            Runas más utilizadas por un campeon
        </IonButton>

        <IonButton onClick={() => setShowPopover5(true)} className='ion-margin' expand="full" >
            Campeon más jugado en un rango de tiempo
        </IonButton>

        <IonButton onClick={() => setShowPopover6(true)} className='ion-margin' expand="full" >
            Campeon más jugado por los demás <br/> en un rango de tiempo
        </IonButton>


        <IonCard>
          <IonCardSubtitle className='ion-margin'>
            {resultado1}
          </IonCardSubtitle>

          <IonCardContent>
            {resultado2}
          </IonCardContent>
        </IonCard>
        
      </IonContent>
    </IonPage>
    )
}
