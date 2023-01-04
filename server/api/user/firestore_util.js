const { doc, setDoc, updateDoc, deleteDoc, getDocs, collection, addDoc} = require("firebase/firestore") 
const {error} = require('../util')
const {db} = require('../config')

const USER_COLLECTION = 'users'
const MEMBERS_COLLECTION = 'members'

//si doc se usa con varios argumentos, la logica creo que es: [collection, document, collection, document, ...]
async function addMember(uid, memberDNI, memberEmail, memberFullName){
    const data = {
        full_name:  memberFullName,
        dni:        memberDNI, 
        email:      memberEmail
    }
    try{
        const ans = await addDoc(collection(db, USER_COLLECTION, uid, MEMBERS_COLLECTION),data)
        return ans
    }catch(err){
        return error(err.code, err.message)
    }
}
async function editMember(uid,memberId, memberDNI, memberEmail, memberFullName){
    const data = {
        full_name:  memberFullName,
        dni:        memberDNI, 
        email:      memberEmail
    }
    try{
        await updateDoc(doc(db, USER_COLLECTION, uid, MEMBERS_COLLECTION, memberId), data)
        return data
    }catch(err){
        return error(err.code, err.message)
    }
}
async function deleteMember(uid, memberId){
    try{
        await deleteDoc(doc(db,USER_COLLECTION, uid, MEMBERS_COLLECTION, memberDNI))
        return {message:"success"}
    }catch(err){
        return error(err.code, err.message)
    }
}

async function getMembers(uid){
    try{
        const ans = await getDocs(collection(db, USER_COLLECTION, uid, MEMBERS_COLLECTION))
        return ans.map((doc)=>{ return {id: doc.id, data:doc.data()}})
    }catch(err){
        return error(err.code, err.message)
    }
}

async function editQualification(uid, qualifiedValue){
    const data = {qualified: qualifiedValue}
    try{
        await updateDoc(doc(USER_COLLECTION, uid), data)
        return data
    }catch(err){
        return error(err.code, err.message)
    }
}

module.exports = {addMember, editMember, deleteMember, getMembers, editQualification}