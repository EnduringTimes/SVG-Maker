const fs = require('fs');
const path = require('path');
const { Circle, Triangle, Square } = require('./lib/shapes');

async function main() {
  const inquirer = await import('inquirer');

  const questions = [
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo text:',
      validate: (input) => input.length <= 3 || 'Text must be up to three characters long.',
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hexadecimal):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape for the logo:',
      choices: ['Circle', 'Triangle', 'Square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hexadecimal):',
    },
  ];

  inquirer.default.prompt(questions).then((answers) => {
    let shape;
    switch (answers.shape) {
      case 'Circle':
        shape = new Circle(answers.shapeColor);
        break;
      case 'Triangle':
        shape = new Triangle(answers.shapeColor);
        break;
      case 'Square':
        shape = new Square(answers.shapeColor);
        break;
    }

    const svgContent = `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        ${shape.render()}
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>
      </svg>
    `;

    // Ensure the dist directory exists
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist');
    }

    // Save the generated SVG file in the dist directory
    const filePath = path.join('dist', 'logo.svg');
    fs.writeFile(filePath, svgContent, (err) => {
      if (err) {
        console.error('Error writing SVG file', err);
      } else {
        console.log('Generated logo.svg in the dist directory');
      }
    });
  });
}

main();
