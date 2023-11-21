export default class Query {
    constructor(location) {
        this.location = location;
    }

    // formats query argument
    formatQuery() {
        return `${encodeURIComponent(this.location)}`;
    }
}