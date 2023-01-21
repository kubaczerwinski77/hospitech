package hospitech.datainit.data;

import hospitech.entity.Course;
import hospitech.entity.enums.CourseType;

import java.util.List;

public class CoursesInitData {

    public static List<Course> get() {
        return List.of(
                new Course(0, "Fizyka I", "K01w", CourseType.TRADITIONAL),
                new Course(0, "Fizyka I", "K01c", CourseType.TRADITIONAL),
                new Course(0, "Fizyka I", "K01l", CourseType.TRADITIONAL),
                new Course(0, "Organizacja Systemow Komputerowych", "K02w",
                        CourseType.TRADITIONAL),
                new Course(0, "Organizacja Systemow Komputerowych", "K02l",
                        CourseType.TRADITIONAL),
                new Course(0, "Programowanie Strukturalne i Obiektowe", "K03w",
                        CourseType.TRADITIONAL),
                new Course(0, "Programowanie Strukturalne i Obiektowe", "K03c",
                        CourseType.TRADITIONAL),
                new Course(0, "Programowanie Strukturalne i Obiektowe", "K03l",
                        CourseType.TRADITIONAL),
                new Course(0, "Logika dla Informatykow", "K04w",
                        CourseType.TRADITIONAL),
                new Course(0, "Logika dla Informatykow", "K04l",
                        CourseType.TRADITIONAL),
                new Course(0, "Algebra z geometria analityczna", "K05w",
                        CourseType.TRADITIONAL),
                new Course(0, "Algebra z geometria analityczna", "K05c",
                        CourseType.TRADITIONAL),
                new Course(0, "Analiza matematyczna I", "K06w",
                        CourseType.TRADITIONAL),
                new Course(0, "Analiza matematyczna I", "K06c",
                        CourseType.TRADITIONAL),
                new Course(0, "Fizyka II", "K07w",
                        CourseType.TRADITIONAL),
                new Course(0, "Fizyka II", "K07c",
                        CourseType.TRADITIONAL),
                new Course(0, "Fizyka II", "K07l",
                        CourseType.TRADITIONAL),
                new Course(0, "Architektura komputerow", "K08w",
                        CourseType.TRADITIONAL),
                new Course(0, "Architektura komputerow", "K08l",
                        CourseType.TRADITIONAL),
                new Course(0, "Algorytmy i Struktury Danych", "K09w",
                        CourseType.TRADITIONAL),
                new Course(0, "Algorytmy i Struktury Danych", "K09c",
                        CourseType.TRADITIONAL),
                new Course(0, "Systemy Operacyjne", "K10w",
                        CourseType.TRADITIONAL),
                new Course(0, "Systemy Operacyjne", "K10l",
                        CourseType.TRADITIONAL),
                new Course(0, "Matematyka Dyskretna", "K11w",
                        CourseType.TRADITIONAL),
                new Course(0, "Matematyka Dyskretna", "K11c",
                        CourseType.TRADITIONAL),
                new Course(0, "Analiza Matematyczna II", "K12w",
                        CourseType.TRADITIONAL),
                new Course(0, "Analiza Matematyczna II", "K12c",
                        CourseType.TRADITIONAL),
                new Course(0, "Techniki Prezentacji", "K13",
                        CourseType.REMOTE),
                new Course(0, "Filozofia", "K14",
                        CourseType.REMOTE)
        );
    }
}
