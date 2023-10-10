export interface NotificacionReponse {
    ok:      boolean;
    usuario: IUser;
    token:   string;
}

export interface IUser {
    role:                      string;
    nombre:                    string;
    email:                     string;
    ubicaciones:               any[];
    telefonos:                 string[];
    online:                    boolean;
    google:                    boolean;
    isOpenRoom:                boolean;
    isActivo:                  boolean;
    isPublicacionPendiente:    boolean;
    salas:                     any[];
    createdAt:                 Date;
    updatedAt:                 Date;
    telefono:                  string;
    isSalasPendiente:          boolean;
    isNotificacionesPendiente: boolean;
    tokenApp:                  string;
    uid:                       string;     
    unidadEducativa:           string; 
}