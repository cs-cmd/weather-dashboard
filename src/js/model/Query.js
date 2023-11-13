export default class Query {
    constructor(location) {
        this.location = location;
    };

    formatQuery() {
        return `q=${this.location.replace(' ', '_')}`;
    };
}