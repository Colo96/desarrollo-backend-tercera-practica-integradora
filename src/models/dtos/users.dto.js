class SaveUserDTO {
  constructor(payload) {
    this.first_name = payload.name || payload.first_name;
    this.last_name = payload.lastname || payload.last_name;
    this.email = payload.email || payload.mail;
    this.password = payload.password;
    this.github_username = payload.github_username || payload.githubUsername;
    this.role = payload.role;
  }
}

module.exports = SaveUserDTO;
