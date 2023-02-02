package hospitech.entity;

import hospitech.entity.enums.Grade;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "protocol_questions")
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
    @ElementCollection
    private List<Grade> gradeQuestions;

    public List<Grade> getGradeQuestions() {
        if(gradeQuestions == null) {
            gradeQuestions = new ArrayList();
            for(int i = 0; i < 20; i++) {
                gradeQuestions.add(Grade.NIEWIADOMA);
            }
            return gradeQuestions;
        }
        else if (gradeQuestions.size() < 20) {
            while(gradeQuestions.size() != 20) {
                gradeQuestions.add(Grade.NIEWIADOMA);
            }
        }
        return gradeQuestions;
    }
}
