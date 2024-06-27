const fs = require('fs'); // Import the file system module
const path = require('path'); // Import the path module
const { Circle, Triangle, Square } = require('./lib/shapes'); // Import our shape classes

// Our main function, needs to be async for the dynamic import
async function main() {
  // Dynamically import inquirer
  const inquirer = await import('inquirer');

  // Questions we'll ask the user
  const questions = [
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo text:',
      validate: (input) => input.length <= 3 || 'Text must be up to three characters long.', // Validate text length
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hexadecimal):', // Ask for text color
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape for the logo:',
      choices: ['Circle', 'Triangle', 'Square'], // Provide shape options
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hexadecimal):', // Ask for shape color
    },
  ];

  // Ask the questions and get the answers
  inquirer.default.prompt(questions).then((answers) => {
    let shape;

    // Create the chosen shape with the chosen color
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

    // Create the SVG content with a size of 300x200 pixels
    const svgContent = `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        ${shape.render()}
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>
      </svg>
    `;

    // Ensure the dist directory exists
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist'); // Create the dist directory if it doesn't exist
    }

    // Save the generated SVG file in the dist directory
    const filePath = path.join('dist', 'logo.svg');
    fs.writeFile(filePath, svgContent, (err) => {
      if (err) {
        console.error('Error writing SVG file', err); // Log any errors
      } else {
        console.log('Generated logo.svg in the dist directory'); // Success message
      }
    });
  });
}

// Run the main function
main();
