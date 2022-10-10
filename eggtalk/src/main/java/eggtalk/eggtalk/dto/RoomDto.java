package eggtalk.eggtalk.dto;
import eggtalk.eggtalk.entity.Room;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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
