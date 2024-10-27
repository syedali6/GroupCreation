const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();

exports.getData = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const data = req.body;
        try {
            const docRef = await db.collection("groups").add({
                ...data,
            });
            res.status(200).send({
                message: "Group Add Successfully",
                docId: docRef.id,
                data
            });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send({ message: "Error adding data" });
        }
    });
});

exports.getStudentData = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const data = req.body;
        try {
            const docRef = await db.collection("student_list").add({
                ...data,
            });
            res.status(200).send({
                message: "Member Add Successfully",
                docId: docRef.id,
                data
            });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send({ message: "Error adding data" });
        }
    });
});