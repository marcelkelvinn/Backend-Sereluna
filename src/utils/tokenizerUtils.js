const fs = require('fs');
const path = require('path');

class Tokenizer {
    constructor(config) {
        this.word_index = config.word_index;
    }

    textsToSequences(texts) {
        return texts.map(text => {
            return text.split(' ').map(word => {
                const wordLowerCase = word.toLowerCase();
                return this.word_index[wordLowerCase] || 0;
            });
        });
    }
}

function loadTokenizer() {
    const tokenizerPath = path.resolve(__dirname, '../tokenizer.json'); // Path to tokenizer.json
    const tokenizerData = fs.readFileSync(tokenizerPath, 'utf8');
    const tokenizerConfig = JSON.parse(tokenizerData);

    // Create and return the Tokenizer instance
    return new Tokenizer(tokenizerConfig);
}

module.exports = { loadTokenizer };
