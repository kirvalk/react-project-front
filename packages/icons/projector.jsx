const React = require('react');
const PropTypes = require('prop-types');
const className = require('class-name/class-name');

class ProjectorIcon extends React.Component {
  constructor(props) {
    super(props);

    this.updateRoom = this.updateRoom.bind(this);
  }

  updateRoom() {
    const { room, updateRoom } = this.props;
    const { id } = room;
    let { projector } = room.equipment;
    projector = projector === 1 ? 0 : 1;

    const newParam = { equipment: { projector } };
    updateRoom(id, newParam);
  }

  render() {
    const { room } = this.props;
    const { projector } = room.equipment;
    return (
      <svg
        className={className({ name: 'projector-icon', mods: { active: projector === 1 } })}
        onClick={this.updateRoom}
        viewBox="0 0 297 297"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M270.856,86.015H252.43c4.412,8.271,6.922,17.703,6.922,27.713c0,32.58-26.506,59.086-59.086,59.086
      s-59.086-26.506-59.086-59.086c0-10.01,2.511-19.442,6.922-27.713H26.144C11.728,86.015,0,97.743,0,112.159v72.158
      c0,14.416,11.728,26.144,26.144,26.144h8.366v6.798c0,5.775,4.682,10.458,10.458,10.458s10.458-4.682,10.458-10.458v-6.798h186.148
      v6.798c0,5.775,4.682,10.458,10.458,10.458s10.458-4.682,10.458-10.458v-6.798h8.366c14.416,0,26.144-11.728,26.144-26.144v-72.158
      C297,97.743,285.272,86.015,270.856,86.015z M96.734,172.814H44.968c-4.043,0-7.32-3.277-7.32-7.32s3.277-7.32,7.32-7.32h51.766
      c4.043,0,7.32,3.277,7.32,7.32S100.777,172.814,96.734,172.814z M96.734,138.304H44.968c-4.043,0-7.32-3.277-7.32-7.32
      c0-4.043,3.277-7.32,7.32-7.32h51.766c4.043,0,7.32,3.277,7.32,7.32C104.055,135.026,100.777,138.304,96.734,138.304z"
        />
        <path d="M200.266,158.173c24.507,0,44.445-19.938,44.445-44.445s-19.938-44.445-44.445-44.445s-44.445,19.938-44.445,44.445
      S175.759,158.173,200.266,158.173z"
        />
      </svg>
    );
  }
}

ProjectorIcon.propTypes = {
  room: PropTypes.object.isRequired,
  updateRoom: PropTypes.func.isRequired,
};
module.exports = ProjectorIcon;
