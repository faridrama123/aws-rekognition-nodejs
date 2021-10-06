const AWS = require('aws-sdk')
const bucket        = '' // the bucketname without s3://
const photo_source  = ''
const photo_target  = ''
const fs = require('fs');


class RekognitionService {
    
    
    async addCompareFace (face1, face2) {

        const something1 =   fs.readFileSync('./src/foto1.PNG', {encoding: 'base64'});
        //console.log ("something1 : " + something1);
        const foto1 = Buffer.from(something1, 'base64');

        const something2 =   fs.readFileSync('./src/foto2.PNG', {encoding: 'base64'});
        const foto2 = Buffer.from(something2, 'base64');

        AWS.config.update({
            accessKeyId: "AKIATPZL3VIPIGKYF3F5",
            secretAccessKey: "OJl2WHPTo9zNCTV6TxlvAkEeDKgXty9bzOOGNOn",
            region: "ap-southeast-1"
        });

        const client = new AWS.Rekognition();


        const params = {
        SourceImage: {
            Bytes : foto1
        },
        TargetImage: {
            Bytes : foto2
        },
        SimilarityThreshold: 70
        }
      var result = '';
            try {
               await client.compareFaces(params, function(err, response) {
                    if (err) {
                        console.log(err, err.stack); // an error occurred
                    } else {
                        response.FaceMatches.forEach(data => {
                        let position   = data.Face.BoundingBox
                        let similarity = data.Similarity
                        console.log(`The face at: ${position.Left}, ${position.Top} matches with ${similarity} % confidence`)
                        result = similarity;        
                        }) // for response.faceDetails
                    } 
        
                }).promise();
                // process data.
            } catch (error) {
                return null;
                // error handling.
            } finally {
                // eslint-disable-next-line no-unsafe-finally
                return result
                // finally.
            }

    }
  
  
}

module.exports = RekognitionService;
