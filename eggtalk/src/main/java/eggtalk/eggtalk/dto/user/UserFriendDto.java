package eggtalk.eggtalk.dto.user;

import lombok.*;
import javax.validation.constraints.NotNull;

import eggtalk.eggtalk.entity.user.UserFriend;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserFriendDto {
   @NotNull
   private String username;

   @NotNull
   private String friendname;

}