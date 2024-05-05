import React, { Component } from "react";
import "./App.css";
import FaceRecognition from "./components/FaceRecognition";
import "./components/FaceRecognition.css";

function getColorShade(hexValue) {
  const colorShades = {
    "#FF0000": "Red",
    "#00FF00": "Green",
    "#0000FF": "Blue",
    
  };
  return colorShades[hexValue] || hexValue;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      colorList: [],
      copiedColorIndex: null,
      searchInput: "",
      matchingColors: [], 
      predictedColor: null, 
    };
  }

  componentDidMount() {
    this.generateColorPalette();
    this.predictColor();
  }

  generateColorPalette = () => {
    const maxColorBoxes = 21;
    const colorList = [];

    for (let i = 0; i < maxColorBoxes; i++) {
      const randomHexColor = `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")}`;
      colorList.push(randomHexColor);
    }

    this.setState({ colorList, copiedColorIndex: null });
  };

  predictColor = () => {
    const colorMapping = {
      red: ["#FF0000", "#FF5733", "#c21919", "#FF6347", "#FF4500"],
      green: ["#00FF00", "#33FF73", "#C3FF00", "#228B22", "#008000"],
      blue: ["#0000FF", "#3373FF", "#00C3FF", "#1E90FF", "#4169E1"],
      yellow: ["#FFFF00", "#FFD700", "#FFEA00", "#F0E68C", "#FFAC33"],
      pink: ["#FFC0CB", "#FF69B4", "#FF1493", "#FF6EB4", "#FF82AB"],
      purple: ["#800080", "#9932CC", "#8A2BE2", "#A020F0", "#8000FF"],
      orange: ["#FFA500", "#FFD700", "#FF8C00", "#FF7F50", "#FF4500"],
      brown: ["#A52A2A", "#8B4513", "#D2691E", "#CD853F", "#DEB887"],
      cyan: ["#00FFFF", "#20B2AA", "#40E0D0", "#00CED1", "#00C5CD"],
      magenta: ["#FF00FF", "#FF69B4", "#DA70D6", "#BA55D3", "#FFA0B4"],
      teal: ["#008080", "#008B8B", "#00FFFF", "#20B2AA", "#40E0D0"],
      navy: ["#000080", "#00008B", "#0000FF", "#4169E1", "#0000CD"],
      lime: ["#00FF00", "#32CD32", "#7FFF00", "#00FA9A", "#00FF7F"],
      maroon: ["#800000", "#8B0000", "#B22222", "#A52A2A", "#800000"],
      olive: ["#808000", "#6B8E23", "#556B2F", "#8FBC8B", "#9ACD32"],
      silver: ["#C0C0C0", "#D3D3D3", "#DCDCDC", "#BEBEBE", "#A9A9A9"],
      black: ["#000000", "#080808", "#121212", "#1C1C1C", "#262626"],
      white: ["#FFFFFF", "#F5F5F5", "#FAFAFA", "#E0E0E0", "#D3D3D3"],
  
    };

    const randomColorKeys = Object.keys(colorMapping);
    const randomKeyIndex = Math.floor(Math.random() * randomColorKeys.length);
    const randomKey = randomColorKeys[randomKeyIndex];
    const randomColors = colorMapping[randomKey];

    const selectedColors = [];
    while (selectedColors.length < 5) {
      const randomColorIndex = Math.floor(Math.random() * randomColors.length);
      const randomColor = randomColors[randomColorIndex];
      if (!selectedColors.includes(randomColor)) {
        selectedColors.push(randomColor);
      }
    }

    this.setState({ predictedColor: selectedColors });
  };

  copyColorToClipboard = (hexValue, index) => {
    navigator.clipboard
      .writeText(hexValue)
      .then(() => {
        this.setState({ copiedColorIndex: index });
      })
      .catch(() => {
        alert("Failed to copy the color code!");
      });
  };

  handleSearchChange = (e) => {
    const searchInput = e.target.value.toLowerCase();
    const colorMapping = {
      red: ["#FF0000", "#FF5733", "#c21919", "#FF6347", "#FF4500"],
      green: ["#00FF00", "#33FF73", "#C3FF00", "#228B22", "#008000"],
      blue: ["#0000FF", "#3373FF", "#00C3FF", "#1E90FF", "#4169E1"],
      yellow: ["#FFFF00", "#FFD700", "#FFEA00", "#F0E68C", "#FFAC33"],
      pink: ["#FFC0CB", "#FF69B4", "#FF1493", "#FF6EB4", "#FF82AB"],
      purple: ["#800080", "#9932CC", "#8A2BE2", "#A020F0", "#8000FF"],
      orange: ["#FFA500", "#FFD700", "#FF8C00", "#FF7F50", "#FF4500"],
      brown: ["#A52A2A", "#8B4513", "#D2691E", "#CD853F", "#DEB887"],
      cyan: ["#00FFFF", "#20B2AA", "#40E0D0", "#00CED1", "#00C5CD"],
      magenta: ["#FF00FF", "#FF69B4", "#DA70D6", "#BA55D3", "#FFA0B4"],
      teal: ["#008080", "#008B8B", "#00FFFF", "#20B2AA", "#40E0D0"],
      navy: ["#000080", "#00008B", "#0000FF", "#4169E1", "#0000CD"],
      lime: ["#00FF00", "#32CD32", "#7FFF00", "#00FA9A", "#00FF7F"],
      maroon: ["#800000", "#8B0000", "#B22222", "#A52A2A", "#800000"],
      olive: ["#808000", "#6B8E23", "#556B2F", "#8FBC8B", "#9ACD32"],
      silver: ["#C0C0C0", "#D3D3D3", "#DCDCDC", "#BEBEBE", "#A9A9A9"],
      black: ["#000000", "#080808", "#121212", "#1C1C1C", "#262626"],
      white: ["#FFFFFF", "#F5F5F5", "#FAFAFA", "#E0E0E0", "#D3D3D3"],
    
    };

    const matchingColors = colorMapping[searchInput] || [];
    this.setState({ searchInput, matchingColors });
  };

  handleSearchSubmit = () => {
    console.log("Search for color:", this.state.searchInput);
  };

  render() {
    const filteredColorList =
      this.state.matchingColors.length > 0
        ? this.state.matchingColors
        : this.state.colorList;
  
    return (
      <div>
        <h1>Color Palette Generator</h1>
        <FaceRecognition />
        {this.state.predictedColor && (
          <div>
            <h2>Your predicted color palette is:</h2>
            
            <div
              className="predicted-color-palette"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
                color: "lightblue",
              }}
            >
              {this.state.predictedColor.map((color, index) => (
                <div key={index} style={{ margin: "0 10px" }}>
                  <div
                    className="predicted-color"
                    style={{ backgroundColor: color, width: "50px", height: "50px", borderRadius: "50%", margin: "0 auto" }}
                  ></div>
                  <span>{getColorShade(color)}</span>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              <h2>Browse other color palettes which you may like</h2>
            </p>
          </div>
        )}
  
        <div className="search-bar-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for a color"
            value={this.state.searchInput}
            onChange={this.handleSearchChange}
          />
          <button className="search-btn" onClick={this.handleSearchSubmit}>
            Search
          </button>
        </div>
  
        <ul className="container">
          {filteredColorList.map((hexValue, index) => (
            <li
              className="color"
              key={index}
              onClick={() => this.copyColorToClipboard(hexValue, index)}
            >
              <div
                className="rect-box"
                style={{ background: hexValue }}
              ></div>
              <span className="hex-value">
                {hexValue}
                {this.state.copiedColorIndex === index && (
                  <p className="copied-message">Copied</p>
                )}
              </span>
            </li>
          ))}
          {this.state.predictedColor && this.state.predictedColor.map((color, index) => (
            <li
              className="color"
              key={index}
              onClick={() => this.copyColorToClipboard(color, index)}
            >
              <div
                className="rect-box"
                style={{ background: color }}
              ></div>
              <span className="hex-value">
                {color}
                {this.state.copiedColorIndex === index && (
                  <p className="copied-message">Copied</p>
                )}
              </span>
            </li>
          ))}
        </ul>
  
        <button
          className="refresh-btn"
          onClick={() => {
            this.generateColorPalette();
            this.predictColor();
          }}
        >
          Refresh Palette
        </button>
      </div>
    );
  }
}

export default App;
