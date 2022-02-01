import { UserAdress } from "./userAdress";
import { UserPersonnal } from "./userPersonnal";
import { UserPersonnalConnexion } from "./userPersonnalConnexion";

export interface CreateUser {
    userPersonnal: UserPersonnal;
    user_address: {
        userAddress: UserAdress;
    },
    user_personnal_connexion: {
        userPersonnalConnexion: UserPersonnalConnexion
    }
}