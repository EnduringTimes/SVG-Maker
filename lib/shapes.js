// Define a base Shape class
class Shape {
    constructor(color) {
      this.color = color; // Initialize the color property
    }
  
    setColor(color) {
      this.color = color; // Method to set the color
    }
  }
  
  // Circle class extending Shape
  class Circle extends Shape {
    render() {
      // Render method to return the SVG representation of a circle
      return `<circle cx="150" cy="100" r="80" fill="${this.color}" />`;
    }
  }
  
  // Triangle class extending Shape
  class Triangle extends Shape {
    render() {
      // Render method to return the SVG representation of a triangle
      return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />`;
    }
  }
  
  // Square class extending Shape
  class Square extends Shape {
    render() {
      // Render method to return the SVG representation of a square
      return `<rect x="75" y="50" width="150" height="150" fill="${this.color}" />`;
    }
  }
  
  // Export the shape classes
  module.exports = { Circle, Triangle, Square };
  