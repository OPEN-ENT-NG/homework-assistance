export enum USER_RIGHT {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
}

export enum USER_ACTIONS {
  ADMIN = "fr.openent.homeworkAssistance.controller.ConfigurationController|update",
  STUDENT = "fr.openent.homeworkAssistance.controller.CallbackController|send",
}

export enum PREVIEW_INPUTS {
  HEADER = "header",
  BODY = "body",
  DAYS = "days",
  TIME = "time",
  INFO = "info",
}
