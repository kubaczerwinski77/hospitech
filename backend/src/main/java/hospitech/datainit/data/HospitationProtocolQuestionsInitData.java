package hospitech.datainit.data;

import hospitech.entity.HospitationProtocolQuestions;

import java.util.List;

public class HospitationProtocolQuestionsInitData {

    public static List<HospitationProtocolQuestions> get() {
        return List.of(
                new HospitationProtocolQuestions(0, false, 0, "tak", 21, true, "", false, true, "Wszystko OK")
        );
    }
}
