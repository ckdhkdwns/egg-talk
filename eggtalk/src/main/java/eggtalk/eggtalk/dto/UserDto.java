package eggtalk.eggtalk.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import eggtalk.eggtalk.entity.User;
import lombok.*;

import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   @NotNull
   @Size(min = 8, max = 100)
   private String password;

   @NotNull
   @Size(min = 3, max = 50)
   private String username;

   @NotNull
   @Size(min = 3, max = 50)
   private String displayname;

   @NotNull
   private Boolean gender;

   @NotNull
   @Size(min = 5, max = 50)
   private String email;

   private Set<AuthorityDto> authorityDtoSet;

   public static UserDto from(User user) {
      if(user == null) return null;

      return UserDto.builder()
              .username(user.getUsername())
              .displayname(user.getDisplayname())
              .gender(user.getGender())
              .email(user.getEmail())
              .authorityDtoSet(user.getAuthorities().stream()
                      .map(authority -> AuthorityDto.builder().authorityName(authority.getAuthorityName()).build())
                      .collect(Collectors.toSet()))
              .build();
   }
}
