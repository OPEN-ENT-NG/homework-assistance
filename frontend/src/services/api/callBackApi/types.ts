export interface CallbackPayload {
  destination: string;
  scheduled_date: string;
  scheduled_time: {
    hour: string;
    minute: number;
  };
  userdata: {
    prenom: string;
    nom: string;
    etablissement: string;
    classe: string;
    matiere: string;
    service: number;
  };
  informations_complementaires: string | null;
}
