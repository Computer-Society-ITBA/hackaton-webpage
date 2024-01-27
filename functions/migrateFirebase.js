const { db } = require("./api/firebaseConfig");

const firestore = db;

// https://stackoverflow.com/questions/49691215/cloud-functions-how-to-copy-firestore-collection-to-a-new-document/60137639#60137639
async function copyCollection(
    srcCollectionName,
    destCollectionName,
    subcollectionName
) {
    const srcCollection = firestore.collection(srcCollectionName);
    const documents = await srcCollection.get();
    let writeBatch = firestore.batch();
    const destCollection = firestore.collection(destCollectionName);
    let i = 0;
    for (const doc of documents.docs) {
        writeBatch.set(destCollection.doc(doc.id), doc.data());
        if (subcollectionName) {
            await copyCollection(
                `${srcCollectionName}/${doc.id}/${subcollectionName}`,
                `${destCollectionName}/${doc.id}/${subcollectionName}`
            );
        }
        i++;
        if (i > 400) {
            // write batch only allows maximum 500 writes per batch
            i = 0;
            console.log("Intermediate committing of batch operation");
            await writeBatch.commit();
            writeBatch = firestore.batch();
        }
    }
    if (i > 0) {
        console.log(
            "Firebase batch operation completed. Doing final committing of batch operation."
        );
        await writeBatch.commit();
    } else {
        console.log("Firebase batch operation completed.");
    }
}

copyCollection("submissions", "2023_submissions")
    .then(() => console.log("copy complete"))
    .catch((error) => console.log("copy failed. " + error));
