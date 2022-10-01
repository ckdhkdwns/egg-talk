package eggtalk.eggtalk.validation;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

@Component
public class PasswordValidator {
    // 0~9, a~z을 포함한 8~20길이의 문자열
    private static final String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z]).{8,20}$";

    private static final Pattern pattern = Pattern.compile(PASSWORD_PATTERN);

    public boolean isValidPassword(final String password) {
        Matcher matcher = pattern.matcher(password);
        return !matcher.matches();
    }

}
