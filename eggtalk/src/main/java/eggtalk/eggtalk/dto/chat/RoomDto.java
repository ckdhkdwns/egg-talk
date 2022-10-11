package eggtalk.eggtalk.dto.chat;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import eggtalk.eggtalk.entity.chat.Room;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomDto {

    @NotNull
    @Size(min = 5, max  = 50)
    private String roomName;

   public static RoomDto from(Room room) {
      if(room== null) return null;

      return RoomDto.builder()
         .roomName(room.getRoomName())
         .build();
   }
}
