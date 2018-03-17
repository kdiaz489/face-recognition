const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'eb6c8443b0564dab90a3b4bb8b9891a3'
});

const handleApiCall = (req, res) => {
 app.models
 	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
 	.then(data =>{
 		res.json(data);
 	})
 	.catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req,res,db) =>{
	const {id} = req.body;
		db('users').where('id', '=', id)
		.increment('entries',1)
		.returning('entries')
		.then(entries =>{
			res.json(entries[0])
		})
		.catch(err => res.status(400).json('Unable to get entries count'))
	}

module.exports ={

	handleImage,
	handleApiCall
	
}

