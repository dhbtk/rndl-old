import {AppDispatcher} from '../dispatcher';
import MicroEmitter from 'micro-emitter';
import {ajax} from '../ajax';

class TripStoreSingleton extends MicroEmitter {
    constructor() {
        super();

        this.trips = [];
        this.trip = {};
    }
    
    fetchAll(dateMoment) {
        const date = dateMoment.format('YYYY-MM-DD');
        // chamar AJAX!
        const trips = ajax.fetch(`/api/trips?date=${date}`).then(response => {
            if(response.ok) {
                return response.json();
            } else {
            }
        }, error => {
            console.log(error);
        });

        trips.then(trips => {
            this.trips = trips;
            this.emit('trips-loaded')
        });
    }
    
    fetchOne(id) {
        const trip = ajax.fetch(`/api/trips/${id}`).then(response => {
            if(response.ok) {
                return response.json();
            }
        }, error => {
            console.log(error);
        });

        trip.then(data => {
            this.trip = data;
            this.emit('trip-loaded');
        }, error => console.log(error));
    }
    
    getAll() {
        return this.trips;
    }
    
    getOne() {
        return this.trip;
    }
}

const TripStore = new TripStoreSingleton();

AppDispatcher.register(payload => {
    switch(payload.actionName) {
        case 'list-trips':
            TripStore.fetchAll(payload.date);
            break;
        case 'load-trip':
            TripStore.fetchOne(payload.id);
            break;
    }
});

export {TripStore};
