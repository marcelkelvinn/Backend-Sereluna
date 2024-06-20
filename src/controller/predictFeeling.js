const tf = require('@tensorflow/tfjs-node');
const { loadTokenizer } = require('../utils/tokenizerUtils');
require('dotenv').config();

async function predictFeeling(text) {
    try {
        // Load tokenizer
        const tokenizer = loadTokenizer();

        if (!tokenizer || typeof tokenizer.textsToSequences !== 'function') {
            throw new Error('Tokenizer or textsToSequences method is undefined or null');
        }

        // Preprocess text
        const sequence = tokenizer.textsToSequences([text])[0];
        console.log('Tokenized Sequence:', sequence); // Debugging

        const paddedSequence = padSequence(sequence, 50); // Padding sequence to ensure length 50
        console.log('Padded Sequence:', paddedSequence); // Debugging

        // Convert to tensor
        const tensor = tf.tensor2d([paddedSequence], [1, 50]);
        console.log('Tensor:', tensor.toString()); // Debugging

        // Load model
        const modelPath = process.env.MODEL_URL;
        const model = await tf.loadLayersModel(modelPath);

        // Make prediction
        const prediction = model.predict(tensor);
        console.log('Raw Prediction:', prediction.toString()); // Debugging

        const feelingIndex = prediction.argMax(-1).dataSync()[0];
        console.log('Feeling Index:', feelingIndex); // Debugging

        const feelings = ['bahagia', 'sedih', 'marah'];
        const feeling = feelings[feelingIndex];

        let label, suggestion;

        if (feeling === 'bahagia') {
            label = 'Anda sedang Bahagia';
            suggestion = 'Pertahankan kebahagiaan Anda!';
        } else if (feeling === 'sedih') {
            label = 'Anda sedang Sedih';
            suggestion = 'Anda bisa membaca artikel mengenai cara mengatasi sedih di bagian articles';
        } else {
            label = 'Anda sedang Marah';
            suggestion = 'Anda bisa membaca artikel mengenai cara mengatasi marah di bagian articles';
        }

        return { label, suggestion };

    } catch (error) {
        res.status(500).json({ error: `Terjadi kesalahan dalam melakukan prediksi: ${error.message}` });
    }
}

function padSequence(sequence, maxLength) {
    if (sequence.length >= maxLength) {
        return sequence.slice(0, maxLength);
    } else {
        const padLength = maxLength - sequence.length;
        return Array(padLength).fill(0).concat(sequence);
    }
}

module.exports = predictFeeling;
