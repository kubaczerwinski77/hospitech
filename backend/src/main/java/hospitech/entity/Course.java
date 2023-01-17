package hospitech.entity;

import hospitech.entity.enums.CourseType;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int courseId;
    private String name;
    @Column(unique = true)
    private String code;
    @Enumerated(EnumType.STRING)
    private CourseType courseType;
}
