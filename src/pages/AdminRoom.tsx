// import { FormEvent, useEffect, useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';

import logoImg from "../assets/images/logo.svg";
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';


import { database } from '../services/firebase';
import { Button } from "../components/Button";
import { Question } from '../components/Question';
import { RoomCode } from "../components/Roomcode";
import { useRoom } from '../hooks/useRoom';
// import { database } from '../services/firebase';
import "../styles/room.scss";


type RoomParams = {
    id: string;
}


export function AdminRoom(){
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {title, questions} = useRoom(roomId);

    async function handleEndRoom() {
        if(window.confirm('Tem certeza que deseja encerrar está sala?')){await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });}

        history.push('/')
    }
    
    async function handleDeleteQuestion(questionId: string){
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')){
            await database.ref(`questions/${questionId}`).remove();
            
        }
        
    }
    async function handleCheckQuestionAsAnswered(questionId:string) {
        await database.ref(`questions/${questionId}`).update({
            isAnswered: true,
        });
    }
    async function handleHighLightQuestion(questionId:string) {
        await database.ref(`questions/${questionId}`).update({
            isHighLighted: true,
        });
    }
    
    
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Lestmeask" />
                    <div>

                    <RoomCode code={roomId}/>
                    <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    
                    </div>
                    
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1> Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                
                <div className="question-list">
                { questions.length <=0 && <div><h2>Você ainda não possui perguntas</h2></div> }
                {questions.map(question=>{
                    return(
                        <Question
                        key={question.id}
                        content = {question.content}
                        author = {question.author}
                        isAnswered = {question.isAnswered}
                        isHighLighted = {question.isHighLighted}
                        >
                            {!question.isAnswered && (
                                <>
                                <button
                                type='button'
                                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                >
                                <img src={checkImg} alt="Marcar pegunta como respondida" />
                                </button>
                                <button
                                    type='button'
                                    onClick={() => handleHighLightQuestion(question.id)}
                                >
                                    <img src={answerImg} alt="Dar destaque á pergunta" />
                                </button>
                                </>
                            )}
                            <button
                                type='button'
                                onClick={() => handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="Remover pergunta" />
                            </button>
                        </Question>
                    );
                })}

                </div>
            </main>
        </div>
    );
}