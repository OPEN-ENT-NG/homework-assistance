package fr.openent.homeworkAssistance.security;

import fr.openent.homeworkAssistance.HomeworkAssistance;

public enum WorkflowActions {
    STUDENT_RIGHT (HomeworkAssistance.STUDENT),
    ADMIN_RIGHT (HomeworkAssistance.ADMIN),
    VIEW_RIGHT (HomeworkAssistance.VIEW);

    private final String actionName;

    WorkflowActions(String actionName) {
        this.actionName = actionName;
    }

    @Override
    public String toString () {
        return this.actionName;
    }
}
