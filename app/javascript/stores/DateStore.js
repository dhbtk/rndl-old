import {AppDispatcher} from '../dispatcher';
import MicroEmitter from 'micro-emitter';
import {ajax} from '../ajax';

class DateStoreSingleton extends MicroEmitter {
    constructor() {
        super();

        this.dates = [];
        this.trips = [];
    }

    fetchDates(dateMoment) {
        const date = dateMoment.format('YYYY-MM-DD');
        // chamar AJAX!
        const dates = ajax.fetch(`/api/dates/${date}`).then(response => {
            if(response.ok) {
                return response.json();
            } else {
            }
        }, error => {
            console.log(error);
        });

        dates.then(dates => {
            this.dates = dates;
            this.emit('dates-loaded')
        });
    }

    fetchTrips(date) {
        const trips = ajax.fetch(`/api/trips?date=${date}`).then(response => {
            if(response.ok) {
                return response.json();
            }
        }, error => {
            console.log(error);
        });
        trips.then(trips => {
            this.trips = {date, trips};
            this.emit('trips-loaded');
        })
    }

    getDates() {
        return this.dates;
    }

    getTrips() {
        return this.trips;
    }
}

const DateStore = new DateStoreSingleton();

AppDispatcher.register(payload => {
    switch(payload.actionName) {
        case 'list-dates':
            DateStore.fetchDates(payload.date);
            break;
        case 'list-trips':
            DateStore.fetchTrips(payload.date);
            break;
    }
});

export {DateStore};
