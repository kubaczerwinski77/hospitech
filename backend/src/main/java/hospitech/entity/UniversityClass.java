package hospitech.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

// TODO Daty i godziny

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
}
