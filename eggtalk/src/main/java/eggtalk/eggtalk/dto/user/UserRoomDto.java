package eggtalk.eggtalk.dto.user;



import lombok.*;
import javax.validation.constraints.NotNull;

import eggtalk.eggtalk.entity.user.UserRoom;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRoomDto {
   @NotNull
   private Integer userId;

   @NotNull
   private Integer roomId;

   public static UserRoomDto from(UserRoom userRoom) {
      if(userRoom == null) return null;

      return UserRoomDto.builder()
         .userId(userRoom.getUserId())
         .roomId(userRoom.getRoomId())
         .build();
   }
}
