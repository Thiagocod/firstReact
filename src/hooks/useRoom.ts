import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";


type FirebaseQuestions = Record<string,{
    roomId: string;
    author:{
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likes: Record<string,{
    authorId: string;
    }>
}>

type QuestionType = {
    id: string;
    roomId: string;
    author:{
    name: string;
    avatar: string;
    id?: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likeCount: number;
    likeId: string | undefined;

}
export function useRoom(roomId: string){
    const {user} = useAuth();
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState<QuestionType[]>([]);

    useEffect(()=>{
        const questionRef = database.ref(`/questions`);
        const roomRef = database.ref(`/rooms/${roomId}`) 
        
        roomRef.on('value',room =>{
            const myRoom = room.val();
            setTitle(myRoom.title);
        });
        
        questionRef.on('value', question =>{
            const databasQuestions = question.val();
            const firebaseQuestions: FirebaseQuestions = databasQuestions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value])=>{
                    return{
                    id:key,
                    roomId: value.roomId,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered,
                    likeCount:Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                    }
            });
            function isMyRoom(value:QuestionType){
                return value.roomId == roomId;
            }
            const parsedfilterQuetions = parsedQuestions.filter(isMyRoom);
            setQuestions(parsedfilterQuetions);
        });
        return () =>{
            questionRef.off('value');
        }

    }, [roomId, user?.id]);

    return {questions, title}
}