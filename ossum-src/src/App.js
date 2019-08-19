import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Player } from "video-react";
import { filter } from "lodash";
import Hls from "hls.js";
import HLSSource from "./HLSSource";
import "./App.css";

const ossumVideosUrl = "https://res.cloudinary.com/ossum/video/upload/";
const ossumImageUrl = "https://res.cloudinary.com/ossum/image/upload/";

const videos = {
  Bridge: {
    video: "v1565908181/Bridge_In_Place_bfubzg.mp4",
    hls: "v1565908181/Bridge_In_Place_bfubzg.m3u8",
    cover: "v1565816228/Bridge_In_Place_xga1ot.jpg",
    buttons: [
      {
        startTime: 0,
        endTime: 1000,
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
    video: "v1565908175/coverr-sunrise-1563948708950_oqeaic.mp4",
    hls: "v1565908175/coverr-sunrise-1563948708950_oupdpu.m3u8",
    cover: "v1565816229/coverr-sunrise-1563948708950_li2su1.jpg",
    buttons: [
      {
        startTime: 0,
        endTime: 1000,
        name: "Bridge"
      }
    ]
  },
  Beach: {
    video: "v1565908176/coverr-bali-beach-overhead-1563969579253_xooqgl.mp4",
    hls: "v1565908176/coverr-bali-beach-overhead-1563969579253_xooqgl.m3u8",
    cover: "v1565816227/coverr-bali-beach-overhead-1563969579253_puhw3l.jpg"
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
    const { video, hls, cover } = videos[this.state.selected];
    const isHlsSupported = Hls.isSupported();

    return (
      <div className="App">
        <header className="App-header">
          <div className="Menu">
            <ScrollMenu
              data={Menu(this.state.buttons, this.state.selected)}
              hideArrows
              selected={this.state.selected}
              onSelect={this.onSelect}
            />
          </div>
          {isHlsSupported ? (
            <Player
              ref={player => {
                this.player = player;
              }}
              autoPlay
              playsInline
              preload="auto"
            >
              <HLSSource isVideoChild src={ossumVideosUrl + hls} />
            </Player>
          ) : (
            <Player
              ref={player => {
                this.player = player;
              }}
              autoPlay
              playsInline
              poster={ossumImageUrl + cover}
              rc={ossumVideosUrl + video}
              preload="auto"
            ></Player>
          )}
        </header>
      </div>
    );
  }
}

export default App;
