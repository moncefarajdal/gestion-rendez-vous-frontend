export class User {
    constructor(enabled, email, id, prenom, nom, username, password, roles) {
        this.enabled = enabled;
        this.email = email;
        this.id = id;
        this.prenom = prenom;
        this.nom = nom;
        this.username = username;
        this.password = password;
        this.roles = roles
    }
}