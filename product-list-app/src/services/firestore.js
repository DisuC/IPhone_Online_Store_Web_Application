import { collection,addDoc} from 'firebase/firestore';
import {db} from '../firebase';


export async function addData(collectionName,data){
    try{
        const docRef = await addDoc(collection(db,collectionName),data);
        console.log("Document Written With ID:",docRef.id);
        return docRef.id;
    }catch (e) {
        console.error("Error Adding Document:",e);
        throw e;
    }
}