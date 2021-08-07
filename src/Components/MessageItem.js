import React, { useState, useEffect } from 'react';


export default ({data, user, setBody, setVisible}) => {
    const [time, setTime] = useState('');
    
    const tempo = ()=>{
        let currentDate = '';
        let now =new Date(data.date);
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let Dia = now.getDate();
        let Mes = (now.getMonth()+1);
        let Ano = now.getFullYear(); 
        hours = hours < 10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        Dia = Dia < 10 ? '0'+Dia : Dia;
        Mes = Mes < 10 ? '0'+Mes : Mes;
        currentDate = Dia+'/'+Mes+'/'+Ano;
        currentDate += ' ';
        currentDate += hours+':'+minutes;
        setTime(currentDate);
    }

    
    useEffect(()=>{
        tempo();
    }, []);

    const openModal = (body)=>{
        setVisible(true);
        setBody(body);
    }

    return (
        <div
            className="messageLine"
            
            style={{
                justifyContent: user=== data.autor ? 'flex-end' : 'flex-start'
            }}
        >
           
            <div
                className="messageItem"
               
            style={{
                    backgroundColor: user === data.autor ? '#DCF8C6' : '#ccc'
                }}
            >
                 <strong style={{
                    color: user === data.autor ? '#23C725' : '#2344C7',  marginBottom: '1px', marginLeft:'5px', fontSize: '10px'
                }} >{data.nome}</strong>
               {data.type === "text" &&
                    <>
                  <div className="messageText">{data.body} </div>
                  {/* <div className="messageDate">{time}</div> */}
                  </>
               }
               {data.type === "audio" &&
                    <>
                 <audio controls
                source src={data.body} type="audio/mp4"
                >  
                </audio>
                  {/* <div className="messageDate">{time}</div> */}
                  </>
               }

                {data.type === "image" &&
                    <>
                 <img className="imgChat"
                 src={data.body} 
                />  
                
                  {/* <div className="messageDate">{time}</div> */}
                  </>
               }

                {data.type === "video" &&
                    <>
                     <div  className="video--btn"  width="200" height="200"
                     onClick={()=>openModal(data.body)}
                    >
                        <img src="../assets/video.png" alt="Video" width="100" height="100"/>
                        
                    </div>
                {/*  */}
                
                  {/* <div className="messageDate">{time}</div> */}
                  </>
               }
              
            </div>
        </div>
    );
}