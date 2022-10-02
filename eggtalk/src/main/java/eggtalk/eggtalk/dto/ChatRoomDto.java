package eggtalk.eggtalk.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import eggtalk.eggtalk.entity.ChatRoom;
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
public class ChatRoomDto {

    @NotNull
    @Size(min = 1, max  = 50)
    private String roomName;

   public static ChatRoomDto from(ChatRoom chatRoom) {
      if(chatRoom == null) return null;

      return ChatRoomDto.builder()
              .roomName(chatRoom.getRoomName())
              .build();
   }
}
