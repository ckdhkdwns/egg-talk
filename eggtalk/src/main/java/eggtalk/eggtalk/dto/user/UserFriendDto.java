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
   private Integer userId;

   @NotNull
   private Integer friendId;

   public static UserFriendDto from(UserFriend userFriend) {
      if(userFriend == null) return null;

      return UserFriendDto.builder()
         .userId(userFriend.getUserId())
         .friendId(userFriend.getFriendId())
         .build();
   }
}