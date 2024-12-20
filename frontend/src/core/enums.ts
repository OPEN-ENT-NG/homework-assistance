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
  TITLE_LINK = "title_link",
  DESCRIPTION_LINK = "description_link",
  LINK = "link",
}

export enum STUDENT_INPUTS {
  PHONE = "destination",
  INFOS = "informations_complementaires",
  SCHEDULED_DATE = "scheduled_date",
  SCHEDULED_TIME = "scheduled_time",
  SERVICE = "service",
}

export enum OPENING_DAYS {
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
  SUNDAY = "sunday",
}

export enum TIME_SCOPE {
  START = "start",
  END = "end",
}

export enum TIME_UNIT {
  HOUR = "hour",
  MINUTE = "minute",
}

export enum MODAL_TYPE {
  TIME_SCOPE_ERROR = "TIME_SCOPE_ERROR",
  DAY_SCOPE_ERROR = "DAY_SCOPE_ERROR",
  ADD_CLOSTING_PERIOD = "ADD_CLOSING_PERIOD",
  DELETE_CLOSING_PERIOD = "DELETE_CLOSING_PERIOD",
}
