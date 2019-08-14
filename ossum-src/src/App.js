import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Player } from "video-react";
import { filter } from "lodash";
import "./App.css";

const ossumVideosUrl = "https://ossum-tv.firebaseapp.com/videos/";
const videos = {
  Bridge: {
    video: "Bridge In Place.mp4",
    cover: "Bridge In Place.jpg",
    buttons: [
      {
        startTime: 2,
        endTime: 10,
        name: "Sunrise"
      },
      {
        startTime: 6,
        endTime: 15,
        name: "Beach"
      }
    ]
  },
  Sunrise: {
    video: "coverr-sunrise-1563948708950.mp4",
    cover: "coverr-sunrise-1563948708950.jpg",
    buttons: [
      {
        startTime: 0,
        endTime: 1000,
        name: "Bridge"
      }
    ]
  },
  Beach: {
    video: "coverr-bali-beach-overhead-1563969579253.mp4",
    cover: "coverr-bali-beach-overhead-1563969579253.jpg"
  }
};

const MenuItem = ({ text, selected }) => {
  return <div className={`menu-item ${selected ? "active" : ""}`}>{text}</div>;
};

export const Menu = (buttons, selected) =>
  buttons.map(el => {
    const { name } = el;

    return <MenuItem text={name} key={name} selected={selected} />;
  });

class App extends Component {
  state = {
    selected: "Bridge",
    buttons: [{ name: "Sunrise" }, { name: "Beach" }]
  };

  componentDidMount = () => {
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  };

  handleStateChange(state) {
    const { player } = this.player.getState();
    console.log(this.state.selected, player.currentTime);

    // Check all buttons for the selected video and filter to the ones for currentTime
    const buttons = videos[this.state.selected].buttons;
    if (buttons) {
      const filtered = filter(
        buttons,
        ({ startTime, endTime }) =>
          startTime < player.currentTime && player.currentTime < endTime
      );
      this.setState({ buttons: filtered });
    } else {
      this.setState({ buttons: [] });
    }
  }

  onSelect = key => {
    this.setState({ selected: key });
  };

  render() {
    const { video, cover } = videos[this.state.selected];

    return (
      <div className="App">
        <header className="App-header">
          <Player
            ref={player => {
              this.player = player;
            }}
            autoPlay
            playsInline
            poster={ossumVideosUrl + cover}
            src={ossumVideosUrl + video}
            preload="auto"
          />
          <div className="Menu">
            <ScrollMenu
              data={Menu(this.state.buttons, this.state.selected)}
              hideArrows
              selected={this.state.selected}
              onSelect={this.onSelect}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
