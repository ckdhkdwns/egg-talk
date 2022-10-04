package eggtalk.eggtalk.dto;

import eggtalk.eggtalk.entity.ChatRoom;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomDto {

   
    @NotNull
    @Size(min = 1, max  = 50)
    private String creatorId;

    @NotNull
    @Size(min = 1, max  = 50)
    private String roomName;

    
    
   public static ChatRoomDto from(ChatRoom chatRoom) {
      if(chatRoom == null) return null;

      return ChatRoomDto.builder()
         .creatorId(chatRoom.getCreatorId())
         .roomName(chatRoom.getRoomName())
         .build();
   }
}
