class SaveUserDTO {
    constructor(payload) {
        this.first_name = payload.name || payload.first_name;
        this.last_name = payload.lastname || payload.last_name;
        this.email = payload.email;
        this.role = payload.role;
    }
}

module.exports = SaveUserDTO;