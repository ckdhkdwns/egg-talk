package eggtalk.eggtalk.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import eggtalk.eggtalk.entity.User;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

   @NotNull
   @Size(min = 3, max = 50)
   private String userId;

   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   @NotNull
   @Size(min = 3, max = 100)
   private String password;

   @NotNull
   @Size(min = 3, max = 50)
   private String username;

   @NotNull
   private Integer gender;

   @NotNull
   @Size(min = 3, max = 50)
   private String email;

   private Set<AuthorityDto> authorityDtoSet;

   public static UserDto from(User user) {
      if(user == null) return null;

      return UserDto.builder()
              .userId(user.getUserId())
              .username(user.getUsername())
              .gender(user.getGender())
              .email(user.getEmail())
              .authorityDtoSet(user.getAuthorities().stream()
                      .map(authority -> AuthorityDto.builder().authorityName(authority.getAuthorityName()).build())
                      .collect(Collectors.toSet()))
              .build();
   }
}
