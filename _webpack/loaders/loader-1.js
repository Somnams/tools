function loader1(sourceCode) {
    console.log('join loader1');
    return sourceCode + `\n const loader1 = 'loader1' \n`;
}

module.exports = loader1;