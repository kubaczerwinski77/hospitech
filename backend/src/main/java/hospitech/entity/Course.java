package hospitech.entity;

import hospitech.entity.enums.CourseType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
