package eggtalk.eggtalk.dto;



import eggtalk.eggtalk.entity.UserRoom;
import lombok.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRoomDto {
   @NotNull
   @Size(min = 3, max = 50)
   private String userId;

   @NotNull
   @Size(min = 1, max = 50)
   private Long roomId;

   @NotNull
   @Size(min = 3, max = 50)
   private String roomName;

   public static UserRoomDto from(UserRoom userRoom) {
      if(userRoom == null) return null;

      return UserRoomDto.builder()
              .userId(userRoom.getUserId())
              .roomId(userRoom.getRoomId())
              .roomName(userRoom.getRoomName())
              .build();
   }
}
