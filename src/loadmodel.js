// loadmodel.js
const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    try {
        const model = await tf.loadLayersModel('https://storage.googleapis.com/model_sereluna/tfjs_model/model.json');
        console.log('Model loaded successfully');
        return model;
    } catch (error) {
        console.error('Error loading model:', error);
        throw error;
    }
}

module.exports = loadModel;
