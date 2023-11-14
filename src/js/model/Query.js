export default class Query {
    constructor(location) {
        this.location = location;
    };

    formatQuery() {
        return `${encodeURIComponent(this.location)}`;
    };
}