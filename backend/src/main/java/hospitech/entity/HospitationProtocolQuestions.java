package hospitech.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class HospitationProtocolQuestions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int questionsId;
    @NotNull
    private boolean wasDelayed; // tak, nie
    private int delayTime; // jesli tak, to czas
    @NotNull
    private String wasStudentsAttendanceChecked; // tak, nie, nie dotyczy (czy "nie dotyczy" jest tylko dla wykladow?)
    private int studentsPresent; // tak -> liczba studnetow
    @NotNull
    private boolean isClassProperlyEquipped; // zajecia tradycyjne -> tak, nie
    private String classEquipmentComment; // nie ->
    @NotNull
    private boolean videoMessageVerification; // tak, nie
    @NotNull
    private boolean isContentInLineWithProgram; // tak, nie
    private String commentsOnClass;
}
