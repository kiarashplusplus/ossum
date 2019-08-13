import React, { Component } from 'react';
import bridgeCover from './videos/Bridge In Place.jpg';
import bridgeVideo from './videos/Bridge In Place.mp4';
import sunriseCover from './videos/coverr-sunrise-1563948708950.jpg';
import sunriseVideo from './videos/coverr-sunrise-1563948708950.mp4';
import beachCover from './videos/coverr-bali-beach-overhead-1563969579253.jpg';
import beachVideo from './videos/coverr-bali-beach-overhead-1563969579253.mp4';
import './App.css';
import { Player } from 'video-react';
import ScrollMenu from 'react-horizontal-scrolling-menu';

const list = [
  { name: 'Bridge' },
  { name: 'Sunrise' },
  { name: 'Beach' },
];

const videos = {
  'Bridge': {video: bridgeVideo, cover: bridgeCover},
  'Sunrise': {video: sunriseVideo, cover: sunriseCover},
  'Beach': {video: beachVideo, cover: beachCover},
}

const MenuItem = ({text, selected}) => {
  return <div
    className={`menu-item ${selected ? 'active' : ''}`}
    >{text}</div>;
};

export const Menu = (list, selected) =>
  list.map(el => {
    const {name} = el;
 
    return <MenuItem text={name} key={name} selected={selected} />;
  });
 

class App extends Component {
  constructor(props) {
    super(props);
    this.menuItems = Menu(list, this.state.selected);
  }

  state = {
    selected: 'Bridge'
  };
 
  onSelect = key => {
    this.setState({ selected: key });
  }

  render() {
    const { selected } = this.state;
    const {video, cover} = videos[selected];
    return (
      <div className="App">

        <header className="App-header">
        <Player
          autoPlay
          playsInline
          poster={cover}
          src={video}
        />
        <ScrollMenu
          data={this.menuItems}
          hideArrows
          selected={selected}
          onSelect={this.onSelect}
        />
        </header>
      </div>
    );
  }
}

export default App;
