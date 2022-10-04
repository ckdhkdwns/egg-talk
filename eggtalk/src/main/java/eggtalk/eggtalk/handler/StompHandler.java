package eggtalk.eggtalk.handler;


import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import eggtalk.eggtalk.exception.NotFoundMemberException;
import eggtalk.eggtalk.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {
    private final TokenProvider tokenProvider;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if(accessor.getCommand() == StompCommand.CONNECT) {
            if(!tokenProvider.validateToken(accessor.getFirstNativeHeader("Authorization")))
                throw new NotFoundMemberException("Member not found");
        }
        return message;
    }
}