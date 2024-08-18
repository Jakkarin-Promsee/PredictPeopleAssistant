const tf = require('@tensorflow/tfjs-node');

// Path to your model directory
const modelPath = 'models_AI\tfjs_model\model.json';

// Load the model
async function loadModel() {
    const model = await tf.loadLayersModel(modelPath);
    console.log('Model loaded successfully');
    return model;
}
