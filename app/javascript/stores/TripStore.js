import {AppDispatcher} from '../dispatcher';
import MicroEmitter from 'micro-emitter';
import {ajax} from '../ajax';

class TripStoreSingleton extends MicroEmitter {
    constructor() {
        super();

        this.trip = null;
    }

    getTripData() {
        return this.trip;
    }

    fetchTrip(id) {
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
}

const TripStore = new TripStoreSingleton();

AppDispatcher.register(payload => {
    switch(payload.actionName) {
        case 'load-trip':
            TripStore.fetchTrip(payload.id);
            break;
    }
});

export {TripStore};
