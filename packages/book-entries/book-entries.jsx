const React = require('react');
const moment = require('moment');
const AddForm = require('add-form/add-form.jsx');
const Room = require('room/room.jsx');
const DirectionButton = require('controls/direction-button.jsx');
const createRequest = require('core/create-request');
const { responseStatuses } = require('core/constants');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
const AddRoom = require('icons/add-room');
const Filter = require('filter/filter.jsx');
const Logo = require('icons/logo.jsx');

class BookEntries extends React.Component {
  constructor(props) {
    super(props);
    moment.locale('ru');

    this.state = { rooms: [], isAdding: false, days: this.getCurrentDates() };
    this.addRoom = this.addRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
    this.moveWeek = this.moveWeek.bind(this);
    this.showAddForm = this.showAddForm.bind(this);
    this.filterRooms = this.filterRooms.bind(this);
    this.goToCurrentWeek = this.goToCurrentWeek.bind(this);
  }

  getCurrentDates() {
    const firstDay = moment().startOf('week').startOf('day');
    const currentDates = [];
    for (let i = 0; i < 7; i += 1) {
      currentDates.push(moment(firstDay).add(i, 'd').valueOf());
    }
    return currentDates;
  }

  goToCurrentWeek() {
    this.setState({ days: this.getCurrentDates() });
  }

  componentDidMount() {
    createRequest('fetchRooms').then((response) => {
      this.setState({ rooms: response.data || [] });
    });
  }

  addRoom(obj) {
    const { rooms } = this.state;

    createRequest('addRoom', {}, obj).then((response) => {
      if (response.status === responseStatuses.OK) {
        rooms.push(response.data);
        this.setState({ rooms, isAdding: false });
      }
    });
  }

  showAddForm() {
    this.setState({ isAdding: !this.state.isAdding });
  }

  deleteRoom(id) {
    const { rooms } = this.state;
    const indexToDelete = rooms.findIndex((room) => room.id === id);
    createRequest('deleteRoom', { id }).then((response) => {
      if (response.status === responseStatuses.OK) {
        rooms.splice(indexToDelete, 1);
        this.setState({ rooms });
      }
    });
  }

  updateRoom(id, newParams) {
    const { rooms } = this.state;
    const roomToUpdate = rooms.find((room) => room.id === id);
    createRequest('updateRoom', { id }, newParams).then((response) => {
      if (response.status === responseStatuses.OK) {
        Object.keys(roomToUpdate).forEach((key) => {
          if (!newParams[key]) return;
          if (typeof roomToUpdate[key] === 'object' && roomToUpdate[key] !== null) {
            Object.assign(roomToUpdate[key], newParams[key]);
          } else {
            roomToUpdate[key] = newParams[key];
          }
        });

        this.setState({ rooms });
      }
    });
  }

  filterRooms(queryOptions) {
    createRequest('fetchRooms', queryOptions).then((response) => {
      if (response.status === responseStatuses.OK) {
        this.setState({ rooms: response.data || [] });
      }
    });
  }

  moveWeek(ev) {
    const { direction } = ev.target.dataset;
    const { step } = ev.target.dataset;
    if (direction === 'prev') {
      const days = this.state.days.map((day) => moment(day).subtract(1, step).valueOf());
      this.setState({ days });
    } else if (direction === 'next') {
      const days = this.state.days.map((day) => moment(day).add(1, step).valueOf());
      this.setState({ days });
    }
  }

  render() {
    return (
      <div>
          <ReactCSSTransitionGroup
              transitionName="addform-transition"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
            {
              this.state.isAdding
              && <AddForm addRoom={this.addRoom} />
            }
            </ReactCSSTransitionGroup>
        <header className='header'>
          <a href='/' className="logo">
            <Logo />
            <span className="logo__text">MR Booker</span>
          </a>
          <AddRoom showAddForm={this.showAddForm} />
        </header>
        <div className="controls">
          <Filter filterRooms={this.filterRooms} />
        </div>
          <div className="calendar-controls">
            <DirectionButton moveWeek={this.moveWeek} dir={'prev'} step={'week'} />
            <DirectionButton moveWeek={this.moveWeek} dir={'prev'} step={'day'} />
            <DirectionButton moveWeek={this.moveWeek} dir={'next'} step={'day'} />
            <DirectionButton moveWeek={this.moveWeek} dir={'next'} step={'week'} />
            <button onClick={this.goToCurrentWeek}>ТЕК НЕДЕЛЯ</button>
          </div>
          <div className='rooms'>
            <div className="rooms__item rooms__item-header">
              <div className="rooms__cell">
                <div className="room-t">КОМНАТА</div>
              </div>
              {
                this.state.days.map((day, index) => {
                  return (
                    <div className="rooms__cell" key={index}>
                      <div className="rooms__week-day">
                        {moment(day).format('dddd').toUpperCase()}
                      </div>
                      <div className="rooms__date">
                        {moment(day).format('DD MMMM YY')}
                      </div>
                    </div>
                  );
                })
              }
            </div>
            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}>
            {
              this.state.rooms.length > 0
              && this.state.rooms
                .map((room) => <Room updateRoom={this.updateRoom}
                                     deleteRoom={this.deleteRoom}
                                     days={this.state.days}
                                     info = {room}
                                     key={room.id} />)
            }
            </ReactCSSTransitionGroup>
          </div>
      </div>
    );
  }
}


module.exports = BookEntries;
