const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const sqs = new AWS.SQS();

exports.handler = async (event) => {
    try {
        var name = JSON.parse(event.body).name || null
        if (name && !ifSpecial(name)){
            await sqs.sendMessage({
                MessageBody: JSON.stringify({
                    name: name
                }),
                QueueUrl: 'https://sqs.us-east-1.amazonaws.com/676419150741/colaCKK'
            }).promise();
        }else{
            console.log("No se encontro name o tiene caracteres invalidos")
            return {
                statusCode: 500,
                body: "No se encontro name o tiene caracteres invalidos"
            };
        }

        // All messages on SQS *MUST* be a String


    }
    catch (err) {
        console.log(err);

        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }

    return { statusCode: 200 };
};

function ifSpecial (inputText){
    let charactersAlan = ["#",'"',"'","!","|","°","¬","%","$","%","&","/","(",")","=",'\\',"<",">","[","]","{","}","^","`"]
    let detect = false
    charactersAlan.forEach(character => {
        if( inputText.indexOf(character) != -1){
            detect =  true
        }
    });
    return detect
}
