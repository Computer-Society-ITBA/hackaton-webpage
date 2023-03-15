const { doc, setDoc, updateDoc, deleteDoc, getDocs, collection, addDoc, getDoc} = require("firebase/firestore") 
const {error} = require('../util')
const {db, storage} = require('../config')
const {uploadBytes, getDownloadURL, ref} = require('firebase/storage')

const USER_COLLECTION = 'users'
const MEMBERS_COLLECTION = 'members'
const DOCUMENTS_COLLECTION = 'documents'

//si doc se usa con varios argumentos, la logica creo que es: [collection, document, collection, document, ...]
async function addMember(uid, memberDNI, memberEmail, memberFullName){
    const data = {
        full_name:  memberFullName,
        dni:        memberDNI, 
        email:      memberEmail
    }
    try{
        // const ans = await addDoc(collection(db, USER_COLLECTION, uid, MEMBERS_COLLECTION),data)
        // const ans = await addDoc(db.collection(`/${USER_COLLECTION}/${uid}/${MEMBERS_COLLECTION}`),data)
        const ans = db.collection(`/${USER_COLLECTION}/${uid}/${MEMBERS_COLLECTION}`).add(data)
        return {id:ans.id, data:data}
    }catch(err){
        console.log(err)
        return error(err.code, err.message)
    }
}
async function editMember(uid,memberId, memberDNI, memberEmail, memberFullName){
    const aux = {
        full_name:  memberFullName,
        dni:        memberDNI, 
        email:      memberEmail
    }
    const data = JSON.parse(JSON.stringify(aux))//para sacar campos undefined (si no da error firestore)
    try{
        // await updateDoc(doc(db, USER_COLLECTION, uid, MEMBERS_COLLECTION, memberId), data)
        // await updateDoc(db.doc(`/${USER_COLLECTION}/${uid}/${MEMBERS_COLLECTION}/${memberId}`), data)
        await db.doc(`/${USER_COLLECTION}/${uid}/${MEMBERS_COLLECTION}/${memberId}`).update(data)
        return data
    }catch(err){
        console.log(err)
        return error(err.code, err.message)
    }
}
async function deleteMember(uid, memberId){
    try{
        // await deleteDoc(doc(db,USER_COLLECTION, uid, MEMBERS_COLLECTION, memberId))
        // await deleteDoc(db.doc(`/${USER_COLLECTION}/${uid}/${MEMBERS_COLLECTION}/${memberId}`))
        await db.doc(`/${USER_COLLECTION}/${uid}/${MEMBERS_COLLECTION}/${memberId}`).delete()
        return {message:"success"}
    }catch(err){
        console.log(err)
        return error(err.code, err.message)
    }
}

async function getMembers(uid){
    try{
        // const ans = (await getDocs(collection(db, USER_COLLECTION, uid, MEMBERS_COLLECTION))).docs
        // const ans = (await getDocs(db.collection(`/${USER_COLLECTION}/${uid}/${MEMBERS_COLLECTION}`))).docs
        const ans =  (await db.collection(`/${USER_COLLECTION}/${uid}/${MEMBERS_COLLECTION}`).get()).docs 
        return ans.map((doc)=>{ return {id: doc.id, data:doc.data()}})
    }catch(err){
        console.log(err)
        return error(err.code, err.message)
    }
}

async function editQualification(uid, qualifiedValue){
    const data = {qualified: qualifiedValue}
    try{
        // await setDoc(doc(db,USER_COLLECTION, uid), data,{merge:true})
        // await setDoc(db.doc(`/${USER_COLLECTION}/${uid}`), data,{merge:true})
        await db.doc(`/${USER_COLLECTION}/${uid}`).set(data,{merge:true})
        return data
    }catch(err){
        console.log(err)
        return error(err.code, err.message)
    }
}
async function getUserInfo(uid){
    try{
        // const ans = await getDoc(doc(db,USER_COLLECTION,uid))
        // const ans = await getDoc(db.doc(`/${USER_COLLECTION}/${uid}`))
        const ans = await db.doc(`/${USER_COLLECTION}/${uid}`).get()
        if (!ans.exists) {
            return error(404, "No such document!");
        }
        return {id: ans.id, data: ans.data()}
    }catch(err){
        return error(err.code, err.message)
    }
}
async function setUserInfo(uid, data){
    try{
        // await setDoc(doc(db,USER_COLLECTION, uid), data,{merge:true})
        // await setDoc(db.doc(`/${USER_COLLECTION}/${uid}`), data,{merge:true})
        await db.doc(`/${USER_COLLECTION}/${uid}`).set(data,{merge:true})
        return data
    }catch(err){
        console.log(err)
        return error(err.code, err.message)
    }
}
 async function saveDocument(userId, memberId, file) {
    try {
        const pdfRef = ref(storage, `documents/${userId}/${memberId}/${file.originalname}`)
        return uploadBytes(pdfRef, file.buffer).then(
            async snapshot => {
                const downloadUrl =  await getDownloadURL(snapshot.ref)
                let fileData = {
                    url: downloadUrl,
                    name: file.originalname,
                    verified: false
                }
                // const fileRef = await addDoc(db.collection(`/${USER_COLLECTION}/${userId}/${MEMBERS_COLLECTION}/${memberId}/${DOCUMENTS_COLLECTION}`),fileData)
                const fileRef = await db.collection(`/${USER_COLLECTION}/${userId}/${MEMBERS_COLLECTION}/${memberId}/${DOCUMENTS_COLLECTION}`).add(fileData)
                fileData.id = fileRef.id
                return fileData
        })
    }
    catch (err) {
        return error(err.code, err.message)
    }
}

async function verifyDocument(userId, memberId, documentId) {
    const data = {verified : true}
    try {
        // await updateDoc(db.doc(`/${USER_COLLECTION}/${userId}/${MEMBERS_COLLECTION}/${memberId}/${DOCUMENTS_COLLECTION}/${documentId}`), data)
        await db.doc(`/${USER_COLLECTION}/${userId}/${MEMBERS_COLLECTION}/${memberId}/${DOCUMENTS_COLLECTION}/${documentId}`).update(data)
        return data
    }
    catch (err) {
        return error(err.code, err.message)
    }
}

module.exports = {addMember, setUserInfo, editMember, deleteMember, getMembers, editQualification, getUserInfo, saveDocument, verifyDocument}
