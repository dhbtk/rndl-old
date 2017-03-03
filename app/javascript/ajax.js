import MicroEmitter from 'micro-emitter';

class Ajax extends MicroEmitter {
    fetch(url, opts) {
        this.emit('start-loading');
        return window.fetch(url, opts).then(response => {
            this.emit('stop-loading');
            return response;
        }, error => {
            this.emit('stop-loading');
            return error;
        });
    }
}

export let ajax = new Ajax();
