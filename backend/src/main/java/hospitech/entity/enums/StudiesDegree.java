package hospitech.entity.enums;

public enum StudiesDegree {
    BA("I Stopień"),
    MA("II Stopień"),
    DOCTORAL("doktoranckie"),
    DOCTRINE_SCHOOL("Szkoła Doktroska"),
    POSTGRADUATE_STUDIES("podyplomowe");
    public final String description;

    StudiesDegree(String description) {
        this.description = description;
    }
}
