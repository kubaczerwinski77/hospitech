package hospitech.entity;

import hospitech.entity.enums.DayOfTheWeek;
import hospitech.entity.enums.ModeOfStudies;
import hospitech.entity.enums.StudiesDegree;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalTime;


@Data
@Entity
@Table(name = "classes")
public class UniversityClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int classId;
    private String building;
    private String room;
    @ManyToOne
    @JoinColumn(name = "course_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Course course;
    private LocalTime startTime;
    private LocalTime endTime;
    @Enumerated(EnumType.STRING)
    private DayOfTheWeek dayOfTheWeek;
    private String semester;
    private StudiesDegree studiesDegree;
    private ModeOfStudies modeOfStudies;

}
