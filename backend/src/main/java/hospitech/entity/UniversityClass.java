package hospitech.entity;

import hospitech.dto.UniversityClassDTO;
import hospitech.entity.enums.DayOfTheWeek;
import hospitech.entity.enums.ModeOfStudies;
import hospitech.entity.enums.StudiesDegree;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
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

    public UniversityClass(String building, String room, Course course, LocalTime startTime, LocalTime endTime, DayOfTheWeek dayOfTheWeek, String semester) {
        this.building = building;
        this.room = room;
        this.course = course;
        this.startTime = startTime;
        this.endTime = endTime;
        this.dayOfTheWeek = dayOfTheWeek;
        this.semester = semester;
    }

    public UniversityClassDTO toDTO() {
        return new UniversityClassDTO(classId, building, room, course.getCode(), startTime, endTime, dayOfTheWeek, semester);
    }
}
