const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
    return res.json({
        hello: "helloworld"
    })
});

exports.calculate = functions.https.onRequest((req, res) => {

    const data = req.query
    let result;
    if (data.symbol == "add") {
        result = data.a + data.b
        return res.set({ 'Access-Control-Allow-Origin': '*' }).status(200).json({
            result: result
        })
    } else if (data.symbol == "substract") {
        result = data.a - data.b
        return res.set({ 'Access-Control-Allow-Origin': '*' }).status(200).json({
            result: result
        })
    } else if (data.symbol == "multiply") {
        result = data.a * data.b
        return res.set({ 'Access-Control-Allow-Origin': '*' }).status(200).json({
            result: result
        })
    }
    // console.log(req.query)
    // return req.query
})